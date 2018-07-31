
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {

    },

    /**
     * 依然假定能过它的只有主角collider
     */
    onCollisionEnter: function () {
        this.node.parent.opacity = 255
        this.node.parent.getComponent(cc.PhysicsBoxCollider).enabled = true
        // 告诉gameController过了一关

        this.getComponent(cc.BoxCollider).enabled = false
    },

    // update (dt) {},
});
