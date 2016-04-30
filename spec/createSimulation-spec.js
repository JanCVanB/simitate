const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;

  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('has a default state', () => {
    const expectedDefaultState = {};
    expect(simulation.getState()).toEqual(expectedDefaultState);
  });
});
