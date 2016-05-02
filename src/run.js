export default function run(simulation) {
  simulation.dispatch({
    type: 'INITIALIZE_CURRENT_ACTORS',
    actors: simulation.getState().initialActors,
  });

  simulation.getState().initialEvents.forEach(initialEvent => {
    simulation.dispatch({
      type: 'SCHEDULE_EVENT', time: initialEvent.time, event: initialEvent,
    });
  });

  while (
    simulation.getState().currentStep < simulation.getState().timeline.length
  ) {
    simulation.dispatch(
      simulation.getState().timeline[simulation.getState().currentStep].event
    );
    // TODO: eliminate actors and currentStep cross-state hacking
    // (reducer should be able to get the currentActors and currentStep, right?)
    simulation.dispatch({
      type: 'LOG_ACTORS', actors: simulation.getState().currentActors,
      currentStep: simulation.getState().currentStep,
    });
    simulation.dispatch({ type: 'INCREMENT_CURRENT_STEP' });
  }
}
