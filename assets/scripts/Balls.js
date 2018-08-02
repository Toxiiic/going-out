
// cc.Class({
//     extends: cc.Component,

//     properties: {
//         ballRBs: [cc.RigidBody],
//         camera: cc.Node,
//         forceMagnification: 70
//     },

//     // LIFE-CYCLE CALLBACKS:

//     onLoad () {
//         // this._ballRigidBodies = [];
//         // this._ballRigidBodies.push(this.ballRBs);
//     },

//     start () {
//     },

//     projectBalls: function (touchPoint) {

//         this.ballRBs.forEach(rb => {
//             let goodTouch = touchPoint.sub(cc.v2(270, 480))
//             goodTouch.y += this.camera.y
//             var force = goodTouch.sub(rb.node.position);
            
//             // console.log(goodTouch, rb.node.position);
            
//             rb.applyForceToCenter(force.mulSelf(this.forceMagnification));
//         });
//     }

//     // update (dt) {},
// });
