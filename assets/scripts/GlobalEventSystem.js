

const EventNames = [
    'BallColl',
    'BallAddedForce',
    'PassTargetLine',
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
    },
    on (eventName, handlerCallback) {
        EventHandlers[eventName].push(handlerCallback)
    }
}