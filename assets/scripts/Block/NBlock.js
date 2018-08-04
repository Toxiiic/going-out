const util = require('./util')

cc.Class({
    extends: cc.Component,

    properties: {
        n: 5,
    },


    onLoad () {
        this._remainN = this.n
    },

    start () {

    },

    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == 'Ball') {
            
            this._remainN --
            if(this._remainN == 0) {
                //碰碎
                util.breakBlock(this.node)
                
            } else {
                // 拿到label，改变文本
                // this.getComponentInChildren(cc.Label).string = this._remainN
            }
        }
    }

    // update (dt) {},
});
