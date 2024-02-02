# The Final Countdown

```template
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
let myRacer: Sprite = null
Initialize_Variables()
Initialize_Objects()

```

```ghost
function Initialize_Variables () {
    raceStage = 0
    drsFactor = 1
    distanceRemaining = 1500
    racerLaunched = 0
    dragReduction = 0
    nextOpponentSpawnTime = 0
}
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("0", 0, 1)
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
function Initialize_Objects () {
    OpponentSpawner = sprites.create(assets.image`temp1`, SpriteKind.Projectile_Spawner)
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    scaling.scaleByPercent(myRacer, -85, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    controller.moveSprite(myRacer, 75, 75)
}
function Update_Text_Overlays () {
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
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
raceStage = 2
```

## {Step 1}
Creating the Race Countdown Function
---
Lets create a function named Race_Countdown. It will be used to store the countdown animation that play before our race begins.
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Click ``||arrays:Make a Function...||``
___
4. Delete the default ``||functions:doSomething||``  function name.<br>
Type ``||functions:Race_Countdown||`` in that space.
___
5. Click ``||loops:Done ✓||``
___
The ``||functions:Race_Countdown||`` function block should automatically drop into your workspace.

```blocks
function Race_Countdown () {
}
```

## {Step 2}
Calling the Race Countdown Function
---
Lets call ``||functions:call Race_Countdown||`` before ``||functions:call Initalize_Objects||``<br>
We do this so that our racecar is not visible during the countdown animation.
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Drag the <br>``||functions:call Race_Countdown||``<br>
block in between<br> 
``||functions:call Initialize_Variables||``<br>
and<br>
``||functions:call Initialize_Objects||``<br>
in the<br>
``||loops:on start||`` block.<br><br>

```blocks
// @hide
function Initialize_Variables () {
}
function Race_Countdown () {
}
// @hide
function Initialize_Objects () {
}
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
```

## {Step 3}
Race Countdown Frame 1
---
Our race countdown will consist of 5 lights turning on sequentially accompanied by a *BEEP* tone.<br>
All 5 lights will then be turned off and the race  will start after players *Launch* their cars.
___ 
1. Click the ``||countdown:Countdown||`` category.
___
2. Grab the <br>
``||countdown:set countdown image1||`` block.<br>
► Drag it into the<br>
``||functions:Race_Countdown||`` function block.
___
3. Click the ``||loops:Loops||`` category.
___
4. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the **100** inside ``||loops:pause 100 ms||`` block.<br>
► Change it to **500**.

```blocks
function Race_Countdown () {
    countdown.SetCountdownImage1()
    pause(500)
}
```

## {Step 4}
Race Countdown Frame 2
---
The second frame shows 1 light turned on.
___
1. Click the ``||countdown:Countdown||`` category.
___
2. Grab the <br>
``||countdown:set countdown image2||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
3. Click the ``||countdown:Countdown||`` category.
___
4. Grab the <br>
``||countdown:play countdown tone||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the ``||loops:Loops||`` category.
___
6. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
7. Click the **100** inside ``||loops:pause 100 ms||`` block.<br>
► Change it to **500**.

```blocks
function Race_Countdown () {
    countdown.SetCountdownImage1()
    pause(500)
    countdown.SetCountdownImage2()
    countdown.PlayCountdownTone()
    pause(500)
}
```

## {Step 5}
Race Countdown Frame 3
---
The third frame shows 2 lights turned on.
___
1. Click the ``||countdown:Countdown||`` category.
___
2. Grab the <br>
``||countdown:set countdown image3||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
3. Click the ``||countdown:Countdown||`` category.
___
4. Grab the <br>
``||countdown:play countdown tone||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the ``||loops:Loops||`` category.
___
6. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
7. Click the **100** inside ``||loops:pause 100 ms||`` block.<br>
► Change it to **500**.

