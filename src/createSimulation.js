import {
  getIndexOfFirstElementThatSatisfies,
  insertElementIntoArrayAtIndex,
} from './utils';

export default function createSimulation() {
  const state = {
    actors: [],
    timeline: [],
  };

  const getState = () => state;

  const addActor = (actor) => {
    state.actors.push(actor);
  };

  const getExistingTimelineStep = (time) => {
    const stepHasEqualTime = (step) => step.time === time;
    return getIndexOfFirstElementThatSatisfies(state.timeline, stepHasEqualTime);
  };

  const getNextTimelineStep = (time) => {
    const stepHasGreaterTime = (step) => step.time > time;
    const firstIndex = getIndexOfFirstElementThatSatisfies(
      state.timeline, stepHasGreaterTime
    );
    if (firstIndex === -1) {
      return state.timeline.length;
    }
    return firstIndex;
  };

  const scheduleEvent = (event) => {
    const existingTimelineStep = getExistingTimelineStep(event.time);
    if (existingTimelineStep === -1) {
      const newMoment = { time: event.time, events: [event] };
      const nextTimelineStep = getNextTimelineStep(event.time);
      insertElementIntoArrayAtIndex(
        newMoment, state.timeline, nextTimelineStep
      );
    } else {
      state.timeline[existingTimelineStep].events.push(event);
    }
  };

  const simulation = {
    getState,
    addActor,
    scheduleEvent,
  };

  return simulation;
}
