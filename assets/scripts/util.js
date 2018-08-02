let util = {
    random: (min, max) => Math.random() * (max-min) + min,

    randomInt (min, max) { return parseInt(this.random(min, max)) },

    randomBool: () => Math.random() < .5,

    /**
     * block 破碎
     */
    breakBlock (blockNode) {
        //TODO 还是active = false？
        blockNode.scale = 0
        //散发粒子
    }
}

module.exports = util