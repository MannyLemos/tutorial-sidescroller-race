# Speedy Finish

```template
namespace SpriteKind {
    export const Projectile_Spawner = SpriteKind.create()
    export const Finish_Line = SpriteKind.create()
}
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
    OpponentSpawner = sprites.create(img`
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    `, SpriteKind.Projectile_Spawner)
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
function Spawn_Opponents () {
    OpponentSpawner.setPosition(180, randint(13, 108))
    OpponentRacer = sprites.createProjectileFromSprite(img`
    0 0 0 0 c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c 0 0 b c c 0 0 0
    0 0 0 c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c f c b c f b d b b b 0 0
    0 0 0 c f c b c c 0 0 8 c c b b b b c c b b b b b b 0 0 0 0 0 c c c c b c 0 d b c b 0 0
    b d 1 1 c c c c b c c b b b c c c c c c c c b b b c b c c c 0 0 c c c b 0 0 d d b b 0 0
    0 1 d 1 b c c c c c b b c f f f f f c c c f c b c c b b 0 0 0 0 c c b 0 0 0 0 b d b b 0
    0 b 9 d b c c c b c c c c f c c c c 6 6 6 6 c b 6 c b b 0 0 0 0 b c b 0 0 0 0 0 d b b 0
    0 d d 1 b f c b b c c c c c b b b c c 6 6 6 b c 6 6 c b 6 8 8 b b b b b b 0 0 0 c d d c
    d d 6 d b f c c c 8 8 8 c c c b c 6 c c 6 c f c c 6 6 6 6 6 6 9 9 b 6 d b c b b b b b b
    d d 8 b b f c 8 8 8 8 8 8 c c b 6 6 c 6 6 f f f c 9 6 6 6 9 9 9 9 6 6 b b 6 6 b b b b c
    0 d d 1 b f c b b b c c c c b b b c c 6 6 6 b b 6 6 6 6 6 6 6 b b b b b b 0 0 0 b d d c
    0 d b d b c c c b c c f f c c c c c 6 6 6 6 6 6 6 6 b b 0 0 0 0 b c c d 0 0 0 0 d d b 0
    0 d 6 b b f c c b c b b c f f c c c c c c c c b b b b b 0 0 0 0 c c b 0 0 0 0 b d b b 0
    0 1 d d b c c c b c c b b b c c c c c c c c c c b b c c c c 0 0 c c c b 0 0 d d b b 0 0
    0 0 0 b c c b c c 0 0 c f c c c b b c c b d 3 b b b 0 0 0 0 0 c c c c b c 0 b b b b 0 0
    0 0 0 c c c b c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c b c f 3 d c b b 0 0
    0 0 0 0 c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c c c b b c c 0 0 0
    `, OpponentSpawner, drsFactor * randint(-25, -75), 0)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(myRacer, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    raceStage = 4
    pause(1000)
    game.setGameOverMessage(false, "YOU CRASHED!")
    game.gameOver(false)
})
let myRacer: Sprite = null
let OpponentRacer: Sprite = null
let OpponentSpawner: Sprite = null
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
forever(function () {
    if (raceStage == 2) {
        Spawn_Opponents()
    }
    pause(randint(1500, 3000))
})
```

```ghost
namespace SpriteKind {
    export const Projectile_Spawner = SpriteKind.create()
    export const Finish_Line = SpriteKind.create()
}
function Enable_DRS () {
    drsState = 1
    DrsOverlay.setText("DRS")
    myRacer.setImage(assets.image`pink-player-drs`)
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (raceStage > 1) {
        Disable_DRS()
    }
})
function Disable_DRS () {
    drsState = 0
    DrsOverlay.setText("")
    myRacer.setImage(assets.image`player-pink`)
}
function Update_DRS_Factor () {
    if (drsState == 0) {
        drsFactor = Math.constrain(drsFactor - 0.005, 1, 1.3)
    } else {
        drsFactor = Math.constrain(drsFactor + 0.005, 1, 1.3)
    }
}
function Run_Finishing_Sequence () {
    finish.SetFinishBackground()
    FinishLine = sprites.create(assets.image`finish-sprite`, SpriteKind.Finish_Line)
    FinishLine.setPosition(330, 60)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    FinishLine.setVelocity(-50, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Finish_Line, function (sprite, otherSprite) {
    info.setScore(timeSinceRaceStart)
    game.setGameOverScoringType(game.ScoringType.LowScore)
    game.gameOver(true)
})
let FinishLine: Sprite = null
FinishLine.setVelocity(-50, 0)
```

## {Step 1}
Speed Boost Button Press
---
The speed boost button will be bound to A.<br>
First we need to detect when A is pressed down.
___
1. Click the ``||controller:Controller||`` category.
___
2. Grab the <br>
``||controller:on [ A ] button [ pressed ]||`` block.<br>
► Drag it into workspace.
___
3. Create an if block with the condition:<br>
``||logic:if||`` ``||variables:raceStage||`` ``||logic:> 1 then||``<br>
___
4. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||controller:on [ A ] button [ pressed ]||`` block.
___
5. Create a new Function ``||functions:Enable_DRS||``
___
6. Call the<br>
``||functions:Enable_DRS||``<br>
function from inside the ``||logic:if||`` block we set up in parts 3 - 4.

