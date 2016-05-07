import {
  getIndexOfFirstElementThatSatisfies,
  insertElementIntoArrayAtIndex,
} from './utils';

const getFirstEventWithGreaterTime = (timeline, time) => {
  const eventHasGreaterTime = (step) => step.time > time;
  const firstIndex = getIndexOfFirstElementThatSatisfies(
    timeline, eventHasGreaterTime
  );
  if (firstIndex === -1) {
    return timeline.length;
  }
  return firstIndex;
};

const insertEventIntoTimeline = (event, timeline) => {
  const firstStepWithGreaterTime = (
    getFirstEventWithGreaterTime(timeline, event.time)
  );
  insertElementIntoArrayAtIndex(event, timeline, firstStepWithGreaterTime);
  return timeline;
};

export {
  insertEventIntoTimeline,
};
