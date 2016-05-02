const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;
  const noonTime = 1200;
  const lunchTime = noonTime;
  const nightTime = 1900;
  const noonEvent = { time: noonTime };
  const lunchEvent = { time: lunchTime };
  const nightEvent = { time: nightTime };


  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      currentStep: 0,
      actors: [],
      initialEvents: [],
      timeline: [],
    };
    expect(simulation.getState()).toEqual(expectedDefaultState);
  });

  it('can add actors', () => {
    const alice = { name: 'Alice' };
    const betty = { name: 'Betty' };

    expect(simulation.getState().actors).toEqual([]);

    simulation.dispatch({ type: 'ADD_ACTOR', actor: alice });
    expect(simulation.getState().actors).toEqual([alice]);

    simulation.dispatch({ type: 'ADD_ACTOR', actor: betty });
    expect(simulation.getState().actors).toEqual([alice, betty]);
  });

  it('can add initial events', () => {
    expect(simulation.getState().initialEvents).toEqual([]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: noonEvent });
    expect(simulation.getState().initialEvents).toEqual([noonEvent]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: lunchEvent });
    expect(simulation.getState().initialEvents).toEqual([
      noonEvent, lunchEvent,
    ]);

    simulation.dispatch({ type: 'ADD_INITIAL_EVENT', event: nightEvent });
    expect(simulation.getState().initialEvents).toEqual([
      noonEvent, lunchEvent, nightEvent,
    ]);
  });

  it('can schedule events', () => {
    let expectedTimeline = [];

    expect(simulation.getState().timeline).toEqual(expectedTimeline);

    simulation.dispatch({ type: 'SCHEDULE_EVENT', event: noonEvent });
    expectedTimeline = [
      { time: noonTime, events: [noonEvent] },
    ];
    expect(simulation.getState().timeline).toEqual(expectedTimeline);

    simulation.dispatch({ type: 'SCHEDULE_EVENT', event: lunchEvent });
    expectedTimeline = [
      { time: noonTime, events: [noonEvent, lunchEvent] },
    ];
    expect(simulation.getState().timeline).toEqual(expectedTimeline);

    simulation.dispatch({ type: 'SCHEDULE_EVENT', event: nightEvent });
    expectedTimeline = [
      { time: noonTime, events: [noonEvent, lunchEvent] },
      { time: nightTime, events: [nightEvent] },
    ];
    expect(simulation.getState().timeline).toEqual(expectedTimeline);
  });
});
