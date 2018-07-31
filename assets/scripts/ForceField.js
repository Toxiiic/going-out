const deg2rad = 0.01745

cc.Class({
    extends: cc.Component,

    properties: {
        forceMgn: 10, //力的大小
        forceAngle: 0,//力的方向
        ballRB: cc.RigidBody
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //计算力的弧度
        let rad = this.forceAngle * deg2rad
        //计算力的向量表示
        this.force = cc.v2(this.forceMgn * Math.cos(rad), this.forceMgn * Math.sin(rad))
    },

    start () {

    },

    /**
     * 为了提高性能，这里假定，能进入这个碰撞范围的coll，只有小球
     */
    onCollisionStay: function (otherColl) {
        // otherColl.node.parent.getComponent(cc.RigidBody).applyForceToCenter(this.force)
        this.ballRB.applyForceToCenter(this.force)
    },

    // update (dt) {},
});
