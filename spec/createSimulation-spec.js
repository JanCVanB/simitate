const Immutable = require('immutable');
const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;
  const alice = { name: 'Alice', awake: true };
  const betty = { name: 'Betty', awake: true };
  const actors = [alice, betty];
  const dawnTimeOfDay = 500;
  const noonTimeOfDay = 1200;
  const duskTimeOfDay = 1900;
  const dawnEvent = { type: 'TIME_OF_DAY', timeOfDay: dawnTimeOfDay };
  const noonEvent = { type: 'TIME_OF_DAY', timeOfDay: noonTimeOfDay };
  const lunchEvent = { type: 'TIME_OF_DAY', timeOfDay: noonTimeOfDay };
  const duskEvent = { type: 'TIME_OF_DAY', timeOfDay: duskTimeOfDay };
  const events = [dawnEvent, noonEvent, lunchEvent, duskEvent];
  const actorsReactions = {
    TIME_OF_DAY: (currentActors, event) => {
      switch (event.timeOfDay) {
        case dawnTimeOfDay:
          return currentActors.map(actor =>
            Immutable.Map(actor).set('awake', true).toJS());
        case duskTimeOfDay:
          return currentActors.map((actor) =>
            Immutable.Map(actor).set('awake', false).toJS());
        default:
          return currentActors;
      }
    },
  };

  beforeEach(() => {
    simulation = simitate.createSimulation(actorsReactions);
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      currentActors: [],
      currentStep: 0,
      initialActors: [],
      initialEvents: [],
      timeline: [],
    };
    expect(simulation.getState()).toEqual(expectedDefaultState);
  });

  it('can add initial actors', () => {
    expect(simulation.getState().initialActors).toEqual([]);

    simulation.dispatch({ type: 'ADD_INITIAL_ACTOR', actor: alice });
    expect(simulation.getState().initialActors).toEqual([alice]);

    simulation.dispatch({ type: 'ADD_INITIAL_ACTOR', actor: betty });
    expect(simulation.getState().initialActors).toEqual([alice, betty]);
  });

  it('can add initial events', () => {
    expect(simulation.getState().initialEvents).toEqual([]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: dawnEvent });
    expect(simulation.getState().initialEvents).toEqual([dawnEvent]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: noonEvent });
    expect(simulation.getState().initialEvents).toEqual([
      dawnEvent, noonEvent,
    ]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: lunchEvent });
    expect(simulation.getState().initialEvents).toEqual([
      dawnEvent, noonEvent, lunchEvent,
    ]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: duskEvent });
    expect(simulation.getState().initialEvents).toEqual([
      dawnEvent, noonEvent, lunchEvent, duskEvent,
    ]);
  });

  const setUp = (sim) => {
    actors.map((actor) => sim.dispatch({ type: 'ADD_INITIAL_ACTOR', actor }));
    events.map((event) => sim.dispatch({ type: 'ADD_INITIAL_EVENT', event }));
  };

  it('can initialize the current actors', () => {
    setUp(simulation);
    expect(simulation.getState().currentActors).toEqual([]);

    simulation.dispatch({
      type: 'INITIALIZE_CURRENT_ACTORS',
      actors: simulation.getState().initialActors,
    });
    expect(simulation.getState().currentActors).toEqual(actors);
  });

  it('can handle event reactions', () => {
    const awakeAlice = Immutable.Map(alice).set('awake', true).toJS();
    const awakeBetty = Immutable.Map(betty).set('awake', true).toJS();
    const asleepAlice = Immutable.Map(alice).set('awake', false).toJS();
    const asleepBetty = Immutable.Map(betty).set('awake', false).toJS();

    setUp(simulation);
    expect(simulation.getState().currentActors).toEqual([]);

    simulation.dispatch({
      type: 'INITIALIZE_CURRENT_ACTORS',
      actors: simulation.getState().initialActors,
    });
    expect(simulation.getState().currentActors).toEqual([
      awakeAlice, awakeBetty,
    ]);

    simulation.dispatch(duskEvent);
    expect(simulation.getState().currentActors).toEqual([
      asleepAlice, asleepBetty,
    ]);

    simulation.dispatch(dawnEvent);
    expect(simulation.getState().currentActors).toEqual([
      awakeAlice, awakeBetty,
    ]);
  });

  it('can schedule events', () => {
    expect(simulation.getState().timeline).toEqual([]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: dawnTimeOfDay, event: dawnEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: dawnTimeOfDay, event: dawnEvent },
    ]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: noonTimeOfDay, event: noonEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: dawnTimeOfDay, event: dawnEvent },
      { time: noonTimeOfDay, event: noonEvent },
    ]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: duskTimeOfDay, event: duskEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: dawnTimeOfDay, event: dawnEvent },
      { time: noonTimeOfDay, event: noonEvent },
      { time: duskTimeOfDay, event: duskEvent },
    ]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: noonTimeOfDay, event: lunchEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: dawnTimeOfDay, event: dawnEvent },
      { time: noonTimeOfDay, event: noonEvent },
      { time: noonTimeOfDay, event: lunchEvent },
      { time: duskTimeOfDay, event: duskEvent },
    ]);
  });
});
