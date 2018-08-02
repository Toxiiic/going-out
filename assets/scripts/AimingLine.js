const MaxDistance = cc.v2(540, 960).mag()

cc.Class({
    extends: cc.Component,

    properties: {
        dotAmount: 10,
        minScale: .1,
        dotPrefab: cc.Prefab
    },

    onLoad () {
        //根据映射关系（线性函数）得到计算scale的式子，提出固定部分
        this._scaleFactor = MaxDistance / (this.minScale-1)
        this._dots = new Array(this.dotAmount)

        for(let i=0; i<this.dotAmount; i++) {
            this._dots[i] = cc.instantiate(this.dotPrefab)
            this.node.addChild(this._dots[i])
        }

        //默认不显示
        this.deactivate()
    },

    start () {

    },

    activate () {
        this.node.scale = 1
    },
    deactivate () {
        this.node.scale = 0
    },
    updateLine (touchPos, ballPos) {
        //根据两点距离计算dot的scale，越远越小
        //当距离是屏幕斜对角线时为最小值，最近时为1
        let newScale = touchPos.sub(ballPos).mag() / this._scaleFactor + 1
        let newPos = null
        this._dots.forEach((dot, index) => {
            //插值出这个dot的位置
            newPos = ballPos.lerp(touchPos, (index+1)/this.dotAmount)
            dot.setPosition(newPos)
            dot.scale = newScale
        });
    }

    // update (dt) {},
});
