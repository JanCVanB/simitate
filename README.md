# Simitate

_Architect and visualize actor/event simulations
that imitate the cause-and-effect of reality_

## You should use this because it's simple

If you need to simulate how a system reacts to various events, keep each
actor's reaction logic as simple as possible.

An actor's event reaction only depends on **the details of the event** and
**the current state of the actors**.

## What's wrong with process-based simulations

If actor behavior is process-based (which means that each actor's behavior at
any given time depends on their progress through a pre-defined series of
`pause/resume` statements, `if/else` blocks, and `for/while` loops), then it's
impossible to know how the actors will respond to a certain situation without
running the entire simulation up to that moment.

With Simitate, you can put the actors in any state and see how they react to
any event.

## You should also use this because Redux

Simitate is built on top of [Redux](https://github.com/reactjs/redux) -
a popular state management framework that enables web developers to define the
entire web app state in a single object and declare how the state should change
in response to each possible user action.

Because Redux represents each simulation state as a self-contained JSON
and each event reaction as a pure function that returns a new state...

-   Simitate is a very simple wrapper around an established engine.

-   Simitate can split into parallel threads to explore all possible futures,
    time travel back to any step of a simulation, and re-run any part of a
    simulation with different parameters. (COMING SOON)

-   Simitate can automatically generate user interfaces for architecting and
    visualizing simulations. (COMING SOON)

## Feedback appreciated

At the time of writing, Simitate is only a few weeks old, so it barely
satisfies simple use cases. However, its foundation is solid, so it has a lot
of room to grow.

I'd love to hear your feedback, in order to develop this tool to address your
use case as simply as possible, so feel free to email me!

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

A simitate [simulation](#simulation) consists of [actors](#actors),
[events](#events), [a timeline](#timeline), and [reactions](#reactions).

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
const actorsReactionToSunrise = (actors, sunrise) => actors.map(getAwakeActor);

const actorsReactions = {
  SUNRISE: actorsReactionToSunrise,
};

const timelineReactionToSunrise = (timeline, sunrise) => {
  const nextSunset = { type: 'SUNSET', time: sunrise.time + 12, beauty: sunrise.beauty + 1 };
  const newTimeline = simitate.insertEventIntoTimeline(nextSunset, timeline);
  return newTimeline;
};

const timelineReactions = {
  SUNRISE: timelineReactionToSunrise,
};
```

#### A note on "pure" functions

Reactions must be "pure" functions. A "pure" function:

-   does not mutate (modify/update/reassign) its arguments
-   does not access any data other than its arguments
-   does not store/mutate any data outside of its function scope
-   has no side effects

so a "pure" function always returns an equivalent output value
when called with a given set of input arguments.
