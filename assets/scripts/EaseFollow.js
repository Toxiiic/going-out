
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 10,
        offset: 100,
        target: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.y = cc.lerp(this.node.y, this.target.y + this.offset, this.speed * dt)
    },
});
