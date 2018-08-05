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
            //碰碎
            util.breakBlock(this.node)

            GlobalEventSystem.notify(GlobalEvent.BLOCK_BREAK_ONE)
        }
    }

    // update (dt) {},
});
