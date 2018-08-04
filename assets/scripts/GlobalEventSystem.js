
const EventNames = [
    'BALL_COLL',
    'BALL_PROJECT',
    'BALL_PASS_TARGET_LINE',
]

let GlobalEvent = {}
EventNames.forEach(eventName => {
    GlobalEvent[eventName] = eventName
})

let EventHandlers = {}
EventNames.forEach(eventName => {
    EventHandlers[eventName] = []
})

module.exports = {
    GlobalEvent,
    notify (eventName, payload) {
        EventHandlers[eventName].forEach(handler => {
            handler(payload)
        })
        console.log(`%c${eventName}`, 'font-weight:bold;color:yellowgreen')
    },
    on (eventName, handlerCallback) {
        EventHandlers[eventName].push(handlerCallback)
    }
}