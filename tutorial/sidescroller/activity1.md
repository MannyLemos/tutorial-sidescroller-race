# Laying the Foundation

```ghost
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    drsState = 0
    drsFactor = 1
    racerLaunched = 0
    nextOpponentSpawnTime = 0
}
function Initialize_Objects () {
    foundation.SetBackground()
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    controller.moveSprite(myRacer, 75, 75)
}
let myRacer: Sprite = null
let progressionVelocity = 0
let nextOpponentSpawnTime = 0
let drsState = 0
let racerLaunched = 0
let distanceRemaining = 0
let drsFactor = 0
let raceStage = 0
Initialize_Variables()
Race_Countdown_Animation()
Initialize_Objects()

```

## {Step 1}
on start block
---
The ``||loops:on start||`` block is the first thing that runs when our game begins.
___
It runs each of the blocks it contains before resting.
___
The ``||loops:on start||`` block has already been placed into the workspace for you.

## {Step 2}
Function Blocks
---
``||functions:Functions||`` run each of the blocks they contain every time they are called.
___
At the start of our game we will want to perform some steps to setup our race.
___
To achieve this we will use ``||functions:Functions||`` that are called from the ``||loops:on start||`` block.

## {Step 3}
Creating a Function
---
All ``||functions:Functions||`` created for this game will use *Upper_Snake_Case*
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Click ``||arrays:Make a Function...||``
___
4. Delete the default ``||functions:doSomething||``  function name.<br>
Type ``||functions:Initialize_Variables||`` in that space.
___
5. Click ``||loops:Done ✓||``
___
The ``||functions:Initialize_Variables||`` function block should automatically drop into your workspace.

```blocks
function Initialize_Variables () {
}
```

## {Step 4}
Calling a Function
---
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Drag the <br>``||functions:call Initialize_Variables||`` block into your ``||loops:on start||`` block.

```blocks
function Initialize_Variables () {
}
Initialize_Variables()
```

## {Step 5}
Creating and Setting a Variable
---
All ``||variables:Variables||`` created for this game will use *lowerCamelCase*.
___
1. Click the ``||variables:Variables||`` category.
___
2. Click ``||arrays:Make a Variable...||``
___
3. Name the variable ``||variables:distanceRemaining||``
___
4. Click ``||loops:Ok ✓||``
___
5. Grab the <br>``||variables: set distanceRemaining to 0||`` block.<br>
 ► Drag it into the ``||functions:Initialize_Variables||`` function block.
___
6. Click the **0** inside ``||variables: set distanceRemaining to 0||``<br>
► Change it to **1500**.
___
``||variables:distanceRemaining||`` will be used to track the distance remaining in meters before the race finishes.

```blocks
function Initialize_Variables () {
    distanceRemaining = 1500
}
```

## {Step 6}
raceStage Variable
---
1. Click the ``||variables:Variables||`` category.
___
2. Click ``||arrays:Make a Variable...||``
___
3. Name the variable ``||variables:raceStage||``
___
4. Click ``||loops:Ok ✓||``
___
5. Grab the <br>``||variables: set raceStage to 0||`` block.<br>
 ► Drag it into the ``||functions:Initialize_Variables||`` function block.
___
``||variables:raceStage||`` will be used to track the stage of the game.<br>
0 → Game Setup<br>
1 → Await Racer Launch<br>
2 → Race underway<br>
3 → Finish Line Sequence<br>
4 → Game Over<br>
Don't worry, You dont need to remember this!

```blocks
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
}
```

## {Step 7}
drsState Variable
---
1. Click the ``||variables:Variables||`` category.
___
2. Click ``||arrays:Make a Variable...||``
___
3. Name the variable ``||variables:drsState||``
___
4. Click ``||loops:Ok ✓||``
___
5. Drag the ``||variables: set drsState to 0||`` block into the ``||functions:Initialize_Variables||`` function block.
___
``||variables:drsState||`` will be used to track speed boosting state. In F1 racing this is known as drag reduction.<br>
0 → Speed Boost Disabled<br>
1 → Speed Boost Enabled<br>
Don't worry, You dont need to remember this!

```blocks
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    drsState = 0
}
```

## {Step 8}
drsFactor Variable
---
1. Click the ``||variables:Variables||`` category.
___
2. Click <br>``||arrays:Make a Variable...||``
___
3. Name the variable ``||variables:drsFactor||``
___
4. Click ``||loops:Ok ✓||``
___
5. Grab the <br>``||variables: set drsFactor to 0||``<br>
block into the<br>
``||functions:Initialize_Variables||`` function block.
___
6. Click the **0** inside<br>
``||variables: set drsFactor to 0||``<br>
and change it to **1**.
___
``||variables:drsFactor||`` will be used to track the speed boosting multiplier.

```blocks
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    drsState = 0
    drsFactor = 1
}
```

