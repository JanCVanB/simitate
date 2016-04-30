export default function createSimulation() {
  const state = {};

  const getState = () => state;

  const simulation = {
    getState,
  };

  return simulation;
}
