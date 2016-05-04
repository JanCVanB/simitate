# Simitate

Architect and visualize actor/event-based simulations
that imitate the cause-and-effect of reality

## How to run a simulation

### Install

    $ cd path/to/my/simulation/
    $ git clone https://github.com/jvanbrug/simitate
    $ cd simitate
    $ npm install
    $ cd ..

### Use

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

### Run

    $ ./simitate/node_modules/.bin/babel-node mySimulation.js
