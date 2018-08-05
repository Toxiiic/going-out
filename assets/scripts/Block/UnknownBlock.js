const util = require('./util')
const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent

cc.Class({
    extends: cc.Component,

    properties: {
        minN: 4,
        maxN: 8
    },


    onLoad () {
        //随机生成消失需要打击次数，_n不能改变
        this._n = util.randomInt(minN, maxN)
        this._remainN = this._n
    },

    start () {

    },

    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == 'ball') {
            this._remainN --
            if(this._remainN == 0) {
                //碰碎
                util.breakBlock(this.node)

                GlobalEventSystem.notify(GlobalEvent.BLOCK_BREAK_UNKNOWN, {
                    n: this._n
                })
            }
        }
    }

    // update (dt) {},
});