## {Step 9}
racerLaunched Variable
---
1. Click the ``||variables:Variables||`` category.
___
2. Click <br>``||arrays:Make a Variable...||``
___
3. Name the variable ``||variables:racerLaunched||``
___
4. Click ``||loops:Ok ✓||``
___
5. Grab the <br>``||variables: set racerLaunched to 0||`` block.<br>
 ► Drag it into the ``||functions:Initialize_Variables||`` function block.
___
``||variables:racerLaunched||`` will be used to track whether a racer has launched from the start line.<br>
0 → Racer has not launched.<br>
1 → Racer has launched!<br>
Don't worry, You dont need to remember this!

```blocks
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    drsState = 0
    drsFactor = 1
    racerLaunched = 0
}
```

## {Step 10}
nextOpponentSpawnTime Variable
---
1. Click the ``||variables:Variables||`` category.
___
2. Click ``||arrays:Make a Variable...||``
___
3. Name the variable ``||variables:nextOpponentSpawnTime||``
___
4. Click ``||loops:Ok ✓||``
___
5. Grab the <br>``||variables: set nextOpponentSpawnTime to 0||`` block.<br>
 ► Drag it into the ``||functions:Initialize_Variables||`` function block.
___
``||variables:nextOpponentSpawnTime||`` will be used to track the amount of time until we should create a new opponent.<br>
By default we set this to zero because we want to spawn an opponent as soon as the game starts.

```blocks
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    drsState = 0
    drsFactor = 1
    racerLaunched = 0
    nextOpponentSpawnTime = 0
}
```

## {Step 11}
Creating Initialize_Objects Function
---
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Click ``||arrays:Make a Function...||``.
___
4. Delete the default ``||functions:doSomething||``  function name.<br>
Type ``||functions:Initialize_Objects||`` in that space.
___
5. Click ``||loops:Done ✓||``
___
The ``||functions:Initialize_Objects||`` function block should automatically drop into your workspace.

```blocks
function Initialize_Objects () {
}
```

## {Step 12}
Calling Initialize_Objects Function
---
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Drag the <br>``||functions:call Initialize_Objects||`` block into the bottom of the <br>``||loops:on start||`` block.

```blocks
// @hide
function Initialize_Variables () {}
function Initialize_Objects () {}
Initialize_Variables()
Initialize_Objects()
```

## {Step 13}
Setting the Background
---
1. Click the ``||foundation:Foundation||`` category.
___
2. Drag the <br>``||foundation:set background||``<br>
block into the<br>
``||functions:Initialize_Objects||`` function block.
___
The track image should now populate the game window!

```blocks
function Initialize_Objects () {
    foundation.SetBackground()
}
```

## {Step 14}
Creating our Racer
---
1. Click the ``||sprites:Sprites||`` category.
___
2. Drag the <br>
``||variables:set mySprite to||`` ``||sprites:sprite [ ] of kind Player||``<br>
block into the bottom of the<br>
``||functions:Initialize_Objects||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Click ``||variables:Rename variable...||``, and change the name to ``||variables:myRacer||``
___
4. Click the grey box<br>
► Click the **Gallery** tab<br>
► Click the racecar image named **player-pink**<br>
► Click ``||loops:Done||``<br><br>
Note: The name of a gallery asset can be determined by hovering the mouse over the asset for approximately 2 seconds.
___
A pink racecar should be present in your game window!

```blocks
function Initialize_Objects () {
    foundation.SetBackground()
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
}
```

## {Step 15}
Moving our Racer
---
1. Click the ``||controller:Controller||`` category.
___
2. Drag the <br>``||controller: move mySprite with buttons +||`` block into the bottom of the 
``||functions:Initialize_Objects||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Select ``||variables:myRacer||`` from the list.
___
4. Click the ``||controller:+||`` button<br>
► Change the value of ``||controller:vx||`` to **75**.<br>
This determines the horizontal movement speed of our racer.<br>
► Change the value of ``||controller:vy||`` to **75**.<br>
This determines the vertical movement speed of our racer.
___
Using the Controller D-Pad / WASD / Arrow Keys, you should now be able to move the racecar in the game window.

```blocks
function Initialize_Objects () {
    foundation.SetBackground()
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    controller.moveSprite(myRacer, 75, 75)
}
```

## {Step 16}
Keeping our Racer on Screen
---
1. Click the ``||sprites:Sprites||`` category.
___
2. Drag the <br>``||sprites:set||`` ``||variables:mySprite||`` ``||sprites:stay in screen||`` ``||loops:<ON>||``<br>
block into the bottom of the<br>
``||functions:Initialize_Objects||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Select ``||variables:myRacer||`` from the list.
___
The racecar should now be contained to the game window. 

```blocks
function Initialize_Objects () {
    foundation.SetBackground()
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    controller.moveSprite(myRacer, 75, 75)
    myRacer.setStayInScreen(true)
}
let myRacer: Sprite = null
```