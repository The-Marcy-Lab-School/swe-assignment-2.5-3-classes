# Assignment 2.5.3 - Classes

- [Overview](#overview)
- [Setup](#setup)
- [Short Response](#short-response)
- [Problem 1: Inheritance and Polymorphism - Media Player](#problem-1-inheritance-and-polymorphism---media-player)
  - [Part 1: MediaItem class (parent)](#part-1-mediaitem-class-parent)
  - [Part 2: Song class (child)](#part-2-song-class-child)
  - [Part 3: Podcast class (child)](#part-3-podcast-class-child)
  - [Part 4: Audiobook class (child)](#part-4-audiobook-class-child)
  - [Demonstrating Polymorphism](#demonstrating-polymorphism)
- [Problem 2: Composition - Team and Player](#problem-2-composition---team-and-player)
  - [Player class](#player-class)
  - [Team class](#team-class)

## Overview

In this assignment, you will practice implementing classes in JavaScript. There are two coding problems and three short response questions.

**Coding Problems:**
1. **Problem 1** demonstrates **inheritance** and **polymorphism** — a `MediaItem` parent class with three child classes (`Song`, `Podcast`, `Audiobook`) that each override the `play()` method.
2. **Problem 2** demonstrates **composition** — a `Team` class that *contains* `Player` objects.

We've provided example usage that you can use to manually test your code. Do this first.

Then, run `npm test` to verify your implementations before submitting.

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

Here are some useful commands to remember.

```sh
git checkout -b draft   # switch to the draft branch before starting

git add -A              # add a changed file to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

When you are finished, create a pull request and tag your instructor for review.

---

## Short Response

Short response questions can be found in the `src/short-response.md` file. Write your responses directly in that file! Do not forget to complete this part of the assignment.

---

## Problem 1: Inheritance and Polymorphism - Media Player

**Instructions:** In the `src/1-media.js` file, demonstrate **inheritance** and **polymorphism** by creating a `MediaItem` parent class and three child classes: `Song`, `Podcast`, and `Audiobook`.

Each child class will override the `play()` method to return a different message — this is **polymorphism** in action!

### Part 1: MediaItem class (parent)

Create a `MediaItem` class with the following:

- **Instance Properties:**
  - `title` (String, public, set by the constructor)
  - `duration` (Number in seconds, public, set by the constructor)
- **Instance Methods:**
  - `play()` - returns `"Playing: {title}"`
  - `getFormattedDuration()` - returns the duration formatted as `"MM:SS"` (e.g., `354` seconds becomes `"5:54"`)

Test your `MediaItem` class with the following example usage:

```js
const media = new MediaItem("Unknown Media", 180);
console.log(media); // MediaItem { title: "Unknown Media", duration: 180 }
console.log(media.play()); // "Playing: Unknown Media"
console.log(media.getFormattedDuration()); // "3:00"
```

### Part 2: Song class (child)

Create a `Song` class that extends `MediaItem` with the following:

- **Additional Instance Properties:**
  - `artist` (String, public, set by the constructor)
- **Overridden Methods:**
  - `play()` - returns `"Playing: {title} by {artist}"`

Test your `Song` class with the following example usage:

```js
const song = new Song("Bohemian Rhapsody", 354, "Queen");
console.log(song); // Song { title: "Bohemian Rhapsody", duration: 354, artist: "Queen" }
console.log(song.play()); // "Playing: Bohemian Rhapsody by Queen"
console.log(song.getFormattedDuration()); // "5:54"
```

### Part 3: Podcast class (child)

Create a `Podcast` class that extends `MediaItem` with the following:

- **Additional Instance Properties:**
  - `host` (String, public, set by the constructor)
  - `episodeNumber` (Number, public, set by the constructor)
- **Overridden Methods:**
  - `play()` - returns `"Playing: {title} with host {host}, Episode {episodeNumber}"`

Test your `Podcast` class with the following example usage:

```js
const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
console.log(podcast); 
// Podcast { title: "Tech Talk", duration: 2400, host: "Jane Smith", episodeNumber: 42 }
console.log(podcast.play()); // "Playing: Tech Talk with host Jane Smith, Episode 42"
console.log(podcast.getFormattedDuration()); // "40:00"
```

### Part 4: Audiobook class (child)

Create an `Audiobook` class that extends `MediaItem` with the following:

- **Additional Instance Properties:**
  - `author` (String, public, set by the constructor)
  - `narrator` (String, public, set by the constructor)
- **Overridden Methods:**
  - `play()` - returns `"Playing: {title} by {author}, narrated by {narrator}"`

Test your `Audiobook` class with the following example usage:

```js
const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");
console.log(audiobook);
// Audiobook { title: "The Great Gatsby", duration: 32400, author: "F. Scott Fitzgerald", narrator: "Jake Gyllenhaal" }
console.log(audiobook.play()); 
// "Playing: The Great Gatsby by F. Scott Fitzgerald, narrated by Jake Gyllenhaal"
console.log(audiobook.getFormattedDuration()); // "540:00"
```

### Demonstrating Polymorphism

Once all classes are implemented, inside the provided `test()` function, test polymorphism by creating an array of different media items and calling `play()` on each:

```js
const test = () => {
  const song = new Song("Bohemian Rhapsody", 354, "Queen");
  const podcast = new Podcast("Tech Talk", 2400, "Jane Smith", 42);
  const audiobook = new Audiobook("The Great Gatsby", 32400, "F. Scott Fitzgerald", "Jake Gyllenhaal");

  const mediaLibrary = [song, podcast, audiobook];

  // Polymorphism: same method call, different behavior
  mediaLibrary.forEach(media => {
    console.log(media.play());
  });
}
/*
Output:
"Playing: Bohemian Rhapsody by Queen"
"Playing: Tech Talk with host Jane Smith, Episode 42"
"Playing: The Great Gatsby by F. Scott Fitzgerald, narrated by Jake Gyllenhaal"
*/
```

## Problem 2: Composition - Team and Player

**Instructions:** In the `src/2-team.js` file, create a `Player` class and a `Team` class that demonstrates **composition** (a team *has* players).

### Player class

Create a `Player` class with the following:

- **Instance Properties:**
  - `name` (String, public, set by the constructor)
  - `position` (String, public, set by the constructor)
  - `jerseyNumber` (Number, public, set by the constructor)

Test your `Player` class with the following example usage:

```js
const player1 = new Player("LeBron James", "Forward", 23);
const player2 = new Player("Stephen Curry", "Guard", 30);
const player3 = new Player("Kevin Durant", "Forward", 35);

console.log(player1); // Player { name: "LeBron James", position: "Forward", jerseyNumber: 23 }
console.log(player2); // Player { name: "Stephen Curry", position: "Guard", jerseyNumber: 30 }
console.log(player3); // Player { name: "Kevin Durant", position: "Forward", jerseyNumber: 35 }
```

### Team class

Create a `Team` class with the following:

- **Instance Properties:**
  - `name` (String, public, set by the constructor)
  - `starters` (Array of `Player` objects, *private*, starting value of `[]`)
  - `bench` (Array of `Player` objects, *private*, starting value of `[]`)
- **Instance Methods:**
  - `getStarters()` - returns the `starters` array (or use `get` syntax)
  - `getBench()` - returns the `bench` array (or use `get` syntax)
  - `addBenchPlayer(player)` - adds a `Player` object to the `bench` array
  - `getPlayerCount()` - returns the total number of players on the team (starters + bench)
  - `moveToBench(name)` - moves the first `Player` with a matching name from the `starters` array to the `bench` array. Returns `true` if a player was successfully moved, `false` otherwise (e.g. if there was no player with that name in starters).
  - `moveToStarters(name)` - moves the first `Player` with a matching name from the `bench` array to the `starters` array. Returns `true` if a player was successfully moved, `false` otherwise (e.g. if there was no player with that name on the bench).

Test your `Team` class with the following example usage:

```js
const player1 = new Player("LeBron James", "Forward", 23);
const player2 = new Player("Stephen Curry", "Guard", 30);
const player3 = new Player("Kevin Durant", "Forward", 35);
const player4 = new Player("Anthony Davis", "Center", 3);

const team = new Team("All Stars");
console.log(team); // Team { name: "All Stars" }

// 1. Adding players to the bench
team.addBenchPlayer(player1);
team.addBenchPlayer(player2);
team.addBenchPlayer(player3);
team.addBenchPlayer(player4);

console.log(team.getBench());
// OR if you use the get syntax:
console.log(team.bench);
/*
[
  Player { name: "LeBron James", position: "Forward", jerseyNumber: 23 },
  Player { name: "Stephen Curry", position: "Guard", jerseyNumber: 30 },
  Player { name: "Kevin Durant", position: "Forward", jerseyNumber: 35 },
  Player { name: "Anthony Davis", position: "Center", jerseyNumber: 3 }
]
*/
console.log(team.getStarters()); // []

// 2. Getting total player count
console.log(team.getPlayerCount()); // 4

// 3. Moving players to starters
console.log(team.moveToStarters("LeBron James")); // true
console.log(team.moveToStarters("Stephen Curry")); // true
console.log(team.moveToStarters("Michael Jordan")); // false (not on the team)

console.log(team.getStarters());
/*
[
  Player { name: "LeBron James", position: "Forward", jerseyNumber: 23 },
  Player { name: "Stephen Curry", position: "Guard", jerseyNumber: 30 }
]
*/
console.log(team.getBench());
/*
[
  Player { name: "Kevin Durant", position: "Forward", jerseyNumber: 35 },
  Player { name: "Anthony Davis", position: "Center", jerseyNumber: 3 }
]
*/

// 4. Moving a player back to the bench
console.log(team.moveToBench("Stephen Curry")); // true
console.log(team.getStarters().length); // 1
console.log(team.getBench().length); // 3
```
