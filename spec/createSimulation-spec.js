const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;
  const noonTime = 1200;
  const nightTime = 1900;
  const noonEvent = { name: 'Noon' };
  const lunchEvent = { name: 'Lunch' };
  const nightEvent = { name: 'Night' };

  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      actors: [],
      currentStep: 0,
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
    expect(simulation.getState().timeline).toEqual([]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: noonTime, event: noonEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: noonTime, event: noonEvent },
    ]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: nightTime, event: nightEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: noonTime, event: noonEvent },
      { time: nightTime, event: nightEvent },
    ]);

    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: noonTime, event: lunchEvent,
    });
    expect(simulation.getState().timeline).toEqual([
      { time: noonTime, event: noonEvent },
      { time: noonTime, event: lunchEvent },
      { time: nightTime, event: nightEvent },
    ]);
  });
});
