let util = {
    random: (min, max) => Math.random() * (max-min) + min,

    randomInt (min, max) { return parseInt(this.random(min, max)) },

    randomBool: () => Math.random() < .5
}

module.exports = util