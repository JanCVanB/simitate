import {
  getIndexOfFirstElementThatSatisfies,
  insertElementIntoArrayAtIndex,
} from './utils';

const getFirstStepWithGreaterTime = (timeline, time) => {
  const stepHasGreaterTime = (step) => step.time > time;
  const firstIndex = getIndexOfFirstElementThatSatisfies(
    timeline, stepHasGreaterTime
  );
  if (firstIndex === -1) {
    return timeline.length;
  }
  return firstIndex;
};

export default function scheduleEvent(timeline, time, event) {
  const newStep = { time, event };
  const firstStepWithGreaterTime = getFirstStepWithGreaterTime(timeline, time);
  insertElementIntoArrayAtIndex(newStep, timeline, firstStepWithGreaterTime);
  return timeline;
}
