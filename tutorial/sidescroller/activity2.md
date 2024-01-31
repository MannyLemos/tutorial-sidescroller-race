# The Final Countdown

```template
function Initialize_Variables () {
    distanceRemaining = 1500
    raceStage = 0
    dragReductionState = 0
    dragReductionFactor = 1
    racerLaunched = 0
    nextOpponentSpawnTime = 0
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
let myRacer = null
Initialize_Variables()
Initialize_Objects()

```

```ghost
function Initialize_Variables () {
    raceStage = 0
    dragReductionFactor = 1
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
let dragReductionState = 0
let racerLaunched = 0
let distanceRemaining = 0
let dragReductionFactor = 0
let timeSinceRaceStart = 0
let raceStage = 0
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()

```

## {Step 1}
Creating the Race_Countdown Function
---
Lets create a function named Race_Countdown. It will be used to store the countdown animation that play before our race begins.
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Click ``||arrays:Make a Function...||``.
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
Calling Race_Countdown Function
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
Race_Countdown Frame 1
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
Race_Countdown Frame 2
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
Race_Countdown Frame 3
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
Race_Countdown Frame 4
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
Race_Countdown Frame 5
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
Race_Countdown Frame 6
---
The sixth frame shows 5 lights turned on.<br>
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
Race_Countdown Frame 7
---
The seventh frame shows 0 lights turned on and a prompt for users to **Press B**.<br>
This frame is **IMPORTANT**<br>
It marks the very instant that the race begins.<br>
Pay attention to ``||variables:raceStage||`` being set and how we await ``||variables:racerLaunched = 1||``.<br>
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
► Change the assignment to ``||game:time since start (ms)||``<br>
NOTE:<br>
``||game:time since start (ms)||``<br>
can be found in ``||game:Game||`` category.<br>
___
9. Click the ``||loops:Loops||`` category.
___
8. Grab the <br>``||loops:pause until <true>||`` block.<br>
► Drag it into the bottom of the<br>
``||functions:Race_Countdown||`` function block.<br>
► Change the ``||logic:true||`` to:<br>
``||logic:racerLaunched = 1||``<br>
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
3. Using the <br>
``||logic:Logic||`` → ``||logic:0 = 0||``<br>
and<br>
``||variables:Variables||`` → ``||variables:raceStage||``<br>
Create the following: <br>
``||logic:if (raceStage = 1) then||``
___
4. Inside this if statement perform:<br>
``||variables:set racerLaunched to 1||``<br><br>
``||variables:set loopStartTime to||`` ``||game:time since start (ms)||``<br><br>
NOTE:<br>
``||variables:loopStartTime||`` is a new variable.<br><br>
``||game:time since start (ms)||``<br>
can be found in ``||game:Game||`` category.<br>
___
5. Click the ``||logic:+||`` at the bottom of the ``||logic:if else||`` block.<br>
The ``||logic:else||`` should turn into an ``||logic:else if <statement>||``
___
6. Using the <br>
``||logic:Logic||`` → ``||logic:0 = 0||``<br>
and<br>
``||variables:Variables||`` → ``||variables:raceStage||``<br>
Create the following: <br>
``||logic:else if (raceStage = 0) then||``
___
7. Inside this else if statement create:<br>
► ``||variables:set raceStage = 3||``<br><br>
► ``||game:use message "FALSE START" for <LOSE>||``<br><br>
► ``||game:game over <LOSE>||``<br><br>
NOTE: <br>
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
Creating the Initialize_Overlays Function
---
Lets create a function named Initialize_Overlays.<br>
Text overlays will be used to display gametime metrics.
___
1. Expand the ``||advanced:Advanced||`` dropdown.
___
2. Click the ``||functions:Functions||`` category.
___
3. Click ``||arrays:Make a Function...||``.
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
Calling Initialize_Overlays Function
---
Lets call ``||functions:call Initialize_Overlays||`` at the end of our ``||loops:on start||`` block..
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
Creating ElapsedTimeOverlay
---
Lets create ``||variables:ElapsedTimeOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will display the time that has passed since the race countdown finished.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||textsprite:set textSprite to text sprite "" +||`` block.<br>
► Drag it into the ``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:ElapsedTimeOverlay||``.<br>
Note: This is a new variable.
___
4. Click the ``||sprites:Sprites||`` category.
___
5. Grab the <br>
``||sprites:set mySprite position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Ensure **x** = **0**<br>
► Ensure **y** = **8**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:ElapsedTimeOverlay||``.

```blocks
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
}
```

## {Step 15}
Creating VelocityOverlay
---
Lets create ``||variables:VelocityOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will display the current racecar velocity.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||textsprite:set textSprite to text sprite "" +||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:VelocityOverlay||``.
___
4. Click the ``||sprites:Sprites||`` category.
___
5. Grab the <br>
``||sprites:set mySprite position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Ensure **x** = **125**<br>
► Ensure **y** = **8**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:VelocityOverlay||``.

```blocks
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("0", 0, 1)
    VelocityOverlay.setPosition(125, 8)
}
```

## {Step 16}
Creating RemainingDistanceOverlay
---
Lets create ``||variables:RemainingDistanceOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will display the distance remaining before the race finishes.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||textsprite:set textSprite to text sprite "" +||`` block.<br>
► Drag it into the bottom of the``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:RemainingDistanceOverlay||``.
___
4. Click the ``||sprites:Sprites||`` category.
___
5. Grab the <br>
``||sprites:set mySprite position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Ensure **x** = **75**<br>
► Ensure **y** = **8**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:RemainingDistanceOverlay||``.

```blocks
function Initialize_Overlays () {
    ElapsedTimeOverlay = textsprite.create("", 0, 1)
    ElapsedTimeOverlay.setPosition(0, 8)
    VelocityOverlay = textsprite.create("0", 0, 1)
    VelocityOverlay.setPosition(125, 8)
    RemainingDistanceOverlay = textsprite.create("", 0, 1)
    RemainingDistanceOverlay.setPosition(75, 8)
}
```

## {Step 17}
Creating DrsOverlay
---
Lets create ``||variables:DrsOverlay||`` in our ``||functions:Initialize_Overlays||`` function.<br>
This overlay will be present when the DRS speed boost is active.
___
1. Click the ``||textsprite:TextSprite||`` category.
___
2. Grab the <br>
``||textsprite:set textSprite to text sprite "" +||`` block.<br>
► Drag it into the bottom of the``||functions:Initialize_Overlays||`` function.
___
3. Change the name of<br>
``||variable:textSprite||``<br>
to<br>
``||variables:DrsOverlay||``.
___
4. Click the ``||variable:textSprite||`` to ``||variables:DrsOverlay||``.
___
4. Click the ``||textsprite:+||``<br>
► Click the second white box and change it to **RED**.
___
5. Grab the <br>
``||sprites:set mySprite position to x 0 y 0||`` block.<br>
► Drag it into the bottom of the ``||functions:Initialize_Overlays||`` function.<br>
► Ensure **x** = **0**<br>
► Ensure **y** = **17**
___
6. Change the name of<br>
``||variable:mySprite||``<br>
to<br>
``||variables:DrsOverlay||``.

```blocks
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
Initialize_Variables()
Race_Countdown()
Initialize_Objects()
Initialize_Overlays()
```