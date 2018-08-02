// Learn cc.Clas
cc.Class({
    extends: cc.Component,

    properties: {
        particlePrefab: cc.Prefab,
        particles: cc.Node //TODO放在池子统一的父元素里
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
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

        //碰撞
        // otherCollider.getComponent()
        // if() {

        // }
    },
    // update (dt) {},
});
