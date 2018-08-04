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

    'SCORE_CHANGE'
]

let GlobalEvent = {}
EventNames.forEach(eventName => {
    GlobalEvent[eventName] = eventName
})

let eventHandlers = {}
EventNames.forEach(eventName => {
    eventHandlers[eventName] = []
})

module.exports = {
    GlobalEvent,
    notify (eventName, payload) {
        eventHandlers[eventName].forEach(handler => {
            handler(payload)
        })
        console.log(`%c${eventName}`, EventLogStyle)
        console.log('payload: ', payload)
    },
    on (eventName, handlerCallback) {
        eventHandlers[eventName].push(handlerCallback)
    }
}