```blocks
function Race_Countdown () {
    countdown.SetCountdownImage1()
    pause(500)
    countdown.SetCountdownImage2()
    countdown.PlayCountdownTone()
    pause(500)
    countdown.SetCountdownImage3()
    countdown.PlayCountdownTone()
    pause(500)
}
```

## {Step 6}
Race Countdown Frame 4
---
The fourth frame shows 3 lights turned on.
___
1. Click the ``||countdown:Countdown||`` category.
___
2. Grab the <br>
``||countdown:set countdown image4||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
3. Click the ``||countdown:Countdown||`` category.
___
4. Grab the <br>
``||countdown:play countdown tone||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the ``||loops:Loops||`` category.
___
6. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
7. Click the **100** inside ``||loops:pause 100 ms||`` block.<br>
► Change it to **500**.

```blocks
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
}
```

## {Step 7}
Race Countdown Frame 5
---
The fifth frame shows 4 lights turned on.
___
1. Click the ``||countdown:Countdown||`` category.
___
2. Grab the <br>
``||countdown:set countdown image5||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
3. Click the ``||countdown:Countdown||`` category.
___
4. Grab the <br>
``||countdown:play countdown tone||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the ``||loops:Loops||`` category.
___
6. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
7. Click the **100** inside ``||loops:pause 100 ms||`` block.<br>
► Change it to **500**.

```blocks
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
}
```

## {Step 8}
Race Countdown Frame 6
---
The sixth frame shows 5 lights turned on.<br><br>
Note: In this stage we wait a random amount of time between 200ms and 1500ms after the 5 lights are turned on. 
This is to prevent racers from tying to press the launch button based on timing alone.
___
1. Click the ``||countdown:Countdown||`` category.
___
2. Grab the <br>
``||countdown:set countdown image6||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
3. Click the ``||countdown:Countdown||`` category.
___
4. Grab the <br>
``||countdown:play countdown tone||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the ``||loops:Loops||`` category.
___
6. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
7. Click the ``||math:Math||`` category.
___
8. Grab the<br>
``||math:pick random 0 to 10||``<br>
► Drag it into the<br>
``||loops:pause 100 ms||`` slot.
___
9. Click the **10** inside<br>
``||math:pick random 0 to 10||``<br>
► Change it to **1500**.
___
10. Click the **0** inside<br>
``||math:pick random 0 to 1500||``<br>
► Change it to **200**.

```blocks
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
}
```

## {Step 9}
Race Countdown Frame 7
---
The seventh frame shows 0 lights turned on and a prompt for users to **Press B**.<br>
This frame is **IMPORTANT**<br>
It marks the very instant that the race begins.<br>
Pay attention to ``||variables:raceStage||`` being set and how we await ``||variables:racerLaunched = 1||``<br>
___
1. Click the ``||variables:Variables||`` category.
___
2. Grab the <br>``||variables: set <variable> to 0||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.<br>
► Change the variable and assignment to<br>
``||variables:set raceStage to 1||``
___
3. Click the ``||countdown:Countdown||`` category.
___
4. Grab the <br>
``||countdown:set countdown image7||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
5. Click the ``||countdown:Countdown||`` category.
___
6. Grab the <br>
``||countdown:play start tone||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.
___
7. Click the ``||variables:Variables||`` category.
___
8. Grab the <br>``||variables: set <variable> to 0||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.<br>
► Change the variable to **New variable...** ``||variables:raceStartTime||``<br>
► Using the ``||game:Game||`` category,<br>
Change the assignment to ``||game:time since start (ms)||``<br>
___
9. Click the ``||loops:Loops||`` category.
___
8. Grab the <br>``||loops:pause until <true>||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.<br>
► Change the ``||logic:true||`` to:<br>
``||variables:racerLaunched||`` ``||logic:= 1||``<br>
using:<br>
``||logic:Logic||`` → ``||logic:0 = 0||``<br>
and<br>
``||variables:Variables||`` → ``||variables:racerLaunched||``<br>
___
The full countdown animation should be playing out in the game window and freezing on the **Press B** frame.

