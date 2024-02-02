# Enemies

```template
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    drsState = 0
    drsFactor = 1
    racerLaunched = 0
    nextOpponentSpawnTime = 0
    progressionVelocity = 0
    loopStartTime = 0
    timeSinceRaceStart = 0
    raceStartTime = 0
}
function Initialize_Objects () {
    foundation.SetBackground()
    myRacer = sprites.create(img`
    0 0 0 0 c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c b b c c 0 b b c 0 0 0
    0 0 0 0 c c b b c b 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c b b b c b d d b b 0 0
    0 0 0 0 f c b b c c 0 0 0 c c c b b d d d d d d b 0 0 0 0 0 0 c c c c f c 0 0 d d b 0 0
    d d d d b c c c c b c b b b d d d d d d d d d d d b b c f f 0 0 b c c f 0 0 0 b d b 0 0
    d d d d b f c b c b c f b 3 d d d d d d d d d d d b b c 0 0 0 0 0 b b 0 0 0 0 0 b d b 0
    d 9 9 d b c c b b b c 6 b d 3 3 3 3 d d d d d d d d b b b 0 0 0 b b b b c 0 0 0 6 b b 0
    d d 9 d b c c 6 6 6 6 b d d d d d b b d d d b b b b d d d d d d d d b b b b 0 0 d d b f
    d d 6 d b f c b b b b d d d d d d d d b b b f f f f b d d d d d d d 9 d d d 3 3 3 3 d b
    d d 6 d b f c b b b b d d d d d d d d b b b f f c c d b d d d d d d d d 3 3 b 3 3 3 3 b
    d d 9 d b c c 6 6 6 6 b 3 3 3 3 3 b b 3 d d d d b d 3 d d d d 3 b b b c c 0 0 0 0 d b c
    d 9 9 d b c c c b c c c b 3 3 3 3 3 3 3 d d d 3 d d b c f 0 0 0 c c b b 0 0 0 0 b b c 0
    d d 9 d b f b c c b f f c b d d d d d d d d d d d d b c 0 0 0 0 0 c b b 0 0 0 0 b b c 0
    d d d d b c b c c b b b b b 3 3 d d d d d d d d d b c f f f 0 0 b c c f c 0 0 b b c 0 0
    0 0 0 0 f c b c f c 0 0 b c c b b b d d 3 d 3 b b 0 0 0 0 0 0 0 c b b c c 0 b b b f 0 0
    0 0 0 0 f c b c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c b b c f b 3 3 c c 0 0
    0 0 0 0 c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c f 0 0 c 0 0 0 0
    `, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    controller.moveSprite(myRacer, 75, 75)
}
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("", 0, 1)
    VelocityOverlay.setPosition(125, 8)
    RemainingDistanceOverlay = textsprite.create("", 0, 1)
    RemainingDistanceOverlay.setPosition(75, 8)
    DrsOverlay = textsprite.create("", 0, 2)
    DrsOverlay.setPosition(0, 17)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (raceStage == 1) {
        racerLaunched = 1
        loopStartTime = game.runtime()
    } else if (raceStage == 0) {
        raceStage = 3
        game.setGameOverMessage(false, "FALSE START!")
        game.gameOver(false)
    }
})
function Race_Countdown () {
    countdown.SetCountdownImage1()
    pause(500)
    countdown.SetCountdownImage2()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage3()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage4()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage5()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage6()
    countdown.PlayCountdownTone()
    pause(randint(200, 1500))
    raceStage = 1
    countdown.SetCountdownImage7()
    countdown.PlayStartTone()
    raceStartTime = game.runtime()
    pauseUntil(() => racerLaunched == 1)
}
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
    scroller.scrollBackgroundWithSpeed(progressionVelocity * -0.5, 0)
    distanceRemaining = Math.max(0, distanceRemaining - progressionVelocity * ((game.runtime() - loopStartTime) / 1000))
    loopStartTime = game.runtime()
    timeSinceRaceStart = game.runtime() - raceStartTime
}
function Update_Overlays () {
    ElapsedTimeOverlay.setText("" + timeSinceRaceStart / 1000 + "s")
    VelocityOverlay.setText("" + Math.imul(progressionVelocity, 3.6) + "kph")
    RemainingDistanceOverlay.setText("" + Math.idiv(distanceRemaining, 1) + "m")
}
let myRacer: Sprite = null
let DrsOverlay: TextSprite = null
let RemainingDistanceOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
let ElapsedTimeOverlay: TextSprite = null
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
raceStage = 2

game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Variables()
        Update_Overlays()
    }
})
```

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
    OpponentSpawner = sprites.create(assets.image`temp1`, SpriteKind.Projectile_Spawner)
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    controller.moveSprite(myRacer, 75, 75)
}
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("", 0, 1)
    VelocityOverlay.setPosition(125, 8)
    RemainingDistanceOverlay = textsprite.create("", 0, 1)
    RemainingDistanceOverlay.setPosition(75, 8)
    DrsOverlay = textsprite.create("", 0, 2)
    DrsOverlay.setPosition(0, 17)
}
function Race_Countdown () {
    countdown.SetCountdownImage1()
    pause(500)
    countdown.SetCountdownImage2()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage3()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage4()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage5()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage6()
    countdown.PlayCountdownTone()
    pause(randint(200, 1500))
    raceStage = 1
    countdown.SetCountdownImage7()
    countdown.PlayStartTone()
    raceStartTime = game.runtime()
    pauseUntil(() => racerLaunched == 1)
}
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
    scroller.scrollBackgroundWithSpeed(progressionVelocity * -0.5, 0)
    distanceRemaining = Math.max(0, distanceRemaining - progressionVelocity * ((game.runtime() - loopStartTime) / 1000))
    loopStartTime = game.runtime()
    timeSinceRaceStart = game.runtime() - raceStartTime
}
function Update_Overlays () {
    ElapsedTimeOverlay.setText("" + timeSinceRaceStart / 1000 + "s")
    VelocityOverlay.setText("" + Math.imul(progressionVelocity, 3.6) + "kph")
    RemainingDistanceOverlay.setText("" + Math.idiv(distanceRemaining, 1) + "m")
}
function Spawn_Opponents () {
    OpponentSpawner.setPosition(180, randint(13, 108))
    OpponentRacer = sprites.createProjectileFromSprite(assets.image`opponent-blue`, OpponentSpawner, drsFactor * randint(-25, -75), 0)
}
let ElapsedTimeOverlay = null
let VelocityOverlay = null
let RemainingDistanceOverlay = null
let DrsOverlay = null
let loopStartTime = 0
let myRacer: Sprite = null
let progressionVelocity = 0
let raceStartTime = 0
let nextOpponentSpawnTime = 0
let drsState = 0
let racerLaunched = 0
let distanceRemaining = 0
let drsFactor = 0
let timeSinceRaceStart = 0
let raceStage = 0
let enableText = "" + 5
let enableFloorDiv = Math.idiv(10, 3)
ElapsedTimeOverlay = textsprite.create("", 0, 1)
ElapsedTimeOverlay.setText("HELLO")
myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
let enableX = mySprite.x
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
raceStage = 2
mySprite.setPosition(180, randint(13, 108))
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Variables()
        Update_Overlays()
    }
})
forever(function () {
    if (raceStage == 2) {
        Spawn_Opponents()
    }
    pause(randint(1500, 3000))
})
```

## {Step 1}
Creating the OpponentSpawner
---
How are opponents born? An opponent spawner of course...<br>
Lets set it up.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Drag the <br>
``||variables:set mySprite to||`` ``||sprites:sprite [ ] of kind Player||``<br>
block into the bottom of the<br>
``||functions:Initialize_Objects||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
► Click ``||variables:New variable...||``<br>
► Change the name to ``||variables:OpponentSpawner||``
___
4. Click the ``||sprites:Player||`` dropdown.<br>
► Click ``||sprites:Add a new kind...||``<br>
► Change the name to ``||sprites:Opponent_Spawner||``

```blocks
function Initialize_Objects () {
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    controller.moveSprite(myRacer, 75, 75)
    OpponentSpawner = sprites.create(assets.image`temp1`, Opponent_Spawner)
}
let myRacer: Sprite = null
```


## {Step 2}
The forever block
---
The ``||loops:forever||`` block will begin running in a 
loop after  ``||loops:on start||`` completes.<br>
It will not stop until the race has finished.<br>
We will use this block to generate
enemies during the race.
___
1. Click the ``||loops:Loops||`` category.
___
2. Grab the <br>
``||loops:forever||`` block.<br>
► Drag it into the workspace.

```blocks
forever(function () {
})
```

## {Step 3}
When to run
---
We only want enemies to spawn when the race is underway.<br>
Conveniently we have a parameter ``||raceStage||`` which keeps track of this.<br>
___
1. Create an if block with the condition:<br>
``||logic:if||`` ``||variables:raceStage||`` ``||logic:= 2 then||``<br>
___
2. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||loops:forever||`` block.

```blocks
forever(function () {
    if (raceStage == 2) {
    }
})
```

## {Step 4}
Create and Call the Spawn Opponents Function
---
The ``||functions:Spawn_Opponents||`` generates new enemy cars.
___
1. Create a new Function ``||functions:Spawn_Opponents||``
___
2. Call the ``||functions:Spawn_Opponents||`` function from inside the ``||logic:if||`` block we set up in the previous step.

```blocks
function Spawn_Opponents () {
}
forever(function () {
    if (raceStage == 2) {
        Spawn_Opponents()
    }
})
```

## {Step 5}
Time between opponents
---
Leaving some time between opponents spawning is important for 2 reasons.<br>
It allows players to potentially win the game.<br>
It prevents other infinite loops from being starved of processing time.<br><br>
We will be pausing for a random amount of time to add a layer of 
complexity while dodging vehicles.
___
1. Click the ``||loops:Loops||`` category.
___
2. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||loops:forever||`` block.<br><br>
Note: Ensure the <br>
``||loops:pause 100 ms||``<br>
is below the<br>
``||logic:if||`` block.
___
3. Click the ``||math:Math||`` category.
___
4. Grab the<br>
``||math:pick random 0 to 10||``<br>
► Drag it into the<br>
``||loops:pause 100 ms||`` slot.
___
5. Click the **10** inside<br>
``||math:pick random 0 to 10||``<br>
► Change it to **3000**.
___
6. Click the **0** inside<br>
``||math:pick random 0 to 3000||``<br>
► Change it to **1500**.
___
This means that somewhere between 1.5 and 3 seconds will pass between opponents being spawned.

```blocks
// @hide
function Spawn_Opponents () {
}
forever(function () {
    if (raceStage == 2) {
        Spawn_Opponents()
    }
    pause(randint(1500, 3000))
})
```

## {Step 6}
Placing the opponent spawner
---
Imagine enemy cars moving from the right side of the screen to the left.<br>
If they were always at the same height, dodging would be quite easy.<br>
Lets place the opponent spawner at some random height.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Drag the <br>
``||sprites:set||`` ``||variables:mySprite||`` ``||sprites:position to x 0 y 0||``<br>
block into the<br>
``||functions:Spawn_Opponents||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Change the name to ``||variables:OpponentSpawner||``
___
4. set ``||sprites:x||`` **180**
___
5. Click the ``||sprites:y||`` **0** value:<br>
Change it to the expression<br>
``||math:pick random 13 to 108||``

```blocks
function Spawn_Opponents () {
    OpponentSpawner.setPosition(180, randint(13, 108))
}
let OpponentSpawner: Sprite = null
```

## {Step 7}
Creating the opponent racer
---
Now that the spawner has been placed outside of our view on the right hand side at some random height, 
we can create the opponent sprite.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Drag the <br>
``||variables:set projectile to||`` 
``||sprites:projectile from||`` ``||variables:mySprite||``
``||sprites:with vx 50 vy 50||``<br>
block into the bottom of the<br>
``||functions:Spawn_Opponents||`` function block.
___
3. Click the ``||variables:projectile||`` dropdown.<br>
► Click ``||variables:New variable...||``<br>
► Change the name to ``||variables:OpponentRacer||``
___
4. Click the grey box after ``||sprites:projectile||``<br>
► Click the **Gallery** tab<br>
► Click the racecar image named **opponent-blue**<br>
► Click ``||loops:Done||``<br><br>
Note: The name of a gallery asset can be determined by hovering the mouse over the asset for approximately 2 seconds.
___
5. Click the ``||variables:mySprite||`` dropdown.<br>
Change the name to ``||variables:OpponentSpawner||``
___
6. Click the ``||sprites:vx||`` **50** value:<br>
Change it to the expression:<br>
``||variables:drsFactor||``<br>
``||math:x||``<br>
``||math:pick random -25 to -75||``
___
7. Click the ``||sprites:vy||`` **50** value:<br>
Change it to **0**
___
We use a random value for opponent speed to make 
opponent dodging more complexand to 
allow opponents to collide into one another.
This value scales with ``||variables:drsFactor||``
which means that the higher the players speed boost,
the faster the oncoming opponents.

```blocks
function Spawn_Opponents () {
    OpponentSpawner.setPosition(180, randint(13, 108))
    OpponentRacer = sprites.createProjectileFromSprite(assets.image`opponent-blue`, OpponentSpawner, drsFactor * randint(-25, -75), 0)
}
let OpponentSpawner: Sprite = null
```

## {Step 8}
Player to Enemy Hit Detection
---
There is currently no hit detection between our player racer and the opponent racers.<br>
This means that we will phase straight through enemies without crashing.<br>
Lets fix that.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:on||`` ``||variables:sprite||``
``||sprites:of Player overlaps||`` ``||variables:otherSprite||``
``||sprites:of kind Player||`` block.<br>
► Drag it into the workspace.
___
3. Click the second ``||sprites:Player||`` dropdown.<br>
Select ``||sprites:Projectile||`` from the list.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
})
```

