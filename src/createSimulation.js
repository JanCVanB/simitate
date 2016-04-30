export default function createSimulation() {
  const state = {
    actors: [],
  };

  const getState = () => state;

  const addActor = (actor) => {
    state.actors.push(actor);
  };

  const simulation = {
    getState,
    addActor,
  };

  return simulation;
}
