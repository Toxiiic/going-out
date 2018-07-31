const util = require('util')

cc.Class({
    extends: cc.Component,

    properties: {
        blocks: cc.Node,
        fragPrefabs: [cc.Prefab]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.generators = [
            this.generateFragments,
            this.generateNormal,
            this.generateMaze,
            this.generateDam
        ]
    },
    start () {

    },
    generate () {
        // for(let i=0; i<10; i++) {
        //     let generatorIndex = util.randomInt(0, this.generators.length)
        //     this.generators[generatorIndex]()
        //     console.log(generatorIndex)
        // }
        this.generateFragments()
    },

    generateFragments () {
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
        let startY = 2200

        //屏幕宽度 横向个数 => 间距
        //间距 竖向个数 => 竖向总高
        //横向数量少一个，间距大一些，两侧可以顶到头
        let margin = 540 / (configOpts.col-1)
        
        let prefab = null
        for(let row=0; row<configOpts.row; row++) {
            for(let col=0; col<configOpts.col; col++) {

                //根据位置挑一个prefab
                prefab = col%2!=0 && row%2!=0 ? fragPrefab1 : fragPrefab2

                let frag = cc.instantiate(prefab)
                this.blocks.addChild(frag)

                frag.setPosition(col*margin+row*configOpts.rowOffset, row*margin+col*configOpts.colOffset + startY)
            }
        }
    },
    generateMaze () {
        
    },
    generateNormal () {

    },
    generateDam () {

    }
    

    // update (dt) {},
});
