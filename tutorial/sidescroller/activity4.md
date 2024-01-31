# Enemies

```template
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
    dragReductionState = 0
    dragReductionFactor = 1
    racerLaunched = 0
    nextOpponentSpawnTime = 0
}
function Initialize_Objects () {
    OpponentSpawner = sprites.create(assets.image`temp1`, SpriteKind.Projectile_Spawner)
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
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
function Spawn_Opponent () {
    OpponentSpawner.setPosition(180, randint(13, 108))
    OpponentRacer = sprites.createProjectileFromSprite(assets.image`opponent-blue`, OpponentSpawner, dragReductionFactor * randint(-25, -75), 0)
    scaling.scaleByPercent(OpponentRacer, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
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
let dragReductionState = 0
let racerLaunched = 0
let distanceRemaining = 0
let dragReductionFactor = 0
let timeSinceRaceStart = 0
let raceStage = 0
let enableText = "" + 5
let enableFloorDiv = Math.idiv(10, 3)
ElapsedTimeOverlay = textsprite.create("", 0, 1)
ElapsedTimeOverlay.setText("HELLO")
myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
progressionVelocity = dragReductionFactor * Math.constrain(myRacer.x, 0, 120)
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
2. Drag the <br>``||variables(sprites): set mySprite to sprite [ ] of kind Player||``<br>
block into the bottom of the<br>
``||functions:Initialize_Objects||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Click ``||variables:New variable...||``, and change the name to ``||variables:OpponentSpawner||``
___
4. Click the ``||sprites:Player||`` dropdown.<br>
Click ``||sprites:Add a new kind...||``, and change the name to ``||sprites:Opponent_Spawner||``

```blocks
function Initialize_Objects () {
    myRacer = sprites.create(assets.image`player-pink`, SpriteKind.Player)
    myRacer.setStayInScreen(true)
    scaling.scaleByPercent(myRacer, -85, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    controller.moveSprite(myRacer, 75, 75)
    OpponentSpawner = sprites.create(assets.image`temp1`, SpriteKind.Opponent_Spawner)
}
```


## {Step 2}
The forever block
---
The ``||loops:forever||`` will begin running in a loop after ``||loops:on start||`` completes, 
and will not stop until the race has finished.<br>
We will use this block to generate enemies during the race.
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
Create and Call Spawn_Opponents Function
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
We will be pausing for a random amount of time to add a layer of complexity for players.
___
1. Click the ``||loops:Loops||`` category.
___
2. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Update_Variables||`` function block.<br>
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
2. Drag the <br>``||sprites(variables): set mySprite position to x 0 y 0||``<br>
block into the<br>
``||functions:Spawn_Opponents||`` function block.
___
3. Click the ``||sprites:mySprite||`` dropdown.<br>
Change the name to ``||variables:OpponentSpawner||``
___
4. Click the ``||sprites:x||`` **0** value:<br>
Change it to **180**
___
5. Click the ``||sprites:y||`` **0** value:<br>
Change it to the expression<br>
``||math:pick random 13 to 108||``

```blocks
function Spawn_Opponent () {
    OpponentSpawner.setPosition(180, randint(13, 108))
}
```

## {Step 7}
Creating the opponent racer
---
Now that the spawner has been placed outside of our view on the right hand side at some random height, 
we can create the opponent sprite.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Drag the <br>``||sprites:set projectile to projectile from mySprite with vx 50 vy 50||``<br>
block into the bottom of the<br>
``||functions:Spawn_Opponents||`` function block.
___
3. Click the ``||variables:projectile||`` dropdown.<br>
Click ``||variables:New variable...||``, and change the name to ``||variables:OpponentRacer||``
___
4. Click the grey box after ``||sprites:projectile||``<br>
► Click the **Gallery** tab<br>
► Click the racecar image named **opponent-blue**<br>
► Click ``||loops:Done||``<br>
Note: The name of a gallery asset can be determined by hovering the mouse over the asset for approximately 2 seconds.
___
5. Click the ``||variables:mySprite||`` dropdown.<br>
Change the name to ``||sprites:OpponentSpawner||``
___
6. Click the ``||sprites:vx||`` **50** value:<br>
Change it to the expression:<br>
``||variables:dragReductionFactor||``<br>
``||math:x||``<br>
``||math:pick random -25 to -75||``
___
7. Click the ``||sprites:vy||`` **50** value:<br>
Change it to **0**

```blocks
function Spawn_Opponent () {
    OpponentSpawner.setPosition(180, randint(13, 108))
    OpponentRacer = sprites.createProjectileFromSprite(assets.image`opponent-blue`, OpponentSpawner, dragReductionFactor * randint(-25, -75), 0)
}
```

## {Step 8}
Size the opponent racer
---
The opponent racer has been placed, but is too big. Lets downscale them.
___
1. Click the ``||scaling:Scaling||`` category.
___
2. Drag the <br>``||scaling(sprites): change mySprite scale by 50 percent uniformly anchor middle||`` block into 
bottom of the ``||functions:Spawn_Opponent||`` function block.
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Select ``||variables:OpponentRacer||`` from the list.
___
4. Change the **50** scaling value to **-50**.<br>
We make the value negative as we want to shrink the size of our ``||variables:OpponentRacer||`` art.
___
When you play the game, enemies will now spawn.<br>
Give it a try!

```blocks
function Spawn_Opponent () {
    OpponentSpawner.setPosition(180, randint(13, 108))
    OpponentRacer = sprites.createProjectileFromSprite(assets.image`opponent-blue`, OpponentSpawner, dragReductionFactor * randint(-25, -75), 0)
    scaling.scaleByPercent(OpponentRacer, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
}
``` 

## {Step 9}
Player to Enemy Hit Detection
---
There is currently no hit detection between our player racer and the opponent racers.<br>
This means that we will phase straight through enemies without crashing.<br>
Lets fix that.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:on sprite of Player overlaps otherSprite of kind Player||`` block.<br>
► Drag it into the workspace.
___
3. Click the second ``||sprites:Player||`` dropdown.<br>
Select ``||variables:Projectile||`` from the list.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
})
```

## {Step 10}
Destroy the sprites on Crash
---
After the sprites collide we want to destroy both.
___
1. 1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 9.<br>
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Click ``||variables:New variable...||``, and change the name to ``||variables:sprite||``
___
4. Click the ``||sprites:+||`` icon.<br>
Choose any effect you desire.<br>
I picked fire!
___
5. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 9.<br>
___
6. Click the ``||variables:mySprite||`` dropdown.<br>
Click ``||variables:New variable...||``, and change the name to ``||variables:otherSprite||``
___
7. Click the ``||sprites:+||`` icon.<br>
Choose any effect you desire.<br>

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
})
```

## {Step 11}
Update Race stage then Pause
---
1. Click the ``||variables:Variables||`` category.
___
2. Grab the <br>``||variables: set raceStage to 0||`` block.<br>
 ► Drag it into the bottom of the<br>
 ``||sprite collision||`` block made in step 9.<br>
 ► Change the **0** to **4**
___
3. Click the ``||loops:Loops||`` category.
___
4. Grab the <br>
``||loops:pause 100 ms||`` block.<br>
 ► Drag it into the bottom of the<br>
 ``||sprite collision||`` block made in step 9.<br>
 ► Change the **100 ms** to **1000 ms**

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(myRacer, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    raceStage = 4
    pause(1000)
})
```

