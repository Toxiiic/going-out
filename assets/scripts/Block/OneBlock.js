const util = require('./util')

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
        }
    }

    // update (dt) {},
});
