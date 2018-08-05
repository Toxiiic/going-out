const util = require('./util')
const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent


cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start () {

    },

    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == 'Ball') {
            GlobalEventSystem.notify(GlobalEvent.BLOCK_HEART_COLL)
        }

    }

    // update (dt) {},
});