```blocks
function Enable_DRS () {}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (raceStage > 1) {
        Enable_DRS()
    }
})
```

## {Step 2}
Enabling DRS
---
To show that speed boosting is occuring we need to add the following to the<br>
``||function:Enable_DRS||`` function.
___
1. Using the ``||variables:Variables||`` category,<br>
Set ``||variables:drsState||`` to **1**
___
2. Using the ``||textsprite:Text Sprite||`` category,<br>
Set ``||variables:DrsOverlay||`` to ``||textsprite:text||`` "**DRS**"
___
3. Using the ``||sprites:Sprites||`` category,
Change the image of ``||variables:myRacer||`` to
**pink-player-drs** in the **Gallery** tab.

```blocks
function Enable_DRS () {
    drsState = 1
    DrsOverlay.setText("DRS")
    myRacer.setImage(assets.image`pink-player-drs`)
}
let DrsOverlay: TextSprite = null
let myRacer: Sprite = null
```

## {Step 3}
Speed Boost Button Released
---
Now that the downpress has been taken care of, 
we need to handle what happens when the A button is released.
___
1. Click the ``||controller:Controller||`` category.
___
2. Grab the <br>
``||controller:on [ A ] button [ pressed ]||`` block.<br>
► Drag it into workspace.<br>
► Change **pressed** to **released**
___
3. Create an if block with the condition:<br>
``||logic:if||`` ``||variables:raceStage||`` ``||logic:> 1 then||``<br>
___
4. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||controller:on [ A ] button [ pressed ]||`` block.
___
5. Create a new Function ``||functions:Disable_DRS||``
___
6. Call the<br>
``||functions:Disable_DRS||``<br>
function from inside the ``||logic:if||`` block we set up in parts 3 - 4.

```blocks
function Disable_DRS () {}
controller.A.onEvent(ControllerButtonEvent., function () {
    if (raceStage > 1) {
        Disable_DRS()
    }
})
```

## {Step 4}
Disabling DRS
---
To show that speed boosting is no longer occuring we need to add the following to the<br>
``||function:Disable_DRS||`` function.
___
1. Using the ``||variables:Variables||`` category,<br>
Set ``||variables:drsState||`` to **0**
___
2. Using the ``||textsprite:Text Sprite||`` category,<br>
Set ``||variables:DrsOverlay||`` to **""**
___
3. Using the ``||sprites:Sprites||`` category,<br>
Set ``||variables:myRacer||`` image to <br>
**pink-player** in the **gallery**

```blocks
function Disable_DRS () {
    drsState = 0
    DrsOverlay.setText("")
    myRacer.setImage(assets.image`player-pink`)
} 
let DrsOverlay: TextSprite = null
let myRacer: Sprite = null
```

## {Step 5}
Creating the Update DRS Factor Function
---
At some fixed interval, we want to update the drag reduction factor.<br>
This will then, in turn, update the ``||variables:progressionVelocity||`` thanks to our formula in ``||functions:Update_Variables||``<br>
In order to do this, we can use the<br>
``||game:on game update every 25 ms||``<br>
we set up in activity 3
___
1. Create a new Function ``||functions:Update_DRS_Factor||``
___
2. Call the<br>
``||functions:Update_DRS_Factor||``<br>
function from inside the top of the<br>
``||logic:if raceStage = 2||`` block located inside the<br>
``||game:on game update every 25 ms||`` block.

```blocks
// @hide
function Update_Variables () {}
// @hide
function Update_Overlays () {}
function Update_DRS_Factor () {}
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_DRS_Factor()
        Update_Variables()
        Update_Overlays()
    }
})
```

## {Step 6}
Altering the DRS Factor
---
1. Create an if **else** block with the condition:<br>
``||logic:if||`` ``||variables:drsState||`` ``||logic:= 0 then||`` ``||logic:else||``<br>
___
2. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||functions:Update_DRS_Factor||`` function.
___
3. Within the ``||logic:if||`` block write the following assignment:
``||variables:set drsFactor to||``<br>
``||math:constrain||``<br>
``||variables:drsFactor||`` ``||math:- 0.005||``<br>
``||math:between 1 and 1.3||``<br>
___
4. Within the ``||logic:else||`` block write the following assigment:
``||variables:set drsFactor to||``<br>
``||math:constrain||``<br>
``||variables:drsFactor||`` ``||math:+ 0.005||``<br>
``||math:between 1 and 1.3||``<br> 
___
Try playing the game. If you hold A (spacebar) during the race, 
you should notice the red DRS overlay your speed slowly increasing to a peak.

