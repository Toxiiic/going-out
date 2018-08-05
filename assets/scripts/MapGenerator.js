const util = require('util')
const TargetLineCollController = require('PassColliderController')

const actionConfigs = [{
    actionFn: cc.moveBy, //move只能by，参数动态
    randomFn: util.random,
    getBackArgs: (args) => [args[0], -args[1], -args[2]],
    argRanges: [{
        min: 2,
        max: 5
    }, {
        min: 50,
        max: 150
    }, {
        min: 50,
        max: 150
    }]
}, {
    actionFn: cc.rotateBy, //rotate可by可to，可动可静
    randomFn: util.random,
    getBackArgs: (args) => [[args[0]], -args[1]],
    argRanges: [{
        min: 2,
        max: 5
    }, {
        min: 0,
        max: 360
    }]
}, {
    actionFn: cc.scaleBy, //可by可to，by需要是倒数，但by好一些，不需要管初始scale
    randomFn: util.random,
    getBackArgs: (args) => [args[0], 1/args[1], 1/args[2]],
    argRanges: [{
        min: 1,
        max: 2
    }, {
        min: 0.5,
        max: 5
    }, {
        min: 0.5,
        max: 5
    }]
}]

const maxAct = 3
const minAct = 0

/**
 * 没有用到 cc.delayTime
    cc.reverseTime
    cc.bezierBy()
    cc.catmullRomBy
    四大变换自由组合其中0-4种（看性能吧）
*/
const getActionInfo = () => {
    let actIndexes = util.randomNums(minAct, maxAct)
    return actIndexes.map(actIndex => {
        let {actionFn, randomFn, argRanges, getBackArgs} = actionConfigs[actIndex]
        let args = argRanges.map(argRange => {
            return randomFn(argRange.min, argRange.max)
        });
        let backArgs = getBackArgs(args)
        return {
            actionFn,
            args,
            backArgs
        }
    });
}
/**
 * 因为action没法重用，只好让action信息重用，每次重新根据它们重新生成action
*/
const runActionByActionInfo = (node, actionInfos, speed) => {

    let actions = actionInfos.map(actInfo => {
        let { actionFn, args, backArgs } = actInfo
        
        return cc.sequence(
            actionFn.apply(null, args).easing(cc.easeCubicActionInOut()),
            actionFn.apply(null, backArgs).easing(cc.easeCubicActionInOut())
        )
    });
    if(actions.length > 1) {
        node.runAction(cc.spawn(...actions).repeatForever().speed(speed))
    } else if (actions.length == 1) {
        node.runAction(actions[0].repeatForever().speed(speed))
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        levelPadding: 200,
        firstTargetLineNo: 3,
        blocks: cc.Node,
        targetLineRoot: cc.Node,
        fragPrefabs: [cc.Prefab],
        targetLinePrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.generators = [
            this.generateFragments,
            this.generateNormal,
            this.generateMaze,
            this.generateDam
        ]

        this._lastYPos = 3200
        this._targetLineNo = this.firstTargetLineNo
    },
    start () {

    },
    onBallPassTargetLine () {
        this.generateLevels(3)
    },
    generateLevels(amount) {
        for(let i=0; i<amount; i++) {
            this.generate()
        }
    },
    generate () {
        //新建targetLine
        let targetLineNode = cc.instantiate(this.targetLinePrefab)
        this.targetLineRoot.addChild(targetLineNode)
        targetLineNode.getComponentInChildren(TargetLineCollController).targetLineNo = this._targetLineNo
        this._lastYPos = targetLineNode.y = this._lastYPos + this.levelPadding
        targetLineNode.x = 270
        this._targetLineNo ++

        this.generateFragments(this._lastYPos + this.levelPadding)
    },

    generateFragments (startY) {
        let configOpts = {
            row: util.randomInt(5, 6), //几行，y相关
            col: util.randomInt(4, 6), //几列，x相关
            rowOffset: util.randomInt(-5, 5), //某一行偏移量，x相关
            colOffset: util.randomInt(0, 100) //某一列偏移量，y相关
        }
        console.log(configOpts)
        let fragPrefab1 = this.fragPrefabs[util.randomInt(0, this.fragPrefabs.length)]
        let fragPrefab2 = this.fragPrefabs[util.randomInt(0, this.fragPrefabs.length)]

        //TODO
        // let startY = this._lastYPos

        //屏幕宽度 横向个数 => 间距
        //间距 竖向个数 => 竖向总高
        //横向数量少一个，间距大一些，两侧可以顶到头
        let margin = 540 / (configOpts.col-1)

        //run什么样的action
        let actionInfo = getActionInfo()
        console.log(actionInfo)
        //全局speed
        // let speed = randomBool() ? 1 : random(0.5, 3)
        let speed = 1
        
        let frag = null
        for(let row=0; row<configOpts.row; row++) {
            for(let col=0; col<configOpts.col; col++) {

                //根据位置挑一个prefab
                let prefab = col%2!=0 && row%2!=0 ? fragPrefab1 : fragPrefab2

                frag = cc.instantiate(prefab)
                this.blocks.addChild(frag)

                frag.setPosition(col*margin+row*configOpts.rowOffset, row*margin+col*configOpts.colOffset + startY)
                
                runActionByActionInfo(frag, actionInfo, speed)
                // frag.runAction(getAction(actionInfo, speed))
            }
        }
        //最后一个frag的y位置
        this._lastYPos = frag.y
    },
    generateMaze () {
        
    },
    generateNormal () {

    },
    generateDam () {

    }
    

    // update (dt) {},
});
