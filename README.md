# Simitate

_**Architect and visualize actor/event simulations
that imitate the cause-and-effect of reality**_

A simitate [simulation](#simulation) consists of
[actors](#actors), [events](#events), [a timeline](#timeline), and [reactions](#reactions).

Simitate is built on top of (and based on the ideas of) [Redux](https://github.com/reactjs/redux).

## How to run a simulation

### Install

```bash
cd path/to/my/simulation/
git clone https://github.com/jvanbrug/simitate
cd simitate
npm install
cd ..
```

### Use

```javascript
// mySimulation.js
const simitate = require('./simitate/src/index');
const actors = [
  // Initial actors
];
const timeline = [
  // Initial events
];
const actorsReactions = {
  // Actors' reactions to events
};
const timelineReactions = {
  // Timeline's reactions to events
};
const simulation = simitate.createSimulation(
  actors, timeline, actorsReactions, timelineReactions,
);
simitate.run(simulation);
const actorHistories = simitate.getActorHistories(simulation);
```

### Run

```bash
./simitate/node_modules/.bin/babel-node mySimulation.js
```

## Documentation

### Actors

An actor is an object with some properties.

You provide the simulation with an array of initial actors.

```javascript
const actors = [
  { name: 'Alice', age: 30 },
  { id: 123, description: 'a pencil' },
];
```

### Events

An event is an object with a `type`, a `time`,
and (optionally) some other properties.

```javascript
const lunch = { type: 'MEAL', time: 12, order: 'curry' };
```

### Timeline

A timeline is an array of events.

You provide the simulation with an initial timeline.

```javascript
const timeline = [
  { type: 'SUNRISE', time: 6, beauty: 8 },
  { type: 'MEAL', time: 7, order: 'breakfast burrito', tastiness: 10 },
];
```

### Reactions

A reaction is a ["pure" function](#a-note-on-pure-functions)
that takes an `event` and the current `actors`/`timeline`
and returns the new `actors`/`timeline`.

You provide the simulation with reactions for each event type,
for both the `actors` and the `timeline`.

```javascript
const getAwakeActor = actor => Immutable.fromJS(actor).set(awake, true).toJS();
const actorsReactToSunrise = (actors, sunrise) => actors.map(getAwakeActor);

const actorsReactions = {
  SUNRISE: actorsReactToSunrise,
};

const timelineReactsToSunrise = (timeline, sunrise) => {
  const nextSunset = { type: 'SUNSET', time: sunrise.time + 12, beauty: sunrise.beauty + 1 };
  const newTimeline = simitate.insertEventIntoTimeline(nextSunset, timeline);
  return newTimeline;
};

const timelineReactions = {
  SUNRISE: timelineReactsToSunrise,
};
```

#### A note on "pure" functions

Reactions must be "pure" functions. A "pure" function:

- does not mutate (modify/update/reassign) its arguments
- does not access any data other than its arguments
- does not store/mutate any data outside of its function scope
- has no side effects

so a "pure" function always returns an equivalent output value
when called with a given set of input arguments.
