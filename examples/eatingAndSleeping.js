const Immutable = require('immutable');
const simitate = require('../src/index');

const BREAKFAST = 'BREAKFAST';
const LUNCH = 'LUNCH';
const DINNER = 'DINNER';
const TIME_OF_DAY = 'TIME_OF_DAY';
const midnight = 0;
const dawn = 600;
const noon = 1200;
const dusk = 1800;

const initialActors = [
  { name: 'Alice', awake: true, fullness: 1, metabolism: 0.9 },
  { name: 'Betty', awake: true, fullness: 1, metabolism: 1.3 },
];
const initialTimeline = [
  { time: 1.00, type: TIME_OF_DAY, timeOfDay: midnight },
  { time: 1.25, type: TIME_OF_DAY, timeOfDay: dawn },
  { time: 1.30, type: BREAKFAST },
  { time: 1.50, type: TIME_OF_DAY, timeOfDay: noon },
  { time: 1.50, type: LUNCH },
  { time: 1.70, type: DINNER },
  { time: 1.75, type: TIME_OF_DAY, timeOfDay: dusk },
  { time: 2.00, type: TIME_OF_DAY, timeOfDay: midnight },
  { time: 2.25, type: TIME_OF_DAY, timeOfDay: dawn },
  { time: 2.50, type: TIME_OF_DAY, timeOfDay: dawn },
  { time: 2.60, type: DINNER },
  { time: 2.75, type: TIME_OF_DAY, timeOfDay: dusk },
];

const actorsReactions = {
  BREAKFAST: (currentActors) => (
    currentActors.map(actor => (
      Immutable.fromJS(actor).set('fullness', 0.7).toJS()
    ))
  ),
  LUNCH: (currentActors) => (
    currentActors.map(actor => (
      Immutable.fromJS(actor).set('fullness', 0.9).toJS()
    ))
  ),
  DINNER: (currentActors) => (
    currentActors.map(actor => (
      Immutable.fromJS(actor).set('fullness', 1.1).toJS()
    ))
  ),
  TIME_OF_DAY: (currentActors, event) => {
    switch (event.timeOfDay) {
      case dawn:
        return currentActors.map(actor =>
          Immutable.fromJS(actor)
            .set('awake', true)
            .set('fullness', actor.fullness - actor.metabolism)
            .toJS());
      case noon:
        return currentActors.map(actor =>
          Immutable.fromJS(actor)
            .set('fullness', actor.fullness - actor.metabolism)
            .toJS());
      case dusk:
        return currentActors.map(actor =>
          Immutable.fromJS(actor)
            .set('awake', false)
            .set('fullness', actor.fullness - actor.metabolism)
            .toJS());
      default:
        return currentActors;
    }
  },
};

const timelineReactions = {};

const simulation = simitate.createSimulation(
  initialActors, initialTimeline, actorsReactions, timelineReactions
);
simitate.run(simulation);

const actorHistories = simitate.getActorHistories(simulation);
const aliceFullnessOverTime = actorHistories[0].map(event => event.fullness);
const bettyFullnessOverTime = actorHistories[1].map(event => event.fullness);

console.log();
console.log('Alice\'s fullness over time:');
console.log(aliceFullnessOverTime);
console.log();
console.log('Betty\'s fullness over time:');
console.log(bettyFullnessOverTime);
console.log();
