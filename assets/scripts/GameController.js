const MapGenerator = require('MapGenerator')

cc.Class({
    extends: cc.Component,

    properties: {
        
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
    },
    

    start () {
        this.mapGenerator.generate()
    },

    // update (dt) {},
});
