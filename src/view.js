const getActorHistories = (simulation) => (
  simulation.getState().actors.map(actor => actor.history)
);

export {
  getActorHistories,
};
