const Immutable = require('immutable');
const simitate = require('../src/index');

const alice = { name: 'Alice', awake: false };
const betty = { name: 'Betty', awake: false };
const initialActors = [alice, betty];
const midnightTimeOfDay = 0;
const dawnTimeOfDay = 500;
const noonTimeOfDay = 1200;
const duskTimeOfDay = 1900;
const midnightEvent = {
  type: 'TIME_OF_DAY', time: midnightTimeOfDay, timeOfDay: midnightTimeOfDay,
};
const dawnEvent = {
  type: 'TIME_OF_DAY', time: dawnTimeOfDay, timeOfDay: dawnTimeOfDay,
};
const noonEvent = {
  type: 'TIME_OF_DAY', time: noonTimeOfDay, timeOfDay: noonTimeOfDay,
};
const lunchEvent = {
  type: 'TIME_OF_DAY', time: noonTimeOfDay, timeOfDay: noonTimeOfDay,
};
const duskEvent = {
  type: 'TIME_OF_DAY', time: duskTimeOfDay, timeOfDay: duskTimeOfDay,
};
const initialTimeline = [
  midnightEvent, dawnEvent, noonEvent, lunchEvent, duskEvent,
];
const actorReactions = {
  TIME_OF_DAY: (currentActors, event) => {
    switch (event.timeOfDay) {
      case dawnTimeOfDay:
        return currentActors.map(actor =>
          Immutable.fromJS(actor).set('awake', true).toJS());
      case duskTimeOfDay:
        return currentActors.map(actor =>
          Immutable.fromJS(actor).set('awake', false).toJS());
      default:
        return currentActors;
    }
  },
};
const timelineReactions = {
  TIME_OF_DAY: (currentTimeline, event) => {
    if (event.time > 2400 * 5) {
      return currentTimeline;
    }
    const sameTimeTomorrow = (
      Immutable.fromJS(event).set('time', event.time + 2400).toJS()
    );
    if (sameTimeTomorrow.time > 12000) {
      return currentTimeline;
    }
    return simitate.insertEventIntoTimeline(
      sameTimeTomorrow, [...currentTimeline]
    );
  },
};

const simulation = simitate.createSimulation(
  initialActors, initialTimeline, actorReactions, timelineReactions
);
simitate.run(simulation);

const actorHistories = simitate.getActorHistories(simulation);
const aliceHistory = actorHistories[0];
const bettyHistory = actorHistories[1];
const aliceBedtimes = (
  aliceHistory
    .filter((event, index) => (
      index > 0 && !event.awake && aliceHistory[index - 1].awake
    ))
    .map(event => event.time)
);
const bettyWakeUpTimes = (
  bettyHistory
    .filter((event, index) => (
      index > 0 && event.awake && !bettyHistory[index - 1].awake
    ))
    .map(event => event.time)
);

console.log();
console.log('Alice\'s bedtimes:');
console.log(aliceBedtimes);
console.log();
console.log('Betty\'s wake-up times:');
console.log(bettyWakeUpTimes);
console.log();

export {
  initialActors, initialTimeline, actorReactions, timelineReactions,
  dawnEvent, duskEvent,
};
