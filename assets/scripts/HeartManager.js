const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent


const PASS_TARGET_LINE_SCORE = 1

let _heart = 3

GlobalEventSystem.on(GlobalEvent.BLOCK_HEART_COLL, () => {
    changeHeart(1)
})
GlobalEventSystem.on(GlobalEvent.BALL_PASS_TARGET_LINE, () => {
    changeHeart(PASS_TARGET_LINE_SCORE)
})
GlobalEventSystem.on(GlobalEvent.BALL_PROJECT, () => {
    changeHeart(-1)
})


const changeHeart = deltaHeart => {
    _heart += deltaHeart

    GlobalEventSystem.notify(GlobalEvent.HEART_CHANGE, {
        heart: _heart,
        deltaHeart
    })
}