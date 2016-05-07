export default function run(simulation) {
  while (
    simulation.getState().currentEventIndex <
    simulation.getState().timeline.length
  ) {
    const currentEventIndex = simulation.getState().currentEventIndex;
    const timeline = simulation.getState().timeline;
    const currentEvent = timeline[currentEventIndex];
    const currentTime = currentEvent.time;
    const logEvent = { type: 'LOG_ACTOR_HISTORIES', time: currentTime };
    const incrementEventIndexEvent = {
      type: 'INCREMENT_CURRENT_EVENT_INDEX', time: currentTime,
    };
    simulation.dispatch(currentEvent);
    simulation.dispatch(logEvent);
    simulation.dispatch(incrementEventIndexEvent);
  }
}
