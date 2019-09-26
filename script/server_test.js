var brokerAddress = '127.0.0.1'
var brokerPort = '3000'
var state = 'off'
var value = 0

const mqtt = require('mqtt')
const client = mqtt.connect([{
    host: brokerAddress,
    port: brokerPort
}])

client.on('connect', function() {
    client.subscribe('topic/test1')
    displayConnectedMessage()
})

client.on('message', (topic, message) => {
    console.log('received message on %s: %s', topic, message)
    value = message
    action()
    changeTemp()
})

function displayConnectedMessage(){
    console.log('client connected at %s:%s',brokerAddress,brokerPort);
}

function action(){
    client.publish('topic/test2',value)
}

/*
function handleOpenRequest (message) {
    if (state !== 'open' && state !== 'opening') {
        console.log('opening garage door')
        state = 'opening'
        sendStateUpdate()

        // simulate door open after 5 seconds (would be listening to hardware)
        setTimeout(() => {
            state = 'open'
            sendStateUpdate()
        }, 5000)
    }
}
    */
