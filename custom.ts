
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#f41f86 icon=""
namespace foundation {
    /**
     * Sets the track image as the background.
     */
    //% block
    export function SetBackground() {
        scene.setBackgroundImage(assets.image`track`)
    }
}

/**
 * Custom blocks
 */
//% weight=100 color=#1fe3f4 icon=""
namespace countdown {
    /**
    * Sets the lights-0 image as the background.
    */
    //% block
    export function SetCountdownImage1() {
        scene.setBackgroundImage(assets.image`lights-0`)
    }

    /**
    * Sets the lights-1 image as the background.
    */
    //% block
    export function SetCountdownImage2() {
        scene.setBackgroundImage(assets.image`lights-1`)
    }

    /**
    * Sets the lights-2 image as the background.
    */
    //% block
    export function SetCountdownImage3() {
        scene.setBackgroundImage(assets.image`lights-2`)
    }

    /**
    * Sets the lights-3 image as the background.
    */
    //% block
    export function SetCountdownImage4() {
        scene.setBackgroundImage(assets.image`lights-3`)
    }

    /**
    * Sets the lights-4 image as the background.
    */
    //% block
    export function SetCountdownImage5() {
        scene.setBackgroundImage(assets.image`lights-4`)
    }

    /**
    * Sets the lights-5 image as the background.
    */
    //% block
    export function SetCountdownImage6() {
        scene.setBackgroundImage(assets.image`lights-5`)
    }

