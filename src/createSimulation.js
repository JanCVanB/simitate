import { combineReducers, createStore } from 'redux';
import {
  getIndexOfFirstElementThatSatisfies,
  insertElementIntoArrayAtIndex,
} from './utils';

export default function createSimulation() {
  const currentStep = (state = 0, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const actors = (state = [], action) => {
    switch (action.type) {
      case 'ADD_ACTOR':
        return [...state, action.actor];
      default:
        return state;
    }
  };

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

  const scheduleEvent = (timeline, event) => {
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
  };

  const timeline = (state = [], action) => {
    switch (action.type) {
      case 'SCHEDULE_EVENT':
        return scheduleEvent([...state], action.event);
      default:
        return state;
    }
  };

  const simulation = combineReducers({
    currentStep,
    actors,
    timeline,
  });

  const simulationStore = createStore(simulation);

  return simulationStore;
}
