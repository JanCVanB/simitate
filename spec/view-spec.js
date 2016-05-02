const simitate = require('../src/index');

describe('The view library', () => {
  it('can show actors over time', () => {
    const simulation = {
      getState: () => ({ timeline: [{ actors: [1, 2] }, { actors: [3, 4] }] }),
    };
    expect(simitate.getActorsOverTime(simulation)).toEqual([[1, 2], [3, 4]]);
  });
});
