const getActorsOverTime = (simulation) => (
  simulation.getState().timeline.map(step => step.actors)
);

export {
  getActorsOverTime,
};
