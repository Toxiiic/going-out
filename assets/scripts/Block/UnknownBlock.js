const util = require('./util')

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        //随机生成消失次数
    },

    start () {

    },

    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == 'ball') {
            //碰碎
            util.breakBlock(this.node)
        }
    }

    // update (dt) {},
});
