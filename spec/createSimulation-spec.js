const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;

  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('has a default state', () => {
    const expectedDefaultState = {
      actors: [],
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
});
