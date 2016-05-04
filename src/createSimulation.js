import Immutable from 'immutable';
import { combineReducers, createStore } from 'redux';
import { insertEventIntoTimeline } from './timelineUtils';

export default function createSimulation(
  initialActors, initialTimeline, actorReactions
) {
  const actors = (actors_ = initialActors, event) => {
    switch (event.type) {
      case 'ADD_ACTOR':
        return [...actors_, event.actor];
      case 'LOG_ACTOR_HISTORIES':
        if (!actors_[0].history) {
          return actors_.map(actor => (
            Immutable.fromJS(actor).set('history', [actor]).toJS()
          ));
        }
        return actors_.map(actor => (
          Immutable.fromJS(actor).set(
            'history',
            [...actor.history, Immutable.fromJS(actor).delete('history').toJS()]
          ).toJS()
        ));
      default:
        if (event.type in actorReactions) {
          return actorReactions[event.type](actors_, event);
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
