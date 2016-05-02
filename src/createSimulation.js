import { combineReducers, createStore } from 'redux';
import scheduleEvent from './scheduleEvent';

export default function createSimulation() {
  const actors = (state = [], action) => {
    switch (action.type) {
      case 'ADD_ACTOR':
        return [...state, action.actor];
      default:
        return state;
    }
  };

  const currentStep = (state = 0, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const initialEvents = (state = [], action) => {
    switch (action.type) {
      case 'ADD_INITIAL_EVENT':
        return [...state, action.event];
      default:
        return state;
    }
  };

  const timeline = (state = [], action) => {
    switch (action.type) {
      case 'SCHEDULE_EVENT':
        return scheduleEvent([...state], action.time, action.event);
      default:
        return state;
    }
  };

  const simulation = combineReducers({
    actors,
    currentStep,
    initialEvents,
    timeline,
  });

  const simulationStore = createStore(simulation);

  return simulationStore;
}
