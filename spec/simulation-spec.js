const Immutable = require('immutable');
const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;
  const alice = { name: 'Alice', awake: true };
  const betty = { name: 'Betty', awake: true };
  const initialActors = [alice, betty];
  const dawnTimeOfDay = 500;
  const noonTimeOfDay = 1200;
  const duskTimeOfDay = 1900;
  const dawnEvent = {
    type: 'TIME_OF_DAY', time: dawnTimeOfDay, timeOfDay: dawnTimeOfDay,
  };
  const noonEvent = {
    type: 'TIME_OF_DAY', time: noonTimeOfDay, timeOfDay: noonTimeOfDay,
  };
  const lunchEvent = {
    type: 'TIME_OF_DAY', time: noonTimeOfDay, timeOfDay: noonTimeOfDay,
  };
  const duskEvent = {
    type: 'TIME_OF_DAY', time: duskTimeOfDay, timeOfDay: duskTimeOfDay,
  };
  const initialTimeline = [dawnEvent, noonEvent, lunchEvent, duskEvent];
  const actorReactions = {
    TIME_OF_DAY: (currentActors, event) => {
      switch (event.timeOfDay) {
        case dawnTimeOfDay:
          return currentActors.map(actor =>
            Immutable.fromJS(actor).set('awake', true).toJS());
        case duskTimeOfDay:
          return currentActors.map(actor =>
            Immutable.fromJS(actor).set('awake', false).toJS());
        default:
          return currentActors;
      }
    },
  };


  const awakeActors = initialActors.map(actor => (
    Immutable.fromJS(actor).set('awake', true).toJS()
  ));
  const asleepActors = initialActors.map(actor => (
    Immutable.fromJS(actor).set('awake', false).toJS()
  ));

  beforeEach(() => {
    simulation = simitate.createSimulation(
      initialActors, initialTimeline, actorReactions
    );
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      actors: initialActors,
      currentEventIndex: 0,
      timeline: initialTimeline,
    };
    expect(simulation.getState()).toEqual(expectedDefaultState);
  });

  it('can add actors', () => {
    expect(simulation.getState().actors).toEqual(initialActors);

    const carol = { name: 'Carol', awake: true };
    simulation.dispatch({ type: 'ADD_ACTOR', actor: carol });
    expect(simulation.getState().actors).toEqual([...initialActors, carol]);
  });

  it('can add events', () => {
    expect(simulation.getState().timeline).toEqual(initialTimeline);

    const secondDawnEvent = {
      type: 'TIME_OF_DAY', time: 2400 + dawnTimeOfDay, timeOfDay: dawnTimeOfDay,
    };
    const secondDuskEvent = {
      type: 'TIME_OF_DAY', time: 2400 + duskTimeOfDay, timeOfDay: duskTimeOfDay,
    };
    simulation.dispatch({ type: 'ADD_EVENT', event: secondDuskEvent });
    simulation.dispatch({ type: 'ADD_EVENT', event: secondDawnEvent });
    expect(simulation.getState().timeline).toEqual(
      [...initialTimeline, secondDawnEvent, secondDuskEvent]
    );
  });

  it('can handle actor reactions', () => {
    expect(simulation.getState().actors).toEqual(awakeActors);

    simulation.dispatch(duskEvent);
    expect(simulation.getState().actors).toEqual(asleepActors);

    simulation.dispatch(dawnEvent);
    expect(simulation.getState().actors).toEqual(awakeActors);
  });

  it('can increment current event index', () => {
    expect(simulation.getState().currentEventIndex).toEqual(0);

    simulation.dispatch({ type: 'INCREMENT_CURRENT_EVENT_INDEX' });
    expect(simulation.getState().currentEventIndex).toEqual(1);

    simulation.dispatch({ type: 'INCREMENT_CURRENT_EVENT_INDEX' });
    expect(simulation.getState().currentEventIndex).toEqual(2);
  });

  it('can log actor histories', () => {
    expect(simulation.getState().actors).toEqual(initialActors);

    simulation.dispatch({ type: 'LOG_ACTOR_HISTORIES' });
    const initialActorsWith1DeepHistories = initialActors.map(actor => (
      Immutable.fromJS(actor).set('history', [actor]).toJS()
    ));
    expect(simulation.getState().actors).toEqual(
      initialActorsWith1DeepHistories
    );

    simulation.dispatch({ type: 'LOG_ACTOR_HISTORIES' });
    const initialActorsWith2DeepHistories = initialActors.map(actor => (
      Immutable.fromJS(actor).set('history', [actor, actor]).toJS()
    ));
    expect(simulation.getState().actors).toEqual(
      initialActorsWith2DeepHistories
    );
  });

  it('can run', () => {
    expect(simulation.getState().currentEventIndex).toEqual(0);

    simitate.run(simulation);
    expect(simulation.getState().currentEventIndex).toEqual(
      initialTimeline.length
    );
  });
});
