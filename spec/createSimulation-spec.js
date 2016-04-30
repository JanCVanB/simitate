const simitate = require('../src/index');

describe('A simulation', () => {
  let simulation;

  beforeEach(() => {
    simulation = simitate.createSimulation();
  });

  it('should be cool', () => {
    expect(simulation).toBe('cool');
  });
});
