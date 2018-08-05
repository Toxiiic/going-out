const MapGenerator = require('MapGenerator')
const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent

cc.Class({
    extends: cc.Component,

    properties: {
        blockColors:[cc.Color],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_pairBit
        // | cc.PhysicsManager.DrawBits.e_aabbBit
        // | cc.PhysicsManager.DrawBits.e_centerOfMassBit
        // | cc.PhysicsManager.DrawBits.e_jointBit
        // | cc.PhysicsManager.DrawBits.e_shapeBit
            // ;
        cc.director.getCollisionManager().enabled = true

        this.mapGenerator = this.getComponent(MapGenerator)
        this._score = 0

        //小球过关
        GlobalEventSystem.on(GlobalEvent.BALL_PASS_TARGET_LINE, payload => {
            console.log('passed the line & contorller knows', payload)
            let { targetLineNo } = payload

            //  && targetLineNo > 0
            if(targetLineNo % 3 == 0) {
                this.mapGenerator.onBallPassTargetLine()
            }
        })
    
    },
    

    start () {
        this.mapGenerator.generate()
    },

    // update (dt) {},
});
