const GlobalEventSystem = require('GlobalEventSystem')
const GlobalEvent = GlobalEventSystem.GlobalEvent

const MaxBallCollScore = 2000

const EventScoreMap = {
    'BALL_PASS_TARGET_LINE': 66,
    'BLOCK_BREAK_ONE': 6,
}

const EventSettingMap = {
    GAME_START () {
        _score = 0
    },
    BALL_COLL ({ comboTimes }) {
        let score = Math.pow(2, comboTimes)
        return score > MaxBallCollScore ? MaxBallCollScore : score
    },
    BLOCK_BREAK_N: ({ n }) => n * EventScoreMap.BLOCK_BREAK_ONE,
    BLOCK_BREAK_UNKNOWN: ({ n }) => n * EventScoreMap.BLOCK_BREAK_ONE,
}


let _score = 0

Object.keys(EventScoreMap).forEach(eventName => {
    GlobalEventSystem.on(eventName, () => {
        addScore(EventScoreMap[eventName])
    })
})
Object.keys(EventSettingMap).forEach(eventName => {
    GlobalEventSystem.on(eventName, (payload) => {
        addScore(EventSettingMap[eventName](payload))
    })
})

/**
 * 加分必须用它，且一定会显示；直接设置分就直接操作就好了
 * @param {int} deltaScore 加多少分
 */
let addScore = deltaScore => {
    _score += deltaScore

    GlobalEventSystem.notify(GlobalEvent.SCORE_CHANGE, {
        score: _score,
        deltaScore
    })
}
