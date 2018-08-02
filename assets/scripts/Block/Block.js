
const NBlock = require('NBlock')
const OneBlock = require('OneBlock')
const UnknownBlock = require('UnknownBlock')
const HeartBlock = require('HeartBlock')

const BlockType = cc.Enum({
    Unbreakable: 0,
    N: 1,
    One: 2,
    Unknown: 3,
    Heart: 4
})


cc.Class({
    extends: cc.Component,

    properties: {
        blockType: {
            default: BlockType.Unbreakable,
            type: cc.Enum(BlockType)
        }
        // blockType: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        switch (this.blockType) {
            case BlockType.Unbreakable:
                break
            case BlockType.N:
                this.addComponent(NBlock)
                break
            case BlockType.One:
                this.addComponent(OneBlock)
                break
            case BlockType.Unknown:
                this.addComponent(UnknownBlock)
                break
            case BlockType.Heart:
                this.addComponent(HeartBlock)
                break
        }
    },


    start () {

    },

    // update (dt) {},
});
