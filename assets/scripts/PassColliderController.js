const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {

    },

    start () {

    },

    /**
     * 依然假定能过它的只有主角collider
     */
    onCollisionEnter: function () {
        this.node.parent.opacity = 255
        this.node.parent.getComponent(cc.PhysicsBoxCollider).enabled = true
        
        // 过了一关
        GlobalEventSystem.notify(GlobalEvent.BALL_PASS_TARGET_LINE, {
            targetLineNode: this.node.parent
        })

        this.getComponent(cc.BoxCollider).enabled = false
        //TODO 销毁自己
    },

    // update (dt) {},
});