## {Step 9}
Destroy the sprites on Crash
---
After the sprites collide we want to destroy both.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:destroy||`` ``||variables:mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 8.<br>
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
► Click ``||variables:New variable...||``<br>
► Change the name to ``||variables:sprite||``
___
4. Click the ``||sprites:+||`` icon.<br>
► Select the fire effect.
___
5. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 8.<br>
___
6. Click the ``||variables:mySprite||`` dropdown.<br>
► Click ``||variables:New variable...||``<br>
► Change the name to ``||variables:otherSprite||``
___
7. Click the ``||sprites:+||`` icon.<br>
► Select the fire effect.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
})
```

## {Step 10}
Update Race stage then Pause
---
1. Click the ``||variables:Variables||`` category.
___
2. Grab the <br>``||variables: set raceStage to 0||`` block.<br>
 ► Drag it into the bottom of the<br>
 ``||sprite collision||`` block made in step 8.<br>
 ► Change the **0** to **4**
___
3. Click the ``||loops:Loops||`` category.
___
4. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
 ► Drag it into the bottom of the<br>
 ``||sprite collision||`` block made in step 8.<br>
 ► Change the **100 ms** to **1000 ms**

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(myRacer, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    raceStage = 4
    pause(1000)
})
```

## {Step 11}
Display Game Over
---
1. Create the following statements:<br>
► ``||game:use message "YOU CRASHED!" for <LOSE>||``<br><br>
► ``||game:game over <LOSE>||``<br><br>
___
2. Drag them into the bottom of the<br>
 ``||sprite collision||`` block made in step 8.<br>

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(myRacer, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    raceStage = 4
    pause(1000)
    game.setGameOverMessage(false, "YOU CRASHED!")
    game.gameOver(false)
})
```

## {Step 12}
Enemy to Enemy Hit Detection
---
There is currently no hit detection when 2 opponents collide.<br>
This means that opponents will phase straight through one another without crashing.<br>
Lets fix that.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:on||`` ``||variables:sprite||``
``||sprites:of Player overlaps||`` ``||variables:otherSprite||``
``||sprites:of kind Player||`` block.<br>
► Drag it into the workspace.
___
3. Click the first ``||sprites:Player||`` dropdown.<br>
Select ``||variables:Projectile||`` from the list.
___
4. Click the second ``||sprites:Player||`` dropdown.<br>
Select ``||sprites:Projectile||`` from the list.

```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
})
```

## {Step 13}
Destroy the sprites on Crash
---
After the sprites collide we want to destroy both.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 12.<br>
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
► Change the name to ``||variables:sprite||``
___
4. Click the ``||sprites:+||`` icon.<br>
► Select the fire effect.
___
5. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 12.<br>
___
6. Click the ``||variables:mySprite||`` dropdown.<br>
► Change the name to ``||variables:otherSprite||``
___
7. Click the ``||sprites:+||`` icon.<br>
► Select the fire effect.

```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
})
```