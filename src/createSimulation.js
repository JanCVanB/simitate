import Immutable from 'immutable';
import { combineReducers, createStore } from 'redux';
import { insertEventIntoTimeline } from './timelineUtils';

export default function createSimulation(
  initialActors, initialTimeline, actorsReactions, timelineReactions
) {
  const actors = (actors_ = initialActors, event) => {
    switch (event.type) {
      case 'ADD_ACTOR':
        return [...actors_, event.actor];
      case 'LOG_ACTOR_HISTORIES':
        return actors_.map(actor => {
          const actorHistory = actor.history ? actor.history : [];
          const historyEntry = (
            Immutable.fromJS(actor)
              .delete('history').set('time', event.time).toJS()
          );
          const updatedHistory = [...actorHistory, historyEntry];
          const actorWithUpdatedHistory = (
            Immutable.fromJS(actor).set('history', updatedHistory).toJS()
          );
          return actorWithUpdatedHistory;
        });
      default:
        if (event.type in actorsReactions) {
          return actorsReactions[event.type](actors_, event);
        }
        return actors_;
    }
  };

  const currentEventIndex = (currentEventIndex_ = 0, event) => {
    switch (event.type) {
      case 'INCREMENT_CURRENT_EVENT_INDEX':
        return currentEventIndex_ + 1;
      default:
        return currentEventIndex_;
    }
  };

  const timeline = (timeline_ = initialTimeline, event) => {
    switch (event.type) {
      case 'ADD_EVENT':
        return insertEventIntoTimeline(event.event, [...timeline_]);
      default:
        if (event.type in timelineReactions) {
          return timelineReactions[event.type](timeline_, event);
        }
        return timeline_;
    }
  };

  const simulation = combineReducers({
    actors,
    currentEventIndex,
    timeline,
  });

  const simulationStore = createStore(simulation);

  return simulationStore;
}
