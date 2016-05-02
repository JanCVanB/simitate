import {
  getIndexOfFirstElementThatSatisfies,
  insertElementIntoArrayAtIndex,
} from './utils';

const getExistingTimelineStep = (timeline, time) => {
  const stepHasEqualTime = (step) => step.time === time;
  return getIndexOfFirstElementThatSatisfies(timeline, stepHasEqualTime);
};

const getNextTimelineStep = (timeline, time) => {
  const stepHasGreaterTime = (step) => step.time > time;
  const firstIndex = getIndexOfFirstElementThatSatisfies(
    timeline, stepHasGreaterTime
  );
  if (firstIndex === -1) {
    return timeline.length;
  }
  return firstIndex;
};

export default function scheduleEvent(timeline, event) {
  const existingTimelineStep = getExistingTimelineStep(timeline, event.time);
  if (existingTimelineStep === -1) {
    const newMoment = { time: event.time, events: [event] };
    const nextTimelineStep = getNextTimelineStep(timeline, event.time);
    insertElementIntoArrayAtIndex(
      newMoment, timeline, nextTimelineStep
    );
  } else {
    timeline[existingTimelineStep].events.push(event);
  }
  return timeline;
}
