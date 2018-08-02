
const Balls = require('Balls')
const AimingLine = require('AimingLine')

cc.Class({
    extends: cc.Component,

    properties: {
        balls: {
            default: null,
            type: Balls
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        
        this.node.on('touchend', function (e) {
            self.balls.projectBalls(e.touch._point);
        });
    },

    start () {

    },

    // update (dt) {},
});
