const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent

cc.Class({
    extends: cc.Component,

    properties: {
        forceMagnification: 70,
        particlePrefab: cc.Prefab,
        particles: cc.Node //TODO放在池子统一的父元素里
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._rb = this.getComponent(cc.RigidBody)
        this._camera = cc.find('Canvas/BottomCenter/Camera')
        //两次project之间碰撞次数，用来计算分数
        this._comboTimes = 0
    },

    start () {

    },

    /**
     * 弹出去
     * @param {*} touchPoint 
     */
    project (goodTouchPos) {
        // let goodTouch = touchPoint.sub(cc.v2(270, 480))
        // goodTouch.y += this._camera.y
        // var force = goodTouch.sub(this.node.position);
        let force = goodTouchPos.sub(this.node.position);
        
        this._rb.applyForceToCenter(force.mulSelf(this.forceMagnification));
    
        GlobalEventSystem.notify(GlobalEvent.BALL_PROJECT, {
            ballNode: this.node
        })

        this._comboTimes = 0
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {

        this._comboTimes ++

        //粒子
        let ptc = cc.instantiate(this.particlePrefab).getComponent(cc.ParticleSystem)
        this.particles.addChild(ptc.node)
        ptc.node.setPosition(contact.getWorldManifold().points[0])
        ptc.startColor = otherCollider.node.color
        ptc.endColor = otherCollider.node.color

        // let ptc2 = cc.instantiate(this.particlePrefab).getComponent(cc.ParticleSystem)
        // this.particles.addChild(ptc2.node)
        // ptc2.node.setPosition(contact.getWorldManifold().points[0])
        // ptc2.startColor = this.node.color
        // ptc2.endColor = this.node.color
        // ptc2.emissionRate = 50

        GlobalEventSystem.notify(GlobalEvent.BALL_COLL, {
            ballNode: this.node,
            comboTimes: this._comboTimes
        })
    },
    // update (dt) {},
});
