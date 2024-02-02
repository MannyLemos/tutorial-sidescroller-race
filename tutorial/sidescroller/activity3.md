# Let the Games Begin

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
let DrsOverlay: TextSprite = null
let RemainingDistanceOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
let ElapsedTimeOverlay: TextSprite = null
let myRacer: Sprite = null
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
raceStage = 2
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
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Variables()
        Update_Overlays()
    }
})

```

## {Step 1}
on game update block
---
The ``||game:on game update||`` block attempts to run one time every fixed interval.<br>
We will use this block to update game parameters and text overlays.<br>
Lets start by setting up the block itself.
___
1. Click the ``||game:Game||`` category.
___
2. Grab the <br>
``||game:on game update every 500 ms||`` block.<br>
► Drag it into the workspace.
___
3. Click the **500** inside<br>
``||game:on game update every 500 ms||``<br>
► Change it to **25**.
___
**IMPORTANT NOTE**<br>
If the game is performing very poorly (low frame rate, jittery)<br>
Increase this value to **100** or greater.

```blocks
game.onUpdateInterval(25, function () {
})
```

## {Step 2}
When to run
---
We only want game parameters to update when the race is underway.<br>
Conveniently we have a parameter ``||raceStage||`` which keeps track of this.<br>
___
1. 
Create an if block with the condition:<br>
``||logic:if||`` ``||variables:raceStage||`` ``||logic:= 2 then||``<br>
___
2. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||game:on game update every 25 ms||`` block.

```blocks
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
    }
})
```

## {Step 3}
Create and Call Update Variables Function
---
In activity 1, we set about a number of variables.
Recall that variables are expected to change during the race.
``||functions:Update_Variables||`` performs some of these updates.<br>
Lets set it up!
___
1. Create a new Function ``||functions:Update_Variables||``
___
2. Call the ``||functions:Update_Variables||`` function from inside the ``||logic:if||`` block we set up in the previous step.
___
This structure means that<br>
``||functions:Update_Variables||`` will be run every<br>
25ms when ``||variables:raceStage||`` ``||logic:= 2||``

```blocks
function Update_Variables () {
}
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Variables()
    }
})
```

## {Step 4}
Update Progression Velocity
---
``||variables:progressionVelocity||`` scales relative to
``||variables:drsFactor||`` and ``||variables:myRacer x||``<br>
► The higher the ``||variables:drsFactor||``, 
the faster the ``||variables:progressionVelocity||``<br>
► The further to the right the racer is, 
the faster the ``||variables:progressionVelocity||``<br>
___
1. Create the statement:<br>
``||variables:set progressionVelocity to 0||``
___
2. Replace the **0** with the expression in the hint.<br><br>
Note: ``||sprites:mySprite.x||`` can be found in the ``||sprites:Sprites||`` category
___
3. Insert the statement into the ``||functions:Update_Variables||`` function block.

```blocks
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
}
let myRacer: Sprite = null
```

## {Step 5}
Scroll the Background
---
In this step we will scroll our track background at half the 
speed of progression velocity.<br><br>
Note: We use half the speed to make the game run smoother.
___
1. Click the ``||scroller:Scroller||`` category.
___
2. Grab the <br>
``||scroller:scroll background with vx -50 vy -50 +||`` block.<br>
► Drag it into the bottom of the ``||functions:Update_Variables||`` function block.
___
3. Change the ``||scroller:vx||`` from **-50** to:<br><br>
``||variables:progressionVelocity||``<br>
``||math:x||`` **-0.5**
___
4. Change the ``||scroller:vy||`` from **-50** to **0**.

```blocks
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
    scroller.scrollBackgroundWithSpeed(progressionVelocity * -0.5, 0)
}
let myRacer: Sprite = null
```

## {Step 6}
Update Distance Remaining
---
``||variables:distanceRemaining||`` indicates how many metres are left before the race is over.
___
1. Create the statement:<br>
``||variables:set distanceRemaining to 0||``
___
2. Replace the **0** with the expression in the hint.<br>

```blocks
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
    scroller.scrollBackgroundWithSpeed(progressionVelocity * -0.5, 0)
    distanceRemaining = Math.max(0, distanceRemaining - progressionVelocity * ((game.runtime() - loopStartTime) / 1000))
}
let myRacer: Sprite = null
```

## {Step 7}
Update Loop Start Time
---
``||variables:loopStartTime||`` is an internal parameter used to calulate how 
much time has passed between consecutive ``||functions:Update_Variables||`` calls.
___
1. Create the statement:<br>
``||variables:set loopStartTime to 0||``
___
2. Replace the **0** with<br>
``||game: time since start (ms)||``

```blocks
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
    scroller.scrollBackgroundWithSpeed(progressionVelocity * -0.5, 0)
    distanceRemaining = Math.max(0, distanceRemaining - progressionVelocity * ((game.runtime() - loopStartTime) / 1000))
    loopStartTime = game.runtime()
}
let myRacer: Sprite = null
```

## {Step 8}
Update Time Since Race Start
---
``||variables:timeSinceRaceStart||`` tracks the amount of time that has elapsed since the countdown finished.
___
1. Create the statement:<br>
``||variables:set timeSinceRaceStart to 0||``
___
2. Replace the **0** with<br>
``||game: time since start (ms)||``<br>
``||math:-||`` ``||variables:raceStartTime||``

```blocks
function Update_Variables () {
    progressionVelocity = drsFactor * Math.constrain(myRacer.x, 0, 120)
    scroller.scrollBackgroundWithSpeed(progressionVelocity * -0.5, 0)
    distanceRemaining = Math.max(0, distanceRemaining - progressionVelocity * ((game.runtime() - loopStartTime) / 1000))
    loopStartTime = game.runtime()
    timeSinceRaceStart = game.runtime() - raceStartTime
}
let myRacer: Sprite = null
```

## {Step 9}
Create and Call Update Overlays Function
---
In activity 2, we created several ``||textsprite:text sprite||`` overlays.<br>
These overlays need to be updated so that things like velocity and distance are accurate.
___
1. Create a new Function ``||functions:Update_Overlays||``
___
2. Call the ``||functions:Update_Overlays||`` function from inside the<br>
``||game:on game update every 25 ms||`` block,
directly below the<br>
``||functions:call Update_Variables||`` function block.
___
This structure means that<br>
``||functions:Update_Overlays||`` will be run every<br>
25ms when ``||variables:raceStage||`` ``||logic:= 2||``

```blocks
// @hide
function Update_Variables () {
}
function Update_Overlays () {
}
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Variables()
        Update_Overlays()
    }
})
```

## {Step 10}
Update Elapsed Time Overlay
---
``||variables:ElapsedTimeOverlay||`` stores the time that passed since the race has begun.
___
1. Click the ``||textsprite:Text Sprite||`` category.
___
2. Grab the <br>
``||textsprite:set||`` ``||variables:textSprite||`` ``||textsprite:text ""||`` block.<br>
► Drag it into the ``||functions:Update_Overlays||`` function.
___
3. Click the ``||variables:textSprite||``<br>
► Change it to ``||variables:ElapsedTimeOverlay||``
___
4. Click the ``||text:Text||`` category under advanced.<br>
► Drag the<br>
``||text:join "Hello" "World" - +||``<br>
block into the ``||textsprite:" "||`` of the ``||textsprite:Text Sprite||`` block we created in the previous step.
___
5. Change the **"Hello"** to:<br>
``||variables:timeSinceRaceStart||``<br>
``||math:/||`` **1000**
___
6. Change the **"World"** to **s**<br>
to represent seconds
___
We divide ``||variables:ElapsedTimeOverlay||`` 
by 1000 to convert milliseconds to seconds.

```blocks
function Update_Overlays () {
    ElapsedTimeOverlay.setText("" + timeSinceRaceStart / 1000 + "s")
}
let ElapsedTimeOverlay: TextSprite = null
```

## {Step 11}
Update Velocity Overlay
---
``||variables:VelocityOverlay||`` stores the time that passed since the race has begun.
___
1. Click the ``||textsprite:Text Sprite||`` category.
___
2. Grab the <br>
``||textsprite:set textSprite text ""||`` block.<br>
► Drag it into the ``||functions:Update_Overlays||`` function.
___
3. Click the ``||variables:textSprite||``<br>
► Change it to ``||variables:VelocityOverlay||``
___
4. Click the ``||text:Text||`` category under advanced.<br>
► Drag the<br>
``||text:join "Hello" "World" - +||``<br>
block into the ``||textsprite:" "||`` of the ``||textsprite:Text Sprite||`` block we created in the previous step.
___
5. Change the **"Hello"** to:<br><br>
``||variables:progressionVelocity||``<br>
``||math:integer x||`` **3.6**<br><br>
Note: ``||math:integer x||``<br>
is achieved by manipulating the<br>
``||math:square root x||`` block.
___
6. Change the **"World"** to **kph**<br>
to represent kilometers per hour
___
We integer multiply ``||variables:progressionVelocity||`` 
by 3.6 to convert m/s to kph, and to truncate any decimal digits.<br>
e.g. 1.811 m/s becomes 7 kph

```blocks
function Update_Overlays () {
    ElapsedTimeOverlay.setText("" + (timeSinceRaceStart / 1000) + "s")
    VelocityOverlay.setText("" + Math.imul(progressionVelocity, 3.6) + "kph")
}
let ElapsedTimeOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
```

## {Step 12}
Update Remaining Distance Overlay
---
``||variables:RemainingDistanceOverlay||`` stores the time that passed since the race has begun.
___
1. Click the ``||textsprite:Text Sprite||`` category.
___
2. Grab the <br>
``||textsprite:set textSprite text ""||`` block.<br>
► Drag it into the ``||functions:Update_Overlays||`` function.
___
3. Click the ``||variables:textSprite||``<br>
► Change it to ``||variables:RemainingDistanceOverlay||``
___
4. Click the ``||text:Text||`` category under advanced.<br>
► Drag the<br>
``||text:join "Hello" "World" - +||``<br>
block into the ``||textsprite:" "||`` of the ``||textsprite:Text Sprite||`` block we created in the previous step.
___
5. Change the **"Hello"** to:<br>
``||variables:distanceRemaining||``<br>
``||math:integer /||`` **1**<br><br>
Note: ``||math:integer /||``<br>
is achieved by manipulating the<br>
``||math:square root x||`` block.
___
6. Change the **"World"** to **m**<br>
to represent meters
___
We integer divide ``||variables:distanceRemaining||`` 
by 1 to truncate any decimal digits.<br>
e.g. 415.1125 becomes 415


```blocks
function Update_Overlays () {
    ElapsedTimeOverlay.setText("" + (timeSinceRaceStart / 1000) + "s")
    VelocityOverlay.setText("" + Math.imul(progressionVelocity, 3.6) + "kph")
    RemainingDistanceOverlay.setText("" + Math.idiv(distanceRemaining, 1) + "m")
}
let ElapsedTimeOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
let RemainingDistanceOverlay: TextSprite = null
```
