
cc.Class({
    extends: cc.Component,

    properties: {
        ballTarget: cc.Node
    },


    // onLoad () {},

    start () {
        // this.node.runAction(cc.follow(this.ballTarget))
    },

    update (dt) {
        // console.log(this.node.x, this.node.y)
        this.node.setPosition(this.ballTarget.getPosition())
    },
});
