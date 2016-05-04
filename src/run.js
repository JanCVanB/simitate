export default function run(simulation) {
  while (
    simulation.getState().currentEventIndex <
    simulation.getState().timeline.length
  ) {
    const currentEventIndex = simulation.getState().currentEventIndex;
    const timeline = simulation.getState().timeline;
    const currentEvent = timeline[currentEventIndex];
    simulation.dispatch(currentEvent);
    simulation.dispatch({ type: 'LOG_ACTOR_HISTORIES' });
    simulation.dispatch({ type: 'INCREMENT_CURRENT_EVENT_INDEX' });
  }
}
