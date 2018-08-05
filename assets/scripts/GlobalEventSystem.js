const EventLogStyle = `font-weight:bold;
    color:yellowgreen;`

const EventNames = [
    'GAME_START',
    'GAME_OVER',
    'GAME_PAUSED',

    'BALL_COLL',
    'BALL_PROJECT',
    'BALL_PASS_TARGET_LINE',

    'BLOCK_BREAK_ONE',
    'BLOCK_BREAK_N',
    'BLOCK_BREAK_UNKNOWN',
    'BLOCK_HEART_COLL',

    'SCORE_CHANGE',
    'HEART_CHANGE',
]

let GlobalEvent = {}
let eventHandlers = {}
/* 一局游戏内统计数据 */
let gameStatData = {}
/* 要持久化的长期统计数据 */
//TODO 持久化的读和写
let persistStatData = {}

EventNames.forEach(eventName => {
    GlobalEvent[eventName] = eventName
    eventHandlers[eventName] = []
    gameStatData[eventName] = 0
    persistStatData[eventName] = 0
})


module.exports = {
    GlobalEvent,
    notify (eventName, payload) {
        eventHandlers[eventName].forEach(handler => {
            handler(payload)
        })
        gameStatData[eventName] ++
        console.log(`%c${eventName}`, EventLogStyle)
        // console.log('payload: ', payload, 'gameStatData:', gameStatData)

    },
    on (eventName, handlerCallback) {
        eventHandlers[eventName].push(handlerCallback)
    }
}