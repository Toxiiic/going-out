
const Ball = require('Ball')
const AimingLine = require('AimingLine')

cc.Class({
    extends: cc.Component,

    properties: {
        ball: Ball,
        aimingLine: AimingLine,
        camera: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var self = this;
        this._touching = false
        this._touchPos = 0

        this.node.on('touchstart', e => {
            this._touching = true
            this._touchPos = this.getGoodTouchPos(e)
            this.aimingLine.activate()
        })
        this.node.on('touchmove', e => {
            this._touchPos = this.getGoodTouchPos(e)
        })
        this.node.on('touchend', e => {
            this._touching = false
            this.aimingLine.deactivate()
            this.ball.project(this.getGoodTouchPos(e))
        })
    },

    start () {

    },

    update (dt) {
        if(this._touching) {
            this.aimingLine.updateLine(this._touchPos, this.ball.node.getPosition())
        }
    },

    /**
     * 就是世界坐标（左下角为原点）的pos，本来是屏幕坐标
     */
    getGoodTouchPos(e) {
        let goodTouch = e.touch._point
        goodTouch.y += (this.camera.y-480)
        return goodTouch
    }
});
