
const Ball = require('Ball')
const AimingLine = require('AimingLine')

cc.Class({
    extends: cc.Component,

    properties: {
        ball: Ball,
        aimingLine: AimingLine
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var self = this;
        
        // this.node.on('touchstart', e => {
        //     aimingLine.upDateLines(e.touch._point)
        // })
        
        this.node.on('touchend', e => {
            this.ball.project(e.touch._point)
        })
    },

    start () {

    },

    // update (dt) {},
});
