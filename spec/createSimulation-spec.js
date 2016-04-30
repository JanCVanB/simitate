const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;

  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      actors: [],
      timeline: [],
    };
    expect(simulation.getState()).toEqual(expectedDefaultState);
  });

  it('can add actors', () => {
    const alice = 'Alice';
    const betty = 'Betty';

    expect(simulation.getState().actors).toEqual([]);

    simulation.addActor(alice);
    expect(simulation.getState().actors).toEqual([alice]);

    simulation.addActor(betty);
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

    simulation.scheduleEvent(noonEvent);
    expectedTimeline = [
      { time: noonTime, events: [noonEvent] },
    ];
    expect(simulation.getState().timeline).toEqual(expectedTimeline);

    simulation.scheduleEvent(lunchEvent);
    expectedTimeline = [
      { time: noonTime, events: [noonEvent, lunchEvent] },
    ];
    expect(simulation.getState().timeline).toEqual(expectedTimeline);

    simulation.scheduleEvent(nightEvent);
    expectedTimeline = [
      { time: noonTime, events: [noonEvent, lunchEvent] },
      { time: nightTime, events: [nightEvent] },
    ];
    expect(simulation.getState().timeline).toEqual(expectedTimeline);
  });
});
