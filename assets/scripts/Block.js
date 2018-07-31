
const BlockType = cc.Enum({
    Unbreakable: 0,
    NTimesBreak: 1,
    OneTimesBreak: 2,
    UnknownTimesBreak: 3,
    OneCollOneHeart: 4
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

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
