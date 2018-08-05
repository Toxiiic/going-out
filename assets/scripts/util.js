let util = {
    random: (min, max) => Math.random() * (max-min) + min,

    randomInt (min, max) { return parseInt(this.random(min, max)) },

    randomBool: () => Math.random() < .5,

    /**
     * min/maxAmount：取出的数量范围
     * min/maxVal：取出的值的范围，此范围大小不得小于上面数量范围最小值，否则死循环
     * 不保证顺序
     */
    randomNums (minAmount, maxAmount, minVal=minAmount, maxVal=maxAmount) {
        if(maxVal-minVal < minAmount) {
            console.warn('maxVal-minVal 不得< minAmount')
        }
        
        let amount = this.randomInt(minAmount, maxAmount)
        let result = new Array(amount)
        for (let i=0; i < amount; i++) {
            let val = this.randomInt(minVal, maxVal)
            if(result.includes(val)) {
                i--
                continue
            }
            result[i] = val
        }
        return result
    },

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