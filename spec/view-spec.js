const simitate = require('../src/index');

describe('The view library', () => {
  it('can show actor histories', () => {
    const simulation = {
      getState: () => ({ actors: [{ history: [1, 2] }, { history: [3, 4] }] }),
    };
    expect(simitate.getActorHistories(simulation)).toEqual([[1, 2], [3, 4]]);
  });
});