```blocks
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
```

## {Step 10}
Launch Trigger
---
Lets create a method that will trigger when the user **Presses B**. This will be used to launch the racer and start the race.
___
1. Click the ``||controller:Controller||`` category.
___
2. Grab the <br>
``||controller:on [ A ] button [ pressed ]||`` block.<br>
► Drag it into workspace.
___
3. Change the letter ``||controller:A||`` to ``||controller:B||``

```blocks
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
})
```

## {Step 11}
Launch or Lose
---
When ``||variables:raceStage = 0||`` the racer should not launch because the countdown has not completed.<br>
When ``||variables:raceStage = 1||`` the racer should launch because the countdown has completed.<br>
___
1. Click the ``||logic:Logic||`` category.
___
2. Grab the <br>
``||logic:if <true> then else||`` block.<br>
► Drag it into the<br>
``||controller:on B button pressed||`` block.
___
3. Using<br>
``||logic:Logic||`` → ``||logic:0 = 0||``<br>
and<br>
``||variables:Variables||`` → ``||variables:raceStage||``<br><br>
Create the following logic: <br>
``||logic:if||`` ``||variables:raceStage||`` ``||logic:= 1 then||``
___
4. Inside this if statement create the assignments:<br>
► ``||variables:set racerLaunched to 1||``<br>
► ``||variables:set loopStartTime to||`` ``||game:time since start (ms)||``<br><br>
Note:<br>
► ``||variables:loopStartTime||`` is a new variable.<br>
► ``||game:time since start (ms)||``<br>
can be found in ``||game:Game||`` category.<br>
___
5. Click the ``||logic:+||`` at the bottom of the ``||logic:if else||`` block.<br>
<br>
The ``||logic:else||`` should turn into:<br>
``||logic:else if <true> then||``
___
6. Using the <br>
``||logic:Logic||`` → ``||logic:0 = 0||``<br>
and<br>
``||variables:Variables||`` → ``||variables:raceStage||``<br>
Create the following: <br>
``||logic:else if||`` ``||variables:raceStage||`` ``||logic:= 0 then||``
___
7. Inside this ``||logic:else if||`` statement create the assignments:<br>
► ``||variables:set raceStage = 3||``<br><br>
► ``||game:use message "FALSE START" for <LOSE>||``<br><br>
► ``||game:game over <LOSE>||``<br><br>
Note: <br>
``||game:use message "FALSE START" for <LOSE>||``<br>
and<br>
``||game:game over <LOSE>||``<br>
are both customized blocks from the ``||game:Game||`` category.
___
If users **Press B** before the countdown finished they lose due to false start.<br>
If users **Press B** after the countdown The race starts.<br>

```blocks
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
```

## {Step 12}
Creating the Initialize Overlays Function
---
Lets create a function named Initialize_Overlays.<br>
Text overlays will be used to display gametime metrics.
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Click ``||arrays:Make a Function...||``
___
4. Delete the default ``||functions:doSomething||``  function name.<br>
Type ``||functions:Initialize_Overlays||`` in that space.
___
5. Click ``||loops:Done ✓||``
___
The ``||functions:Initialize_Overlays||`` function block should automatically drop into your workspace.

```blocks
function Initialize_Overlays () {
}
```

## {Step 13}
Calling Initialize Overlays Function
---
Lets ``||functions:call Initialize_Overlays||`` at the end of our ``||loops:on start||`` block..
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Grab the <br>``||functions:call Initialize_Overlays||``<br>
► Drag it into the bottom of the<br>
``||loops:on start||`` function block.<br>

```blocks
// @hide
function Initialize_Variables () {
}
//@hide
function Race_Countdown () {
}
// @hide
function Initialize_Objects () {
}
function Initialize_Overlays () {
}
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
```