## {Step 12}
Display Game Over
---
1. Create the following statements:<br>
► ``||game:use message "FALSE START" for <LOSE>||``<br><br>
► ``||game:game over <LOSE>||``<br><br>
___
2. Drag them into the bottom of the<br>
 ``||sprite collision||`` block made in step 9.<br>

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

## {Step 13}
Enemy to Enemy Hit Detection
---
There is currently no hit detection when 2 opponents collide.<br>
This means that opponents will phase straight through one another without crashing.<br>
Lets fix that.
___
1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:on sprite of Player overlaps otherSprite of kind Player||`` block.<br>
► Drag it into the workspace.
___
3. Click the first ``||sprites:Player||`` dropdown.<br>
Select ``||variables:Projectile||`` from the list.
___
4. Click the second ``||sprites:Player||`` dropdown.<br>
Select ``||variables:Projectile||`` from the list.

```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
})
```

## {Step 14}
Destroy the sprites on Crash
---
After the sprites collide we want to destroy both.
___
1. 1. Click the ``||sprites:Sprites||`` category.
___
2. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 13.<br>
___
3. Click the ``||variables:mySprite||`` dropdown.<br>
Click ``||variables:New variable...||``, and change the name to ``||variables:sprite||``
___
4. Click the ``||sprites:+||`` icon.<br>
Choose any effect you desire.<br>
___
5. Grab the <br>
``||sprites:destroy mySprite||`` block.<br>
► Drag it into the bottom of the<br>
``||sprite collision||`` block made in step 13.<br>
___
6. Click the ``||variables:mySprite||`` dropdown.<br>
Click ``||variables:New variable...||``, and change the name to ``||variables:otherSprite||``
___
7. Click the ``||sprites:+||`` icon.<br>
Choose any effect you desire.<br>

```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
})
```