# What is this for?

First time playing with [phaser3](https://phaser.io/) using this tutorial on [shakuro](https://shakuro.com/blog/phaser-js-a-step-by-step-tutorial-on-making-a-phaser-3-game)

Let's make tile maps [here](https://www.mapeditor.org/)

## How to run

-yarn/npm dev: runs dev build(source map se tto true, easy to debug in browser)
-yarn/npm build: builds prod build(compiled assets in browser hard to debug)

## Debug resources

[gamedevacademy.org - The Complete Guide to Debugging Phaser Games by Ben Sparks](https://gamedevacademy.org/how-to-debug-phaser-games/)

## What to try next

-Add two types of enemies, that will attack each other and the player
-Add health item to pick up to gain health
-Calculate final score as a function of regular score plus health points
-Allow one enemy to shoot projectiles(maybe animate projectiles)
-When you pickup a chest, does pokemon like battle sequence to allow you to play small gravity mini game, chest score is the same as minigame score
-Build small gravity minigame

## Gravity mini game

this will be a simple mini game where you and an AI are to move your avatar around a field and the more particles you collect within a set time span the more points you game from the chest mini game

Your avatar will suck up particles in a gravity like manner

## Shader

I added a shader to the transitions for experimentation. 

I used this youtube video and this tool to get our test-shader.webm

[Youtube video by kishimisu](https://www.youtube.com/watch?v=f4s1h2YETNY)

[ShaderToy](https://www.shadertoy.com/view/mtyGWy)

## Other phaser 3 projects to learn form

[Pokemon clone in phaser](https://github.com/konato-debug/pokemon-phaser)

# Current TODOs(IN progress, didn't complete)

I have broken the end game state, I was trying to play 8 seconds of a custom shader as we waited for another scene(gravity collector minigame) to load up, that's currently broken, working on fixing the playing of webm videos. 