```blocks
function Update_DRS_Factor () {
    if (drsState == 0) {
        drsFactor = Math.constrain(drsFactor - 0.005, 1, 1.3)
    } else {
        drsFactor = Math.constrain(drsFactor + 0.005, 1, 1.3)
    }
}
```

## {Step 7}
Setting up game Winning
---
When the distance remaining drops below **0**, we want to display a finish line to players and mark the game as over.
To do this we will first need to build up the logic to determine this state and then call a function.
___
1. Create an if block with the condition:<br>
``||logic:if||`` ``||variables:distanceRemaining||`` ``||logic:= 0 then||``<br>
___
2. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||game:on game update||`` block inside the if block.
___
3. Within this new ``||logic:if||`` block<br>
add the statement:<br>
``||variables:set raceStage to||`` **3**<br>
___
4. Create a new Function ``||functions:Run_Finishing_Sequence||``
___
5. Call the<br>
``||functions:Run_Finishing_Sequence||``<br>
function from inside the bottom of this new ``||logic:if||`` block.

```blocks
// @hide 
function Update_DRS_Factor () {}
// @hide 
function Update_Race_Parameters () {}
// @hide 
function Update_Text_Overlays () {}
function Run_Finishing_Sequence () {}
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_DRS_Factor()
        Update_Race_Parameters()
        Update_Text_Overlays()
        if (distanceRemaining <= 0) {
            raceStage = 3
            Run_Finishing_Sequence()
        }
    }
})
```

## {Step 8}
Setting up Run Finishing Sequence
---
1. Click the ``||finish:Finish||`` category.
___
2. Drag the <br>``||finish:set finish background||``<br>
block into the<br>
``||functions:Run_Finishing_Sequence||`` function block.
___
3. Click the ``||sprites:Sprites||`` category.
___
4. Drag the <br>
``||variables: set mySprite to||`` ``||sprites:sprite [ ] of kind Player||``<br>
block into the bottom of the<br>
``||functions:Run_Finishing_Sequence||`` function block.<br>
► Change the sprite **name** to ``||variables:FinishLine||``<br>
► Change the sprite **kind** to ``||sprites:Finish_Line||``<br><br>
Note: you will need to create a new kind.
___
5. Using the ``||sprites:Sprites||`` category,<br>
set the poition of the ``||variables:FinishLine||`` sprite to:<br>
``||sprites:x||`` **330**<br>
``||sprites:y||`` **60**<br><br>
Note: this will place the finish line far off the right of the screen.
___
6. Using the ``||scroller:Scroller||`` category,<br>
scroll the background with:<br>
``||scroller:vx||`` **-50**<br>
``||scroller:vy||`` **0**<br>
___
7. Using the ``||sprites:Sprites||`` category,<br>
set the velocity of the ``||variables:FinishLine||`` sprite to:<br>
``||sprites:vx||`` **-50**<br>
``||sprites:vy||`` **0**<br>
___
The idea here is that the finish line sprite is travelling towards the player at the same speed the background is scrolling.
By setting the position of the finish line sprite far off screen to the right, 
the player should hit the finish line sprite just after they have passed the finish line pixel art.

```blocks
function Run_Finishing_Sequence () {
    finish.SetFinishBackground()
    FinishLine = sprites.create(assets.image`finish-sprite`, Finish_Line)
    FinishLine.setPosition(330, 60)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    FinishLine.setVelocity(-50, 0)
}
let FinishLine: Sprite = null
```

## {Step 9}
Player Overlaps Finish Line
---
Now that our player will collide with a finish line sprite, we can use this event to trigger a game over sequence.
First we need to detect the collision.
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
Select ``||variables:Finish_Line||`` from the list.

```blocks
sprites.onOverlap(SpriteKind.Player, Finish_Line, function (sprite, otherSprite) {
})
```

## {Step 10}
Final Touches
---
When a player wins, the player to finish line collision block will be the final piece of code that runs.
Lets set a score equivalent to the time since race start,<br>
Use low score as best score (since we want faster times to win),<br>
and then end the game as a win.
___
1. Using the ``||info:Info||`` category,<br>
set the score to ``||variables:timeSinceRaceStart||``
___
2. Using the ``||game:Game||`` category,<br>
create the<br>
``||game:use low score as best score||`` block.
___
3. Using the ``||game:Game||`` category,<br>
create the<br>
``||game:use message "YOU WIN" for WIN||`` block.
___
4. Using the ``||game:Game||`` category,<br>
get the<br>
``||game:game over WIN||`` block.

```blocks
sprites.onOverlap(SpriteKind.Player, Finish_Line, function (sprite, otherSprite) {
    info.setScore(timeSinceRaceStart)
    game.setGameOverScoringType(game.ScoringType.LowScore)
    game.setGameOverMessage(true, "YOU WIN!")
    game.gameOver(true)
})
```

## {Step 11}
CONGRATULATIONS!
---
You have completed the race into stem make code arcade racing tutorial.
