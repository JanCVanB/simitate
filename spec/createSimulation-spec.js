const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;

  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      currentStep: 0,
      actors: [],
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

  it('can schedule events', () => {
    const noonTime = 1200;
    const lunchTime = noonTime;
    const nightTime = 1900;
    const noonEvent = { time: noonTime };
    const lunchEvent = { time: lunchTime };
    const nightEvent = { time: nightTime };
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
