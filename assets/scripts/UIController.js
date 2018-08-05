const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent

const getAppearAction = () => cc.scaleTo(1, 1).easing(cc.easeBackOut())
const getDisappearAction = () => cc.spawn(
    cc.moveBy(1, 30, -160),
    cc.rotateBy(1, 180),
    cc.fadeOut(1)
).easing(cc.easeCubicActionIn())

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        heartRoot: cc.Node,
        heartPrefab: cc.Prefab
    },

    onLoad () {
        this._heartList = []

        GlobalEventSystem.on(GlobalEvent.SCORE_CHANGE, ({score}) => {
            this.scoreLabel.string = score
        })

        GlobalEventSystem.on(GlobalEvent.HEART_CHANGE, ({deltaHeart, heart}) => {

            for(let i=0; i<Math.abs(deltaHeart); i++) {
                //i：当前是第几个heart，从0开始算
                if(deltaHeart > 0) {
                    this.addHeart()
                } else {
                    this.reduceHeart()
                }
            }
        })

        this.addHeart()
        this.addHeart()
        this.addHeart()
    },

    addHeart () {
        let heart = cc.instantiate(this.heartPrefab)
        this._heartList.push(heart)
        this.heartRoot.addChild(heart)
        heart.x += (this._heartList.length-1) * 22
        
        heart.scale = 0
        heart.runAction(getAppearAction())
    },
    reduceHeart () {
        this._heartList[this._heartList.length-1].runAction(getDisappearAction())
        this._heartList.pop()
    },

    start () {

    },

    // update (dt) {},
});
