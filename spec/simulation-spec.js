const Immutable = require('immutable');
const simitate = require('../src/index');
import {
  initialActors, initialTimeline, actorsReactions, timelineReactions,
  dawnEvent, duskEvent,
} from '../examples/sleeping';

describe('A simulation', () => {
  let simulation;

  beforeEach(() => {
    simulation = simitate.createSimulation(
      initialActors, initialTimeline, actorsReactions, timelineReactions
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

    const secondDawnEvent = (
      Immutable.fromJS(dawnEvent).set('time', dawnEvent.time + 2400).toJS()
    );
    const secondDuskEvent = (
      Immutable.fromJS(duskEvent).set('time', duskEvent.time + 2400).toJS()
    );
    simulation.dispatch({ type: 'ADD_EVENT', event: secondDuskEvent });
    simulation.dispatch({ type: 'ADD_EVENT', event: secondDawnEvent });
    expect(simulation.getState().timeline).toEqual(
      [...initialTimeline, secondDawnEvent, secondDuskEvent]
    );
  });

  it('can handle actor reactions', () => {
    const asleepActors = initialActors.map(actor => (
      Immutable.fromJS(actor).set('awake', false).toJS()
    ));
    const awakeActors = initialActors.map(actor => (
      Immutable.fromJS(actor).set('awake', true).toJS()
    ));

    expect(simulation.getState().actors).toEqual(initialActors);

    simulation.dispatch(duskEvent);
    expect(simulation.getState().actors).toEqual(asleepActors);

    simulation.dispatch(dawnEvent);
    expect(simulation.getState().actors).toEqual(awakeActors);
  });

  it('can handle timeline reactions', () => {
    expect(simulation.getState().timeline.length).toEqual(
      initialTimeline.length
    );

    simulation.dispatch(duskEvent);
    expect(simulation.getState().timeline.length).toEqual(
      initialTimeline.length + 1
    );

    simulation.dispatch(dawnEvent);
    expect(simulation.getState().timeline.length).toEqual(
      initialTimeline.length + 2
    );
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
    expect(simulation.getState().currentEventIndex).toEqual(43);
  });
});