    /**
    * Sets the lights-go image as the background.
    */
    //% block
    export function SetCountdownImage7() {
        scene.setBackgroundImage(img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 d c f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f c d 1 1 1 1 1 1
    1 1 1 1 1 1 c f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f c 1 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f c d d d d d b b b f f f f f f f f f f f f c c f f f f f f f f f f f f b b b b b f f f f c d d d d d d d d d b f f f f f f f f b d b c f f b d d b f f f f f f c b d b f f c d b b b d d d b b d b f f f f f c b b b b c f f f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 1 1 1 1 1 1 1 b f f f f f f f f f f d d f f f f f f f f f f b 1 1 1 1 1 1 1 b f f c 1 1 1 1 1 1 1 1 1 1 c f f f f f f f d 1 1 c f f d 1 1 1 c f f f f f b 1 1 d f f b 1 1 1 1 1 1 1 1 1 1 d f f f c d 1 1 1 1 1 1 d c f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 1 1 1 1 1 1 1 1 c f f f f f f f f c 1 1 c f f f f f f f f d 1 1 1 1 1 1 1 1 d f f c 1 1 1 1 1 1 1 1 1 d c f f f f f f f d 1 1 c f f d 1 1 1 d f f f f f b 1 1 d f f b 1 1 1 1 1 1 1 1 1 1 d f f c 1 1 1 1 1 1 1 1 1 1 b f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b c c c c d 1 1 d f f f f f f f f b 1 1 d f f f f f f f d 1 1 1 b c c c b 1 b f f c 1 1 1 c f f f f f f f f f f f f f f d 1 1 c f f d 1 1 1 1 d f f f f b 1 1 d f f f c c c b 1 1 d f f f f f f d 1 1 d b f f c d 1 1 1 c f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b f f f f f 1 1 d f f f f f f f c 1 1 1 1 c f f f f f c 1 1 1 c f f f f f c c f f c 1 1 1 c f f f f f f f f f f f f f f d 1 1 c f f d 1 1 1 1 1 b f f f b 1 1 d f f f f f f c 1 1 d f f f f f b 1 1 d f f f f f f d 1 1 d f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b f f f f c 1 1 d f f f f f f f d 1 1 1 1 d f f f f f b 1 1 b f f f f f f f f f f c 1 1 1 f f f f f f f f f f f f f f f d 1 1 c f f d 1 1 d 1 1 1 c f f b 1 1 d f f f f f f b 1 1 d f f f f f d 1 1 b f f f f f f f 1 1 1 c f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 d b b b b d 1 1 d f f f f f f c 1 1 d d 1 1 b f f f f d 1 1 c f f f f f f f f f f c 1 1 1 d d d d d 1 b f f f f f f f f d 1 1 c f f d 1 1 c d 1 1 1 f f b 1 1 d f f f f f f b 1 1 d f f f f f 1 1 1 f f f f f f f f d 1 1 b f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 1 1 1 1 1 1 1 1 c f f f f f f d 1 1 c c 1 1 d f f f f d 1 d f f f f f f f f f f f c 1 1 1 1 1 1 1 1 1 d f f f f f f f f d 1 1 c f f d 1 1 b f 1 1 1 d f b 1 1 d f f f f f f b 1 1 d f f f f c 1 1 d f f f f f f f f b 1 1 b f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 1 1 1 1 1 1 d c f f f f f f c 1 1 d f f d 1 1 b f f f d 1 1 f f f f f f f f f f f c 1 1 1 d d d d d d b f f f f f f f f d 1 1 c f f d 1 1 b f c 1 1 1 b c 1 1 d f f f f f f b 1 1 d f f f f c 1 1 d f f f f f f f f d 1 1 b f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 d b b b 1 1 d f f f f f f f d 1 1 c f f c 1 1 d f f f d 1 1 b f f f f f f f f f f c 1 1 1 f f f f f f f f f f f f f f f d 1 1 c f f d 1 1 b f f b 1 1 1 b 1 1 d f f f f f f b 1 1 d f f f f f d 1 1 c f f f f f f f d 1 1 c f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b f f f d 1 1 b f f f f f c 1 1 1 d d d d 1 1 1 b f f b 1 1 d f f f f f f f f f f c 1 1 1 c f f f f f f f f f f f f f f d 1 1 c f f d 1 1 b f f f d 1 1 1 1 1 d f f f f f f b 1 1 d f f f f f b 1 1 d f f f f f f b 1 1 d f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b f f f c 1 1 d f f f f f d 1 1 1 1 1 1 1 1 1 1 d f f f d 1 1 d c f f f c d b f f c 1 1 1 f f f f f f f f f f f f f f f d 1 1 c f f d 1 1 b f f f f d 1 1 1 1 d f f f f f f b 1 1 d f f f f f c 1 1 1 d f f f f b 1 1 1 b f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b f f f f d 1 1 b f f f c 1 1 d b d d d d b d 1 1 b f f c 1 1 1 1 d d d 1 1 d f f c 1 1 1 d d d d d d d c f f f f f f f d 1 1 c f f d 1 1 b f f f f c 1 1 1 1 d f f f f f f c 1 1 d f f f f f f b 1 1 1 1 d d d 1 1 1 b f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    1 1 1 1 1 d f f f f f f f f f f f f f f f f f b 1 1 b f f f f c 1 1 1 c f f d 1 1 c f f f f f f c 1 1 1 f f f c d 1 1 1 1 1 1 1 d f f c 1 1 1 1 1 1 1 1 1 1 b f f f f f f f d 1 1 c f f d 1 1 b f f f f f b 1 1 1 d f f f f f f b 1 1 d f f f f f f f b 1 1 1 1 1 1 1 1 b f f f f f f f f f f f f f f f f f f f f f d 1 1 1 1 1
    d d d d d b f f f f f f f f f f f f f f f f f b 1 1 b f f f f f b 1 1 b f c d 1 d f f f f f f f f b 1 d b f f f f b d d d d d b f f f c 1 1 1 1 1 1 1 1 1 1 b f f f f f f f d 1 d c f f b 1 d c f f f f f f b 1 1 d f f f f f f c d 1 d f f f f f f f f f b d d d d b c f f f f f f f f f f f f f f f f f f f f f f b d d d d d
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
    d d d d d b f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f`)
    }

    /**
     * Play the race countdown tone.
     */
    //% block
    export function PlayCountdownTone() {
        music.play(music.tonePlayable(175, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    }

    /**
    * Play the race start tone.
    */
    //% block
    export function PlayStartTone() {
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    }
}

/**
 * Custom blocks
 */
//% weight=100 color=#795695 icon=""
namespace finish {
    /**
     * Sets the finish line track image as the background.
     */
    //% block
    export function SetFinishBackground() {
        scene.setBackgroundImage(assets.image`finish-line`)
    }
}