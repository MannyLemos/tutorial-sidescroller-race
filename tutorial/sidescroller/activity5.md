# Speedy Finish

```template
namespace SpriteKind {
    export const Projectile_Spawner = SpriteKind.create()
    export const Finish_Line = SpriteKind.create()
}
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    dragReductionState = 0
    dragReductionFactor = 1
    racerLaunched = 0
    nextOpponentSpawnTime = 0
    progressionVelocity = 0
    loopStartTime = 0
    timeSinceRaceStart = 0
    raceStartTime = 0
}
function Initialize_Objects () {
    OpponentSpawner = sprites.create(assets.image`temp1`, SpriteKind.Projectile_Spawner)
    foundation.SetBackground()
    myRacer = sprites.create(img`
        ......................................................................................................................................................................................................................................................ccbccccccccc..............................................................
        ......................................cbcccccccc............................................................................................................................................................................................ccbcccccccfccccccccccccccccccbc.............f.......................................
        ................................cccccffcfffffffffcfffcccccccc...........................................................................................................................................................................bccccccffffffffccccccccfffffffffcccc..........cccffffffffccccccc........................
        ..............................cccfffffffffffffffffcccfffffffccccb......................................................................................................................................................................bbccffffffffcccbbbbbbbbbcccfffffffcccb......cccccccccccfcccffccccc.......................
        .............................cccccffffffffffccccccccccccfffffccccbb...................................................................................................................................................................bcccfffffffcccbbbdddddddbbbcccffccccccc....accccaacbcbbbfbabcccffffcc.....................
        .............................cfccccfffffccccccbbbbbbbbbccffffcccccbb..................................................................................................................................................................ccccffffffcccbbddddddddddbbcccccccccccfb..333bbbbbbbbb3bfc3bfffffffff.....................
        ............................ccfcccfffffcccccbbbbbbbbbbbcccffffcccccb.................................................................................................................................................................bccccffffffccbbddddddddddddbbcccccccccffb.d3333bb3333b333bb3bcccffffffc....................
        ............................cffcccffffcccccbbbbbbbbbbbbbcccccccccccbb................................................................................................................................................................bccccccfffcccbbdddddddddddddbbcccccccccfb.d3333bb3333b333333bbbbbbbbbbb....................
        ............................cffcccffffccccbbbbbbbbbbbbbbcccccccccccbb................................................................................................................................................................bccccccccccbbddddddddddddddbbccccccccccfc..b33bbb3333b3333333bbbbbbbbbb....................
        ............................cffcccffffcccbbbbbbbbbbbbbbbcccccccccccbb................................................................................................................................................................bcccccccccccbbbbbbbbbbbbbbbbcccffccccccfc...bbbbb3333b3333333bbbbbbbbbbb...................
        ............................cffcccfffccccbbbbbbbbbbbbbbbcccccccccccbb................................................................................................................................................................bcccccccffccbbbcccccccccbbbbccccccccccccc....bbdbbb333b333333bbbbbbbbbbb...................
        ............................cffcccffffcccbbbbbbbbbbbbbbbcccccccccccbb................................................................................................................................................................bcccfffcccccccfccccbbbbbbbbbbcccccccccccc....bddbbd333b333333bbbbbbbbbbbb..................
        ............................cfffcfffffccbbbbbbbbbbbbbbbccccccccccccbb................................................................................................................................................................cccccccccffffcccbbbbbbbbbbbbccccccccccccc.....bdb8ddddbddddddbbbbbbbbbbbb..................
        ............................ccccccfffcccbbbbbbbbbbbbbbbccccccccccccbb................................................................................................................................................................ccccccffffffcccbbbbbbbbbbbbbccccccccccccc......3d689999999911dbbbbbbbbbbbb.................
        ............................ccccccfffccccbbbbbbbbbbbbbbbccccccccccccb.........................................................................dd1111ddddddddddddddddd................................................................ccccfffffffcccbbbbbcbddbbbbcbcfffccccfccc.......3d68888866691dbbbbbbbbbbbb.................
        ............................ccccccffffcccccccccccbbbbbccccccccccccccb............................................................bcfffcb1dd111ddddddddddddddddddddddddddddbbcfffc....................................................ccccffffffccbbbbbbbcbbbcffffffcffccccfffc.......33d886888666d1dbbbbbbbbbbc.................
        ............................ccfcccfffffcccccccbbbbbbbbbcccccccccccccb...............................................bbbbbbbccbbbccccbb1111ddd33ddddddddddddddddddddddddddddd3bbcccc..................................................bccffffffccccbbbbbccccffffffffccfccccfffb.........dd8888886691dbbbbbbbbbbbc................
        ............................cfcccffffffcccccbbbbbbbbbbbbcccccccfccccb......................................bbdbcbcccccbbbcccccbbbbbbd11d333dddddddddddddddddddddddddddddddddddddd3bbc................................................bccfffffffccccccccccfffffffffffcfccccffc...........dd86bb6bbbd1dbbbbbbbbbbc................
        ............................ccffffffffcccbbbbbbbbbbbbbbbccccccfffcccb.............................bbbbbbbbbbbbbccccccccbbcccbb99dddd1dddddddddddddddddddddddddddddddddddddddddddddddbcc...............................................ccfffffffffffccccccfffffffffffccfcccffc.............bb11d11111dbbbbbbbbbbc................
        ............................ccffffffffccbbbbbbbbbbbbbbbbccccccffffccb.......................bbbbbbbbbbcccfffffffffffffffcbbb9966d11ddddddddddddddbbbbbbbbbbbbbbbbbbbbbbbdbddddddddddddcccc............................................cccffffffffffffffffffffffffffffcffffccc..............bd1d333ddddbbbbbbbbbbc...............
        ............................ccffffffffccbbbbbbbbbbbbbbbcccccccfffffcb..................bbbbbbbbbbcfffffffffffffffffffcbb999666d11dddddddddbbbccbbbbbdddddddddddddddddddbbbbbbcccbbbbbbbfffccc.........................................cccccccccccccbcffbbfffffffffffffcccccc................6b9dddddddbbbbbbbbbbb...............
        .....dddddd.................cfffffffffccccbbbbbbbbbbbbccccccccffffffc.............cbbbbbbbbbbbcffffffffffffffffffcbbddd16686d11d3dddddbbcccbbdddddddddddddddddddddddd111ddddddddddbbbbcfffffffccc.....................................dbbbbbbdbbbbbbcffccffffffffffffffccbd.................98866d111ddbbbbbbbbbbc..............
        dccfbddddddddddddd..........cffffffffffcccbbbbbbbbbbcccccccccfffffffc........ccccbbbbbbdbbdbbffffffffffffffffcbbddddddd1bbd11ddddddbcccbbddddddddddddddddddddddddddddddddddddddddd111dddcccccfffffcc..................................ddddbbbcfffffffffffffffffffffffffffcb..................b888869911bbbbbdbbbbb..............
        dbffcddddddd33ddddddddddddddbbbccffffffffcccbccccccccccccccfffffffffc....ccffcccbbbbbbddddbcfffffffffffffcbbdddddd33ddd1111ddddbbcccbdddddddddddddddddddddddddddddddddddddddddbdddddddddbcbcbbbcffffffffffffffffffffffffffffc..........bddddbbcffffffbbccffffcffffffccccccc...................d68888891dbbbbbbbbbbc.............
        ddcfcddddddd3dddddddddddddddddddfffffffffccccbcccccccccccccfffffffffcddfffccccbbbbbbbdddbcffffffffffffcbdddd3d33ddddddd11ddbbcccbddddddddddddddddddddddddddd3dd3d13ddddddddddd3ddddddddddcbbbbbbccfffffffffffffffffffffffffc............ccbddbbcccffcbbbbcfffcffffffccc........................d66686611bbbbbbbbbbc.............
        dddfcdddddddddddddddddddddddddddffffffffffffffcccccccfffffffffffffffbdbfccccccbbbbbddddcffffffffffcbbddddd333ddddddddddbbcccbbdddddddddddddddd3d1d3dd3dd3ddd3dd3d1dddddddddddd3ddddddddddcbbbbbbcbcfffffffffffffffffffffffc..............ffcccccbcccbbbbbcfffccfffffcc.........................9686888b1dbbbbbbbbbc.............
        dddbcdddddddddddddddddddddddddddffcbcfcdbcbbbbbbbbcffbbbbbbbcccfffffbdbcccbccbbbddbbbcfffcccfffcbbddddd33dd3dddddddbbcccbbddddddddddddddddd3dd3ddd3dd3d13ddd3dd3d1dddddddddddd3ddddddddddbbbbbbbbcbcffcbccfffffffffffffffb..................ffffffccbbbbbbfffccffffc...........................666666dd11bbbbbbbbbbc............
        ddddb3dddddd3dddddddddddddddddddffbbcffccccccccccccffcbbbbbbbbbbbbcbddbbbbbbbbbbbcfffffffccffbb3ddd3333dddddddd3bcccb3dd1ddddddddddddddddddddd3ddd3dd3d13ddd3dd3d1dddddddddddd3dddddddddddcbbbbddcbbfffb...cccfffffffffc...................cfffffffbbbbbbbccfccfffc.............................666b9d11ddbbbbbbbbbb............
        dddddddddddd3dddddddddddddddddddffffffffffffffccbcffffcfffcffccccbddddbbbbbbbccffffffffffffc3dd3333333ddddddbcccbbdddddddddddddddddddddddddddd3ddd3dd3d13ddd3dd3d1dddddddddddd3dddddddddddccbbbddbbbbcff.....cccffffffc.....................ccccbbbbbbbccbccfcbfcb...............................666669d11bbbbbbbbbbc...........
        ..ddddddddd1bdddddddddddddddddddffccffffffccffccbbcfffcccccffffffcbdddbccbbcffffffffffccccbdd333333dddd3bcccbbddddddddddddddddddddddddddddd3dd3ddd3dd3d13ddd3dd3d1d3dddddddddd3dddddddddddbfbbbbddbbbcffc.......ccfffc..........................dbbbbbcfcbbcfcbcc.................................b6668861dbbbbbbbbbc...........
        ..dddd111111d111ddddddddddddddddffffffffffbbffccccbcfffbbcffffffcbddddbbcffffffcffffffbbfcdd333dddd3bcccbb3ddddddddddddddddddddddddddddddddddddddd3dd3d13ddd3dd3d1d3dddddddddd3ddddddbbbddbffbbbddbbbbcffb......................................dbbbbbffbbbccbbcc..................................966666d1bbbbbbbbbbc..........
        .dddddd1199dd111ddddddddddddddddffffffffffbbffcbbbbbcfffccfffbbcddddddbcfffffccccffcccfff3ddddddbbcfbb3dddddddddddddddddddddddddddddddddddd3dddd1d3dd3d1dddd3dd3ddd3dddddddddd3dddddbbdbbddcfcbbbcccbbbffc.....................................ddbbbbcffcbdbcdbcf..................................66666861dbbbbbbbbbc..........
        .dddddd19666cd11ddddddddddddddddfccfffffffbbffcbbbbbbcbbccfffcbbbdddbbcfffccccccfcccffffbdddbbc8886bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd3ddddbbbbbbbdbffcbccfcbbbcffcb...................................dbbbbbffffdddbdbcc..................................666666d11bcbbbbbbbc..........
        ddddddd116666911111111111111ddddcfccbcffffbcfcbcccbbbbcbbbbfffcbbcbcffffcbbcffcfffffffffbbc88886666ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd3ddddbbbdbbbddfffbddccbbbbcffd..................................ddbbbbccfffdddcdbbcb.................................6666bd11ddbbbbbbbbbc.........
        ddddddd116666911111111111111ddddcfccbcffffbcfcbcffcbbbbcbbdbfffcdbffccbddcffffffffffffff8888666888bddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbdbbbddcffcbdbcbbbbbcfc..................................dbbdbbcbfffbddbbdbcc..................................66d1dddddbcbbbbbbbc.........
        ddddddd116666999999999999d11ddddcfffffffffbbfcbcfffbbbdcbbbcffffcdbcbddbfffffffffffffff8868888888c3333333333333dddddddddddddddddddddddddddddddddddddddddd3dd333333d3dddddddddddddddbbbddbbddbfffbbbcbbbbbbff.................................ddbbbbcbbfffbdddbdbcc..................................69d19bd1ddcbbbbcbbcc........
        ddddddd116666999996666666b11ddddccccccccffbcfcbbffffbbdbcffffffffbdbbdbffcccccffffffff888888888cb333333333333333333333333333d3ddddd333333333333333333333bb33333333333333333dddddddddbbdbbbddbfffbbbcbbbbbbcfc................................dbbbbbcbbfffcdddbdbbcd..................................969688911bcbbbcbbbc........
        ddddddd116666999999666666d11ddddcccccccfffbcfcbcffcfcdddbfffcbcfffbddbffcccfffffffffff88ff88ccb33333333333b333bb333b333b333333333333333333333333333333333333333333333333333333dddddddbbbdddddfffbbbccbbbbbbffb..............................ddcbbbbcdbccffd1dcdbbcb..................................66866686d1ccbbbbbbc........
        ddddddd116666999999666666d11ddddccffffffffbcfcbbfffbfbdddbcbdddbfffbddcfcbbcccfffffffffc668b33d33b3d33bd33b333b3d33b333b333bb333b3333333333ddddddddddddddddd333333333333333333dddddddddddddddfffbbbccbbbbbbbfc..............................bbcbbbcbbbccffbddbdbbcb...................................668668861dcbbbbbbbc.......
        ddddddd116666999999666666d11ddddcfffffffffbcfcdbfffbbfddddbcddddbfffbddcfcbbbfffffc866666bdddddd3b3dd33dd33dd333d33bd33b3d333d33bdd33dd33dddddddddddddddddddddddddddddddddddddd1dddddddddddddbcfcbcccbbbbbbbcfb............................bbcbbbccdbbcccfcddbbdbcb...................................6666666861bbbbbbbbc.......
        ddddddd116666999996666666b11ddddcfffffffffbcfcdbffffbcbddddcbddddbffcbddcffcffc668666668bddddddd33ddd33dd33dd333dd33dd33dd333dd3bddddddddddddddddddddddddddddddddddddddddddbbbbbdddd1ddddddddddbbbbcccbbbbbbcfc............................bbcbbbcbdbbbbcfcddbbdbccddbbbcbbccf.........................669666689dcbbbbbbcc......
        ddddddd116666999999999b9bd11ddddcfffccbcffbcfcdbffffccfbddddcdddbbbbffcbbcf686666688888bdddddddd33ddd33dd33ddd3ddd33dd33ddd33dd3bdddddddddddddddddddddddddddd33333333333333cccccffcbddddddddddd3bbcfbbbbbbbbbcf...........................bbccbbccbbbbbbbffdddbdbbcddbbbbbbbcfc........................966666668dbcbbbbbcc......
        ddddddd119666911111111111111ddddcfccbbbcffbcfcdbfffffffcddddbcdbbbbbfc8c68888888888888bddddddddd33ddd3ddd33ddd3ddd33dd33ddd33bbbbbbbbbb3ddddddddddddddddddddddddddddddd3333b1dbd333bbbbdddddddd3ffff3ddd33bbbbfc..........................bbcbbbcbdbbbbbbffbbbcdbbcddbccbbbbcfc.........................6866666861ccbbbbcf......
        ddddddd11999b91111111111111dddddcfcbbdbcffbcfcdbffffffffbddddbccccc888888888888888888bdddddddddd33ddd3ddd33ddd3ddd33ddd3dddddbbbbbbbbbcbddddddddddddddddddddddddddddddddd3b6bd6b333333bbd1ddddd3cbbdddddddddddbbddb......................bbcbbbbcbbbbbbbbffcbbcbbbcbdcfcbbbbcfc.........................966666888ddfcbbbcfc.....
        ddddddd11669bd11ddddddddddddddddcfcbbdbcffbfffbcfffff88f8cbbbc8888888888888888888868bddddddddddd33ddd3dddd3ddd3ddd3ddddddddddbbbbbddbbc3ddddddddddddddddddddddddddddddddddbbbdbd333d3333bd1ddd3ddddddddddddddddddddddddddddd............ddbfbbbbbddbbbbbbbccbbcbbbcbdcfcbbbbcfc.........................19666b6bbbdcfccccfc.....
        ddddddd11666b911111dddddddddddddcfcbbbbfffbcffbcf88888888888888888888888886666666666dddddddddddddddddddddddddddddddddddddd333bbbbbddbbc3dddddddddddddddddddddddddddddddddd991dbb3ddddd333bd1ddddddddddddddddddddddddddddddddddd33ddb...dbbfbdbbcbdbbbbbd11bcbbbcbbccdcfcbbbbbcc.........................dbdd11d1111dfffffff.....
        ddddddd116666999911111ddddddddddcfcbbbbfffcfffbc88888888888888888866666666666666666bddddddddddddddd3d3dddddddddddddddddddd333bbbbbbbbbcb333ddddddddd33333dddddd1ddddddd1ddddd3d33dddddd333bd1ddd3dddddddddddddddddddddddddddddddddddddd3bbbbbbbcb..bbbbbd1bcbbbcbbbcbcfcbbbbbfc.........................d3ddddddddddcffffffc....
        ddddddd116666999999911111dddddddcfcbbdbfffcfffbc8666666666666666666666666666666666bdddddddd9dddddddddddddddddddddddddddbbdd33bbbbbbbbbcb33333dddddddd33333333333333333333333333333333333333bddddd333333dddddddddddddddddddddddddddddddddddd33333bbbbbbbbbbcccbbcbbbcbbccbbbbc...........................dd3bb3d33333bffffffc....
        ddddddd116666999996699911111ddddcfcbbbbfffcfffbc866666666666666666666666666666668cdd99bbbbbbb33dddddddddd3333333333b3dbbbbd3bbbbbbbbbbcb33333333ddddddd3333333bbbaaecccccccccccccccccccccccfbdddd3cffffbddddddddddddddddddddddddddddddddddddddddddddd33333bbbbbbbbbbbbcbbbbbccccc.......................dd3333d33333bfffffff....
        ddddddd116666999999966669d11ddddcfcbbbbfffcfffbf86666666666666666666666666688cccbdddbbbbb33333d333333333ddddd3dddddd333333333bbbbbbbbbcb333bbbbbbbbbb3ddd333333bbccffffffffffffffffffffffffffddddddcffffbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd3dd33333333bbbbbbbbbbbccbbbb......bd33333d33333dcffccffc...
        ddddddd1119b6999999666666b11ddddcfccbbbfffcfffbf866666666666666666666888ceeeeccb9bbb3333dddddddddddddddddddddddddddddddddddddddd3333333333dbbbbbbbbbc3bb3333333bfffffffffffffffffffffffffffffbddddddcffff3dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd999ddddddd33333333333333333333bbbbbbbbbbbb3333dcfccbbff...
        ddddddd11111bb99999666666d11ddddcfccbbcfffcfffcf866666666666668888888cceeeebbb688c33dddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbc3b8a33333bfffffffffffffffffffffffffffffffdddddddbfffcdddddddddddddddddddddddddddddddddddddddddddddd999999999ddddd96bdddddddddd333333333333333333333333333333bbbbcfcbbbcf...
        dddbdd3ddd11d119999666666d11ddddcfccbbcfffcfffcc866666888b68888ffccceeeeebd96888bddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbcbb88b3333cfffffffffffffffffffffffffffffffbdddddddbfff3ddddddddddddddddddddddddddddddddddddddddddddd999996669dddddd69d3dddddddddddd333dbb3d33333d3b33bdbb333333333bbbbbbf...
        ddddddd111119999999666666d11ddddcffccccfffffffcf888888ccbdbfcfcbddd422eebd98888bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbcbd66b3dd3cfffffffffffffffffffffffffffffffbddddddddbcfbddddddddddddddddddddddddddddddddddddddddddddd966666666ddddd998ddddddddddddd3333d3bbd33d33d33ddbdbbbdddbb33333bbbbcc..
        dddbddd119996999999666666d11ddddcffffffffffffffff8cccbbbb8cbbbddbb422eebd96688cddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbcbd66bddd3ffffffffffffffffffffffffffffffffcdbbbbdddddbbddddddddddddddddddddddddddddddddddddddddddddd969999999dddddd96dddddddddddd33333d3bb3b333333bddbdbb3dddcbbd3333dbbcf..
        ddddddd116666999999666b9d111ddddcffffffffffffffcccbbcc88f8d1bd1bb322eebdd66c68bddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbccd66bddd3ffffffffffffffffffffffffffffffffcddbbbdddddd33dddd3333dddddddddddddddddddddddddddddddddddd969d99999dddddd96dddddddddddd33333d3bb3bb33333b3dbddbbdddbbb3dd3bbbbbf..
        ddddddd1166669999bbb9dddd11dddddcffffffffffffffccccfccccccddbd111322eeddb6888bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbcbbbbccbfc66bddd3fffffffffffffffffffffffffffffffffd1dbddddddddddd33333333ddddddddddddbdbddddbddddbbdddddddd999996869ddd3bb69d33333ddddd3dbbbdd3bb3b33333333db33bb3dddbbddddddbbbf..
        ddddddddd686ccccccccccccccbbbbbbcffffffffffffffbbbbbbbbcbbbcdbd1dbbeebdb688cb333333ddddddddddddddddddddddddddddddddddddddddddddddddddddddddcbcbbbbccbff66bddd3ffffffffffffffffffffffccccfffffffdddbb1dddddd333333333333dddbbddbdddbddddddddbddbb3ddddddd966996966d3d33d66bd3333333d3dbfcfbd3bb3b333b33b3db33bb3ddddbdd3d99bbbf..
        dddbddbcc8fccfccccccccccbcccfffcccccfffffffffffcbddbbbbcbbbcdbbddbbbbbdb68ccb3333333dddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbbcb66b3d33ffffffffffffffffffffccbbbcfffffffddddbddddd3333333bbbb33dddddddddddddddddddddddddddddddddd96966b996dd333dbbdd333333333dcfcff33cb3b333b33b3db33bb3dd3db3dddbcbbbf..
        dddbddd11b668666666668888b1d333dcffffffffffffffcbbbbbbbcbbbcddbddb22eedb66888bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbccd66b3d33ffffffffffffffffffffcfccffffffffcddddbdddddbc333333ddddddddddddddddddddddddddddddddddddddd96998b996dd3333d9d3333333333dcfbcf33bb3b333333b33b33bb3333bb33333bbbbf..
        dddbddd1111dbb99999666666b1d3dddcffffffffffffffccc888888bbbbb1dddde2eebdd688c8bddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcbbbbbbbbccd66b3333cfffffffffffffffffffffffffffffffcddddbdddbcfc333dddddddddddddddddddddddddddddddddddddddddd969999996d3333db6bd3333333333bfbfb33cb333333dbf33c33bb3333bb3333bbbbcf..
        dddbd3dddd11dd99996666666d1dddddcfffffffffffffffcbbcbcffcbddd1db1be2eeebdb68c8cddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbbcb88b3333cfffffffffffffffffffffffffffffffbdddddddbfffbddddddddddddddddddddddddddddddddddddddddddddd969ddd996d333d99dd333333333333bcb333fb33333b3bc33c33b33333333bbbbbbbcf..
        dddbdddddd11d199999666666d11ddddcffffffffffffffffcccbbbbccbbddbbddee2eeebdb8888bdd3ddddddddddddddddddddddddddddddddddddddddddddddddddddd33333bbbbbbbccb8c3333bcfffffffffffffffffffffffffffffffdddddd3bffff3dddddddddddddddddddddddddddddddddddddddddddddd9bd3dd9d3333dbbbd333333333333333333333333333333333333bbbbbbcccbbbbbc...
        dddbddd11119b999999666666d11ddddcfffffffffffffff88888886bbbff8ccbbbfeeeeebdb8888bd33333333d3dddddddddddddddddddddddddddddddddd3333333333333333bbbbccfcbcb33bb3bffffffffffffffffffffffffffffffcddddd3cfcffcdddddddddddddddddddddddddddddddddddddddddddddd33dd3333333333ddd3333333333333333333333bbbbbbbbbbbbbbcccbbbb3ccbbbbbc...
        dddbddd119666999999666666d11ddddcfffcccfffffffcf866666888868888888c8fccee2bddb888cb333333333333333333333333ddddd33333333333333333bbbbbbbb33333bcccfffcbb3333333bfffffffffffffffffffffffffffffd1ddddcfffff3ddddddddddddddddddddddddddddddddddddddddddd33333333333333333333333bbbbbbbbbbbbcccccccccccfffcccb3bb33b3333dccbbbbbc...
        dddbddd11666699999966669d111ddddcfccbbcfffcffcbf86666666666666668888888ceeceebbbbc8b33333333333333333333333333333333333333333bccccccccfcbbbbb33bbbb3333333333333bcffffffffffffffffffffffffffcdddd3cfffffbddddddddddddddddddddddddddddddddddd333333333333333bbbbbbbbbbbcccccccccffffff....................33333333333dcbbbbbbc...
        dddbddd11666699999669d11111dddddcfccbbcfffcffcbf86666666666666666666666688888cebbdbbbbbbbb333333333333333bbbbbbb3bbbbbbbbbbbbcbbbbbbbbccbbbbb3333333333dd333333333bcccffffffffffffffffcccccfdddd3bfccccbdddddddddddddddddddddddddddd333333333333bbbbbccccccffccffccfffffcccccc...........................3d333333333bcbbbbbcc...
        dddbddd11666699999d11111ddddddddcfccbbcfffcffcbf866666666666666666666666666666888bddb6bcccabbbdbbbddbbbdbbbbbdbbbbbbbbbbdb3bbbbbbbbbbbccbbb33333333333333333dddddddddddddd33dddddddddddd3dbbddd3333333ddddddddddddddddddddddd33333333333bbbbccccccccccbcbbcccbbcccccccfffccccc...........................d3333d33333bcbbbbbc....
        dddbddd116666b9dd1111111ddddddddcfccbbbfffcffcbf8666666666666666666666666666666666bdd3333bbbbb33dddddddddddddddddddddddd33333bbbbbbbbbcb33333333d3333333dddddddddd1ddd111ddd6b9ddddddddddbbddd333333ddddddddddddddddddd333333333bbbbbbccfffcccccbbbbbbbbbbbbbbcfcccfccffffcccf..........................dbbb3333333dcbbbbbbc....
        dddbddd11666b11111111d1111ddddddcfccbbbfffcffcbc86666666666666666666666666666666666dddd33333333333333333333333333333333333333bbbbbbbbbcb333333ddddddddddddddddddddddddddddd9999dddddddddbbdddd333dddddddddddddd3333ddd3333bbbbb.........fffcbbbccbbbbbbcccccbbcfbccfccffffffff...........................ddd1db3333bcbbbbbcc....
        dddbddd116bdd1111199666911ddddddcfccbbbfffcffcbc868888888866688888666666666666666666dddd3ddd333333333333333333333333333333333bbbbbbbbbcb33333ddddddddddddddddddddddddddddddb999bddd33d3bbddd333dddddddddddd33dd333bbbbb..................fcfcbbccb....bffffcbbccbcfcbcffffffff...........................9bd13bddddccbbbbcc.....
        dddbddd11119b99d19666666911dddddcfcbbbbfffcffcbcf88888888888888888888888888666666668bdddddddddd33333333d333d33333333333333333bbbbbbbbbfb3333ddddddddddddddddddddddddddddddd6699b33333bcbddd333ddcccb3ddddd33bbccc........................ccccccccc.....ffffcbbfcbcfcbcffffffffc.........................988d1dd111dfccccbcc.....
        dddbddd111966999996966666d1dddddffccbbbfffcffcbcffffffffffcccc88888888888888888888868bd333ddddd33333333d33bd3333d333d33333333bbbbbbbbbb33333ddddddddddddddddddddddddddddddbbddbbbbbccbdddd33dd3dcfffbd3bbccfffff..........................ccfccbccb...bffffcddbcbcfc.cffffffffc.........................686996666bbfbcccbc......
        dddbddd119666999999666666d11ddddffccbbbfffbcfcdbffffffffcbbbbcfcccff888888888888888888bd333333333333333d333d3333d333d33b333b3333b33333333333ddddddddddddddddddddddddddddd3dbcfffcbbdd1dd333ddd3dbbbccccccccffffc..........................cccfcbbcc...cffffbdbbbbcf...ffffffffc.........................688888886bfccccccf......
        dddbddd116666999999666666d11ddddffccbbbfffbcfcdbffffffffcbbbcfbbbbccccccfccc88888888888b333333333b33333333b333333333333b33333333b333333333333ddddddddddddddddddddddddddddddd3dddddddd33333d3333bbbbbffccbcfffff............................cbfbbbcc...cffffbdbbbbcf....................................688888888dcfbbccccf......
        dddbddd116666999999696666d11ddddfffcbbbfffbcfcbcfffffffcbbbbfcbbbbbbcfffcbccc86868888888b33333333b33333333b333b3333b333b3333b333b3333333333333dddddddddddddddddddddddddddddddddddd333333dd3333cfbbbccccbbffffff.............................bccbdbcc..cffffddbbbbcc...................................988888888bbfcbbbbcf.......
        dddbddd116666999996d11666d11ddddffffcccfffbcfcbcffffccfbbbbcfbbbbbbcffcbbfffffcfcb6666688bd333333b3333b333b333b3333b333b333bb333b333333333333333333ddd333333333bbbbbbb33b333333333333dddddd3dcffbbbbfccbcfffffc.............................bbfbdbbcbbcfffcdddbbbcc...................................68bddbddddcfbbbbbcf.......
        dddbddd11666b1d9996d11966d11ddddffffffffffbcfcbcffffbccbbbcfcbdbbbfffcbbfffccfffffccccbbb66d33333b3333b333b333bb333b333b333bb33ba33333333333333333333333333333333333333bb333333333dddddddddddcffbbbcfcbcffffffb..............................cccd..cbbcfffbddbbbccc..................................96bdddbdddbfcbbbbbf........
        dddbddd11666d119996d11666d11ddddffffffffffbcfcbcfffcccbbbcfcbdddbfffbbbfffbbbcffffffffccccccb3333bb333b333b333bb33ba333bb33bb333333333333333333333333333bbbbbbbbbbbb3bbbb3333333d3dddddddddddfffccbcfbbcffffffcc.............................cbc....cbcfffbddcbbccc..................................66d1db3333ffcbbbbcf........
        dddbddd11666b999999999666d11ddddffffffffffbcfcbcfffcfbbbbfcbbddbfffbbbffcbbbccfffffffff8fffffcbb333333b33bbb33bb333b333333333333333333333333333333333333333333333333333333333dddddddddddddddbfffcbbccbbffffffb................................ccc...cbcfffbddcbbbcc.................................68869dddddbfccbbbcff........
        dddbddd116666999999666666d11ddddcccccccfffbbfcbbffffbbbbcfffcbcfffcbbccfccccffffffffff8888888888cb3b3333333333333333333333333dddddddddddddddddddd33d333333333333333333333dddddddddddddddddddbfffbbbbbdcfffffc.................................cccb...bcffcddbcddbcb.................................688888991dcfccbbccfc........
        dddbddd116666999999666666d11ddddccccccccffbbfcbbfffcbbbcfffffffffcbbcbbcffffccccfffffff88888888888b33333333333333333dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd33ddddddddddddcfffbdbcdbffffff...................................ccbd.dccffbddbcddbc.................................688888888ddfccbbbbcf.........
        ddddddd196666999999666666d11ddddcccccccfffbbfcdbffcbddbfccffffffcbbfbbbbcffffffffffffffc888888888863333333dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd33ddddddddddddcffcbcccbcfffffc...................................cccbddcfffbbdbbdbbc.................................db8888886dcfccccccff.........
        ddddddd196666999966666666d11ddddfffcbcffffbbfcdbffbddbfcccccfffcbbfffcccbcffffffffffffffccff8886668bd3ddddddddddddddddddddddddddddddddddddd3ddd3dd3dddddd3ddddddddd3dddddddddd33ddddddddddddfffbdbbcfffffffb....................................cccbbcfffcccfbdbcc.................................19688888ddfcccccccf..........
        ddddddd116666999999bbbbbbd11ddddffcbdcffffbbfcbbbbbbbccbcccffffbbccfffffccccffffffffffffb33bbcfff86bddddddddddddddddddddddddddddddddddddddd3dd33dd3dd33d33dd3dd3bddbdddddddddd33dddddddddddbfccbddbfffffffc.....................................cccbbbcffbbcfbbccc................................998888bbddcfccccccff..........
        ddddddd11111d111111111111111ddddfccccfffffbbfcbbbbbbcfccccfffcbbcbbbccfffffccffffffffffff3333333bccfcbbdddddddddddddddddddddddddddddddddddd3dd33dd3dd33d33dd3dd33dd3dddddddddd33dddbbbbd33bcfcbdddbffffffc.......................................cccbbcccbcffcbccb................................8886bd111bfcccbcbcfc..........
        dddddd111111d11111111111111dddddfccfffffffbbffbbbbbbffffbbfffbbcbbbbbbbfffffffccccffffccfc3333333333bbcccbbdddddddddddddddddddddddddddddddd3dd33dd3dd33dd3dd3dd33dd3dddddddddd331dbbbbbcd1dfcbdddbfffffff.........cccc...........................ccccbccccffffcccc...............................68886b911dcfcbbbbbcf...........
        ddddddddddddbdddddddddddddddddddffffffffffbbffbddbbffffbbfffffffccbdddbccfffffffffffffcccfb3333333333333bbccccbbddddddddddddddddddddddddddd3ddd3dd3dd33dd3dd3dd33dd3dddddddddd331dcbbbbbcdbfbddddbffffffc......cccffffcc....................cfffcccccccfffffffcccfc..............................88888888ddffcbbbbcff...........
        dddddd3ddddd3dddddddddddddddddddffffffffffcbffbdddcfffccccffccccccbdddbbbccffffffffffffcccfb33333333333333333bbcccbbddddddddddddddddddddddd3ddd3dd3dd33dd3dd3dd33dd3dddddddddd331bbbdbbcfdcbddddbfffffff....cccfffffffffc...................cffffffccccccfffffccfcffc...........................196888666dcffbbbbbcfc...........
        dddddddddddd3ddddddddddddddddddbffffffffffffccbbdbfffcbccbbbbbbbbdddddbbbbbbbcffffffffffffffcb333333333333333ddd3bbccccbddddddddddddddddddd3ddd3dd3dd33dd3dd3dd33dd3dddddddddd331bcbbdbccbcdddddcffffffb.cccffffffffffffffc.................cffffcccfcbbbcffffccfffffc.........................d1b688888ddffcbbbbbff............
        ddddbddddddd3ddddddddddddddddddbffbbbffbbbbbbbbbbdbffbbbbbbbbbbbbbccddbbbbbbbbbbccfffffffccfffcbb3333333333333333ddd3bbccccbbddddddddddddddddddddd3dd33dd3dd3dd33dd3dddddddddd331bcbdbcfcbbdbdddfffffffccffffffffffffffffffc..............fcbbbbfccffcbbbbcfffccffffffcc......................d9b88886bbdcffcbbbbcff............
        dddcbddddddd3ddddddddddddddddddbfffffffccfcffccccccccfffffffffffffffbdbbbbbbbbbbbbbbbccfffccfffffcbb33333333333333333d3dddbbcccbbddddddddddddddddddddddddddddddddddddddddddddd33ddbbdbffbcbbcbbcfffffffffffffffffffffffffffffc..........cbddddbcffffffcccffffffffffffffffccc.................dd6888bdd11bfffcbbbbffc............
        ddbfbdddddddbdddddddddd333333333cfffffffffccccccccccccccccffffffffffcdbcbbbbbbbbbbbbbbbccffffffffffffcbb33ddd3333333333d111dd3bbcccbbddddddddddddddddddddddddddddddddddddddddd3ddddbcccbbfcffffffffffffffffffffffffcccffccc.cc.........bddddddcfcccccccfffffffffffffffffcb..................bd9fcbb11d33cfffcbbbcff.............
        dbffbdddd33333d3dd33d3....bbbccccffffffffccccccccbcbbbccccffffffffffcdbffbbbbbbdbddbbbbbbbcfffffffffffffccbdddd33333333d1991dd33ddbbcccbbdddddddddddddddddddddddddddddddddddddddddddbcbbcffffffffffccc.................................ddbbbbbbbbbbbbbffccffffffffffffcccccc................ddcbdd9911dbffffcccbcff.............
        bcffbdd3333db3..............fffffffffffffccccccbbbbbbbccccfffffffffffb..fffcbbbbddbbbbbbbbbbccfffffffffffffffcbbb333333d986991dd33dddddbbcccbbbddddddddddddddddddddddddddbbbbbbccccccbbcfffffffccc.....................................bccfffffffffffffffffffffffffffccffffccb.............bd6b198886d1cfffccbbcffc.............
        .....dddbb..................ccffcfffffccccccccccccccccccfffffffffffffb......ccbbbbbbbbbbbbbbbbbccffffffffffffffffcbbb33d16688691dd333ddddddbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbb33333dbcffffcccc.......................................ccfffffffffffccccccccccccffccfcfffffffc............bd988b88668ddffffccbbcff..............
        ............................ccffcfffffcccbbbbbbbbbbbccccfffffffffffff...........ccbbbbbbbbbbbbbbccccccccfcccccccccfffccbbbbb668691dd33333dddddddd3bbbbbbbbbbbbbbbbbbb3333dddddd333333bfffcccc..........................................cffffffffffcccbbbbbbbbbbbbcccfcfccccffc...........bdd888886888dbffffcccbfff..............
        ............................ccffffffffccbbbbbbbbbbbbcccfffffffffffffc................bbbbbbdbbbbbbbbbbccccccccccccccccccccbbbbb66b1ddd33333333dddddddddddddddddddddddd3333333333333bbffccc............................................bcffffffffcccbbbbbbbbdbbbbbbcbfcfccccfcc..........bbd8888b9868bdffffcccbcff...............
        ............................ccfffffffcccbbbbbbbbbbbcccfffffffcffffffc......................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd9dddd3333333333333333333333333333333333333dbbbccfcc...............................................bcffffffffcccbbbbbbbbbbbbbbcccfffccccfffc........3bdcb68c19868ddffffcccccff...............
        ............................ccfffffffcccbbbbbbccccccffffffccccfffffccb...........................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbd1d3d3333333333333333333333333333333bbbccfffcc.................................................cfffffffffccccbbbbbbbbbbbbbccffffcccffffc.......3bdbb968b9688b1cffffccccffc...............
        ............................ccffffffffccccccccccccccccccccccffffffcccb....................................bbbbbbbbbbbbbbbbbbbbbbbccccbbbddd1dddd333333333333333333dddddddbcfffffccc...................................................cccfffffffccbbbbbbbbbbbcccccffffffffffffc.......bdb8688888868ddffffffcccff................
        ............................ccffffffffccccccccccccccccccccccccffffcccb..............................................bbbbbbbbbbbbbccffffffcbbbddddddddddddddddddddddbbbbbbbfffcccc.....................................................bcccfffffcccbbbbbdbdbbbbbbcccccfffffffffc......bd9888888888861bffffffccfff................
        ............................ccffffffffccccbbbbbbbbbbbcccccccccfffccccb................................................................................................................................................................bcccffffccccbbbbbddbdbbbbbccccffffffffffc......b988888886666d1cffffffccff.................
        ............................ccffffffffccbbbbbbbbbbbbbbbbccccccffffcccb................................................................................................................................................................bccccffffcccbbbbbbbbbbbccccccffffffccfffc.....bdbbdddddd11111dfffffffcfff.................
        ............................ccffffffffccbbbbbbbbbbbbbbccccfffffffccccb................................................................................................................................................................bcccccfffccccbbbbbbbbbbccccccccfffcccffcc.....bbdbddddb333333bffffffccfff.................
        ............................ccffffffffccbbbbbbbbbbcbccccccffffffcccccb................................................................................................................................................................bccccccffcccbbbbbbbbbbbbbbbcccccfcccccccc....bbbbb3333b333333bffffccccff..................
        ............................ccffffffffcccbbbbbbbbbbbbbccccfffffffccccb................................................................................................................................................................bccccccffcccbbbbbbbbbbbbbbbcccccfccccfffc...bbbbbb3333b333333bfffcccbcff..................
        ............................ccffffffffcccbbbbbbbbbbbbcccccfffffffcccc.................................................................................................................................................................bbccccccccccbbbbbbbbbbbbbccccccfffccffffc...bbbbb33333333dd33bccbbbbbbcc..................
        ............................cccffffffccccbbbbbbbbbbbbcccccfffffffcccc.................................................................................................................................................................bbccccccfccccbbbbbbbbbbbcccccccffffcffffc..33333b3333333dbcb3bbbbbbcccc...................
        ............................cccfffffffcccbbbbbbbbbbccccccffffffffcccc..................................................................................................................................................................bcccccfffccccbbbbbbbbbccccccccfffffffffc..33333333333333cf33bfffffffff...................
        ............................cccfffffffccccbbbbbbbbcccccccffffffffcccb..................................................................................................................................................................bcccccfffffccccbbbccccccccccfffffffffffc...bbbbbbbbbbbbbccbbbcfcccccc....................
        ............................cccffffffffccccbccbbcccccccccfffffffccccb...................................................................................................................................................................bcccccffffffffffffffffffffffffffffffcc.......ffcccccccccfffffffccfc.....................
        ............................bccffffffffcccccccccccccccffffffffffcccc.....................................................................................................................................................................bcccfccccccfffccfffffffffffffffccccc...........ffffffffffcfff..........................
        .............................ccfffffffffffccccccccfffffffffffffccccb..........................................................................................................................................................................ccccccccccccccccccccccccccc.......................................................
        ..............................cccfffffffffffffffffffffffffccccccb...............................................................................................................................................................................................................................................................
        ................................cccccfcccccccccccccffcbbbbbbb...................................................................................................................................................................................................................................................................
        .................................................db.............................................................................................................................................................................................................................................................................
        `, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    scaling.scaleByPercent(myRacer, -85, ScaleDirection.Uniformly, ScaleAnchor.Middle)
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
    progressionVelocity = dragReductionFactor * Math.constrain(myRacer.x, 0, 120)
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
    0 0 0 0 0 0 0 0 c c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 c c c c c c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c f c c c c c c c c 0 0 b b b c c c c 0 0 0 0 0 0
    0 0 0 0 0 0 0 c f c c c c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c f f c c c b b c c c 0 0 d 3 d b c b b b 0 0 0 0 0
    0 0 0 0 0 0 0 c f c c c c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c f f f c b b b c c c 0 0 b d d b c c c c 0 0 0 0 0
    0 0 0 0 0 0 0 c c f c c b b b c c c 0 0 0 0 0 0 0 0 0 0 c c c b b b b b b b b b b b d d 3 b b b c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c f f f c c c c c c c 0 0 6 b b b c c b b b 0 0 0 0
    0 0 0 0 0 0 0 c f f c c b b c c c c 0 0 0 0 c c c c c c c b b b b b b b c c c c c c b b b 3 3 b b b b c c b 0 0 0 0 0 0 0 0 0 0 c f c c c c f c c f c 0 0 d d d 1 b c b b b 0 0 0 0
    0 b 3 3 3 d 3 b c f c c c c c c f f b f f c c b c f c b b b 8 c c c f f f f f f c c c c c c c c c c b b c c b c f f c c c 0 0 0 b b b c f f f f b d 0 0 0 0 d 6 b b c c b c 0 0 0 0
    c b 1 1 1 1 1 1 d f c c c c c b c b b f c c c c b b 3 b c f f f f f f f f c c c c f f f c c c b b c c c c c b b c c c c c 0 0 0 0 0 c f c c b c c 0 0 0 0 0 d b 8 d d c b b b 0 0 0
    0 3 1 d 1 1 1 1 d f c c c c c c c b b f c b 3 3 3 b c f f f f f f c c c c c c c c c c c c c c b b c c c c c c b 0 0 0 0 0 0 0 0 0 0 c c c c b b 0 0 0 0 0 0 0 3 d 6 b b b b b 0 0 0
    0 0 1 6 1 1 d 1 d c c c c c c c f c c b b b b c f f f f f f c c c c c c c f f c c c c c c c b b b c c c b c b b b 0 0 0 0 0 0 0 0 0 c c c c b b 0 0 0 0 0 0 0 0 d 6 9 1 b c b 0 0 0
    0 0 1 8 8 8 8 9 d c c c c c f c c f c f f f f f f f f f f f f f f f f f f f 8 c c c c c c f c c c c c c b c b b b 0 0 0 0 0 0 0 0 c c b c c b b 0 0 0 0 0 0 0 0 0 d d b d b b b 0 0
    0 0 d 8 9 9 b d d f c c c c c f c c c c f c c c c c f f f f f c c c c c c 6 6 6 6 8 8 8 8 8 8 8 8 6 6 c c c b c b b 0 0 0 0 0 0 0 f c b c c c b 0 0 0 0 0 0 0 0 0 0 b 6 6 d c b 0 0
    0 0 d b 1 1 1 1 d c c c f c f b b b d c c c c c c c c c c c b b b b b b 6 6 6 6 6 6 6 6 6 6 b b 6 6 6 6 6 8 c c c c 0 0 0 0 0 0 c b b b c c c b d b b b 0 0 0 0 0 0 0 d 6 b b b b 0
    0 0 d 8 9 d d 1 d c c c f c f b d b b c c c c c b b c c c c b c c 6 6 6 f c c 8 8 6 9 9 9 9 b b 6 6 6 6 6 6 6 b 6 6 8 8 8 c c 8 b d b b b b d c d b c b 0 0 0 0 0 0 0 0 1 1 d c c 0
    0 0 d b 6 8 8 9 1 c f c f c c c c c c c c c c c c c c c c b 6 c c c c 8 c c c c 6 6 6 8 f f f f f f c 6 6 f c 6 9 6 6 6 8 8 6 6 6 6 6 8 8 6 c 8 8 8 8 8 8 8 8 8 8 8 8 c 3 3 3 b c b
    0 3 1 d b 6 8 b 1 c f f f c c c f f 8 8 8 8 8 8 8 8 c c 6 c b b b c c 8 6 8 c b 6 8 8 c f f f f c c c c 9 6 f 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 8 6 9 d b 8 6 8 8 8 b b b b 6 6 c b f b
    0 d b 8 8 8 c d d f f b b f 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 8 8 6 6 6 6 f c 6 6 9 c f f f f c c c c 9 9 8 8 6 8 6 6 9 9 9 9 9 9 9 9 b b b 8 d d b b b b b b d b b b b b b b 8 b
    0 d d b 6 6 8 d d c f c c c c 8 8 8 8 8 8 8 8 8 8 8 6 8 8 8 6 b 6 8 6 6 6 6 c c 6 6 6 c c f f f c c c c 9 9 8 6 6 6 6 6 9 9 6 9 6 9 9 6 6 6 8 6 d d b 8 6 8 6 8 b b b b b b 8 b 8 b
    0 0 1 d b 6 8 6 1 c f c f c c c c c c 8 c 8 8 8 8 8 c b c b b b b b c 8 8 8 8 c 6 6 8 f f f f f f f f 6 6 8 f 6 6 6 6 6 9 6 6 6 6 6 6 6 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 c b 3 d c c 0
    0 0 d 8 8 6 d 1 d c c c f c f b d b d b c c c c c c c c c c b 6 6 6 6 8 f e c 6 6 6 9 6 6 6 c b 6 6 6 6 6 6 6 9 6 6 6 8 6 6 6 6 6 9 b b c b d c d b c b 0 0 0 0 0 0 0 d 1 1 d c c 0
    0 0 d b 1 1 1 1 3 c c c f c f c d b c d c c c c c c c c c c b b b b b b c c 6 6 6 6 9 9 9 6 b b 6 6 6 6 6 6 6 6 b c c 0 0 0 0 0 e b b b f b c b 1 b b b 0 0 0 0 0 0 0 d d d b b b 0
    0 0 1 b 9 b 8 d d f c c f c c f b b c b c c c c c c c c c c c c c c c c 6 6 6 6 6 8 8 8 8 6 8 8 6 6 6 6 6 c b b b c 0 0 0 0 0 0 0 f c b c c c b 0 0 c 0 0 0 0 0 0 0 d b b d b b 0 0
    0 0 1 8 8 6 b b 1 c c c c c f c c c c f f f f f f f f f c c f f f f f f f 8 8 6 6 8 6 6 b 8 8 8 c c c c b b b b c 0 0 0 0 0 0 0 0 c c b c c c b 0 0 0 0 0 0 0 0 0 d d 1 1 b b b 0 0
    0 0 1 b b 9 d b d c c c c c c c c c c c b b b c f f f c f c c c c c c f f f f c c c c c c c c c b b b b b b b c b 0 0 0 0 0 0 0 0 0 f c c c b b 0 0 0 0 0 0 0 0 d b 8 d b c b 0 0 0
    0 3 1 8 8 8 8 b d f f f c f c f c d b f c b 3 3 3 b f f f f c c c c c c c c c c c c c c c c b b b b b b b c c c 0 0 0 0 0 0 0 0 0 0 f c c c b b 0 0 0 0 0 0 0 d b b 1 d c b b 0 0 0
    0 b 1 d d d d 1 d f c c c c c b c b b f f f f c b 3 3 b c f f f f f f c c c c c c c c c c c b c b b b b c c c b c f c c c 0 0 0 0 c c f c c b c c 0 0 0 0 0 3 d 8 b d c b b b 0 0 0
    0 0 1 1 1 1 1 d b f c c b b b c f f b f f c c f f f c b 3 b 8 c f f f f f f f f f c c c c c f f c c c b c c c c f f f f c 0 0 0 b b c c f f f f c d 0 0 0 0 d b d 1 b c b b 0 0 0 0
    0 0 0 0 0 0 0 f f c c c b b b f c c 0 0 0 0 c c c c f f c c c 6 b b b c c c c c c c c b b 3 b b b b b b c b 0 0 0 0 0 0 0 0 0 0 c c c c c f c c b c c 0 0 d b 6 b b c b b b 0 0 0 0
    0 0 0 0 0 0 0 c c c c c b d b c c c 0 0 0 0 0 0 0 0 0 0 c f f c c b b b b b b b b b d d 1 3 3 b b b 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c f f c c c c b c f c 0 0 6 8 6 b c c b b 0 0 0 0 0
    0 0 0 0 0 0 0 c c c c c c b c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c c c b b c f c 0 0 d d d b c b b b 0 0 0 0 0
    0 0 0 0 0 0 0 c c c c c c c c c f c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c c c b b c c c 0 3 3 3 3 c f b b b 0 0 0 0 0
    0 0 0 0 0 0 0 c c c c c c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c c c c c c c c 0 b b b b c c c c 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 c c c c c c c c c 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 c c c c c c c c c 0 0 0 0 f c c 0 0 0 0 0 0 0 0 0
    `, OpponentSpawner, dragReductionFactor * randint(-25, -75), 0)
    scaling.scaleByPercent(OpponentRacer, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (raceStage > 1) {
        Enable_Drag_Reduction()
    }
})
function Enable_Drag_Reduction () {
    dragReductionState = 1
    DrsOverlay.setText("DRS")
    myRacer.setImage(assets.image`pink-player-drs`)
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (raceStage > 1) {
        Disable_Drag_Reduction()
    }
})
function Disable_Drag_Reduction () {
    dragReductionState = 0
    DrsOverlay.setText("")
    myRacer.setImage(assets.image`player-pink`)
}
function Update_Drag_Reduction_Factor () {
    if (dragReductionState == 0) {
        dragReductionFactor = Math.constrain(dragReductionFactor - 0.005, 1, 1.3)
    } else {
        dragReductionFactor = Math.constrain(dragReductionFactor + 0.005, 1, 1.3)
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
5. Create a new Function ``||functions:Enable_Drag_Reduction||``
___
6. Call the<br>
``||functions:Enable_Drag_Reduction||``<br>
function from inside the ``||logic:if||`` block we set up in parts 3 - 4.

```blocks
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (raceStage > 1) {
        Enable_Drag_Reduction()
    }
})
```

## {Step 2}
Enabling Drag Reduction
---
To show that speed boosting is occuring we need to add the following to the<br>
``||function:Enable_Drag_Reduction||`` function.
___
1. Using the ``||variables:Variables||`` category,<br>
Set ``||variables:dragReductionState||`` to **1**
___
2. Using the ``||textsprite:Text Sprite||`` category,<br>
Set ``||variables:DrsOverlay||`` to ``||textsprite:text||`` "**DRS**"
___
3. Using the ``||sprites:Sprites||`` category,<br>
``||variables:set sprite myRacer||`` to image to <br>
**pink-player-drs** in the **Gallery**.

```blocks
function Enable_Drag_Reduction () {
    dragReductionState = 1
    DrsOverlay.setText("DRS")
    myRacer.setImage(assets.image`pink-player-drs`)
}
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
► Change the **pressed** to **released**
___
3. Create an if block with the condition:<br>
``||logic:if||`` ``||variables:raceStage||`` ``||logic:> 1 then||``<br>
___
4. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||controller:on [ A ] button [ pressed ]||`` block.
___
5. Create a new Function ``||functions:Enable_Drag_Reduction||``
___
6. Call the<br>
``||functions:Disable_Drag_Reduction||``<br>
function from inside the ``||logic:if||`` block we set up in parts 3 - 4.

```blocks
controller.A.onEvent(ControllerButtonEvent., function () {
    if (raceStage > 1) {
        Disable_Drag_Reduction()
    }
})
```

## {Step 4}
Disabling Drag Reduction
---
To show that speed boosting is no longer occuring we need to add the following to the<br>
``||function:Disable_Drag_Reduction||`` function.
___
1. Using the ``||variables:Variables||`` category,<br>
Set ``||variables:dragReductionState||` to **0**
___
2. Using the ``||textsprite:Text Sprite||`` category,<br>
Set ``||variables:DrsOverlay||` to **""**
___
3. Using the ``||sprite:Sprites||`` category,<br>
Set ``||variables:myRacer||` image to **pink-player**

```blocks
function Disable_Drag_Reduction () {
    dragReductionState = 0
    DrsOverlay.setText("")
    myRacer.setImage(assets.image`player-pink`)
}
```

## {Step 5}
Creating the Drag Reduction Factor Function
---
At some fixed interval, we want to update the drag reduction factor.<br>
This will then, in turn, update the ``||variables:progressionVelocity||`` thanks to our formula in ``||functions:Update_Variables||``<br>
In order to do this, we can use the<br>
``||game:on game update every 25 ms||``<br>
we set up in activity 3
___
1. Create a new Function ``||functions:Update_Drag_Reduction_Factor||``
___
2. Call the<br>
``||functions:Update_Drag_Reduction_Factor||``<br>
function from inside the top of the<br>
``||logic:if raceStage = 2||`` block located inside the<br>
``||game:on game update every 25 ms||`` block.

```blocks
// @hide
function Update_Variables () {}
// @hide
function Update_Overlays () {}
function Update_Drag_Reduction_Factor () {}
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Drag_Reduction_Factor()
        Update_Variables()
        Update_Overlays()
    }
})
```

## {Step 5}
Altering the Drag Reduction Factor
---
1. Create an if **else** block with the condition:<br>
``||logic:if||`` ``||variables:dragReductionState||`` ``||logic:= 0 then||`` ||logic:else||``<br>
___
2. Place the ``||logic:if||`` block<br>
you just created into the <br>
``||functions:Update_Drag_Reduction_Factor||`` function.
___
3. Within the ``||logic:if||`` block write the following assignment:
``||variables:set dragReductionFactor to||``<br>
``||math:constrain||``<br>
``||variables:dragReductionFactor||`` ``||math:- 0.005||``<br>
``||math:between 1 and 1.3||``<br>
___
4. Within the ``||logic:else||`` block write the following assigment:
``||variables:set dragReductionFactor to||``<br>
``||math:constrain||``<br>
``||variables:dragReductionFactor||`` ``||math:+ 0.005||``<br>
``||math:between 1 and 1.3||``<br> 
___
Try playing the game. If you hold A (spacebar) during the race, 
you should notice the red DRS overlay your speed slowly increasing to a peak.

```blocks
function Update_Drag_Reduction_Factor () {
    if (dragReductionState == 0) {
        dragReductionFactor = Math.constrain(dragReductionFactor - 0.005, 1, 1.3)
    } else {
        dragReductionFactor = Math.constrain(dragReductionFactor + 0.005, 1, 1.3)
    }
}
```

## {Step 6}
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
function Update_Drag_Reduction_Factor () {}
// @hide 
function Update_Race_Parameters () {}
// @hide 
function Update_Text_Overlays () {}
function Run_Finishing_Sequence () {}
game.onUpdateInterval(25, function () {
    if (raceStage == 2) {
        Update_Drag_Reduction_Factor()
        Update_Race_Parameters()
        Update_Text_Overlays()
        if (distanceRemaining <= 0) {
            raceStage = 3
            Run_Finishing_Sequence()
        }
    }
})
```

## {Step 7}
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
4. Drag the <br>``||variables(sprites): set mySprite to sprite [ ] of kind Player||``<br>
block into the bottom of the<br>
``||functions:Run_Finishing_Sequence||`` function block.<br>
► Change the sprite **name** to ``||variables:FinishLine||``<br>
► Change the sprite **kind** to ``||sprites:Finish_Line||``<br>
Note: you will need to create a new kind.
___
5. Using the ``||sprites:Sprites||`` category,<br>
set the poition of the ``||variables:FinishLine||`` sprite to:<br>
``||sprites:x||`` **330**<br>
``||sprites:y||`` **60**<br>
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
    FinishLine = sprites.create(assets.image`finish-sprite`, SpriteKind.Finish_Line)
    FinishLine.setPosition(330, 60)
    scroller.scrollBackgroundWithSpeed(-50, 0)
    FinishLine.setVelocity(-50, 0)
}
```

## Step 8
Player Overlaps Finish Line
---
Now that our player will collide with a finish line sprite, we can use this event to trigger a game over sequence.
First we need to detect the collision.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:on sprite of Player overlaps otherSprite of kind Player||`` block.<br>
► Drag it into the workspace.
___
3. Click the second ``||sprites:Player||`` dropdown.<br>
Select ``||variables:Finish_Line||`` from the list.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Finish_Line, function (sprite, otherSprite) {
})
```

## Step 9
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Finish_Line, function (sprite, otherSprite) {
    info.setScore(timeSinceRaceStart)
    game.setGameOverScoringType(game.ScoringType.LowScore)
    game.setGameOverMessage(true, "YOU WIN!")
    game.gameOver(true)
})
```

## Step 10
CONGRATULATIONS!
---
You have completed the race into stem make code arcade racing tutorial.