## {Step 14}
Creating the Elapsed Time Overlay
---
Lets create ``||variables:ElapsedTimeOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will display the time that has passed since the race countdown finished.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||variables:set textSprite to||`` ``||textsprite:text sprite "" +||`` block.<br>
► Drag it into the ``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:ElapsedTimeOverlay||``<br><br>
Note: This is a new variable.
___
4. Click the ``||sprites:Sprites||`` category.
___
5. Grab the <br>
``||sprites:set||`` ``||variables:mySprite||`` ``||sprites:position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Set **x** = **0**<br>
► Set **y** = **8**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:ElapsedTimeOverlay||``

```blocks
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
}
let ElapsedTimeOverlay: TextSprite = null
```

## {Step 15}
Creating the Velocity Overlay
---
Lets create ``||variables:VelocityOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will display the current racecar velocity.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||variables:set textSprite to||`` ``||textsprite:text sprite "" +||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:VelocityOverlay||``
___
4. Click the ``||sprites:Sprites||`` category.
___
5. Grab the <br>
``||sprites:set||`` ``||variables:mySprite||`` ``||sprites:position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Set **x** = **125**<br>
► Set **y** = **8**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:VelocityOverlay||``

```blocks
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("", 0, 1)
    VelocityOverlay.setPosition(125, 8)
}
let ElapsedTimeOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
```

## {Step 16}
Creating the Remaining Distance Overlay
---
Lets create ``||variables:RemainingDistanceOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will display the distance remaining before the race finishes.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||variables:set textSprite to||`` ``||textsprite:text sprite "" +||`` block.<br>
► Drag it into the bottom of the``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:RemainingDistanceOverlay||``
___
4. Click the ``||sprites:Sprites||`` category.
___
5. Grab the <br>
``||sprites:set||`` ``||variables:mySprite||`` ``||sprites:position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Set **x** = **75**<br>
► Set **y** = **8**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:RemainingDistanceOverlay||``

```blocks
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("", 0, 1)
    VelocityOverlay.setPosition(125, 8)
    RemainingDistanceOverlay = textsprite.create("", 0, 1)
    RemainingDistanceOverlay.setPosition(75, 8)
}
let ElapsedTimeOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
let RemainingDistanceOverlay: TextSprite = null
```

## {Step 17}
Creating the Drs Overlay
---
Lets create ``||variables:DrsOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will be present when the DRS speed boost is active.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||variables:set textSprite to||`` ``||textsprite:text sprite "" +||`` block.<br>
► Drag it into the bottom of the``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:DrsOverlay||``
___
4. Click the ``||variable:textSprite||`` to ``||variables:DrsOverlay||``
___
4. Click the ``||textsprite:+||``<br>
► Click the second white box and change it to **RED**.
___
5. Grab the <br>
``||sprites:set||`` ``||variables:mySprite||`` ``||sprites:position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Set **x** = **0**<br>
► Set **y** = **17**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:DrsOverlay||``

```blocks
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
let ElapsedTimeOverlay: TextSprite = null
let VelocityOverlay: TextSprite = null
let RemainingDistanceOverlay: TextSprite = null
let DrsOverlay: TextSprite = null
```

## {Step 18}
Updating raceStage
---
We must set ``||raceStage||`` to 2 in the ``||loops:on start||`` block.<br>
This will shift the control flow from ``||loops:on start||`` block to some new methods we will set up in subsequent tutorials.
___
1. Click the ``||variables:Variables||`` category.
___
2. Grab the <br>``||variables: set <variable> to 0||`` block.<br>
► Drag it into the bottom of the<br>
``||loops:on start||`` block.<br>
► Change the variable and assignment to<br>
``||variables:set raceStage to 2||``

```blocks
// @hide
function Initialize_Variables () {}
// @hide
function Initialize_Overlays () {}
// @hide
function Race_Countdown () {}
// @hide
function Initialize_Objects () {}
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
raceStage = 2
```