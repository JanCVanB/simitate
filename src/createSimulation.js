import { combineReducers, createStore } from 'redux';
import scheduleEvent from './scheduleEvent';

export default function createSimulation(eventReactions) {
  const currentActors = (state = [], action) => {
    switch (action.type) {
      case 'INITIALIZE_CURRENT_ACTORS':
        return action.actors;
      default:
        if (action.type in eventReactions) {
          return eventReactions[action.type](state, action);
        }
        return state;
    }
  };

  const currentStep = (state = 0, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const initialActors = (state = [], action) => {
    switch (action.type) {
      case 'ADD_INITIAL_ACTOR':
        return [...state, action.actor];
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
    currentActors,
    currentStep,
    initialActors,
    initialEvents,
    timeline,
  });

  const simulationStore = createStore(simulation);

  return simulationStore;
}
