function BlinkAll () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P11, 1)
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.digitalWritePin(DigitalPin.P13, 0)
    basic.pause(200)
}
function ServoTurnLong () {
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(2000)
    pins.servoWritePin(AnalogPin.P16, 0)
}
function BlinkBlue5 () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P8, 0)
    basic.pause(200)
}
function BlinkRed13 () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P13, 0)
    basic.pause(200)
}
function ServoTurnShort () {
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P16, 0)
    basic.pause(500)
}
function all_off () {
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.servoWritePin(AnalogPin.P16, 0)
}
function BlinkYellow11 () {
    pins.digitalWritePin(DigitalPin.P11, 1)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P11, 0)
    basic.pause(200)
}
function ReadString () {
    cmd = serial.readString()
    basic.showString(cmd)
}
let cmd = ""
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
let fob = "0796AE8406BD"
let card = "0E0096EAA0D2"
BlinkAll()
BlinkBlue5()
BlinkYellow11()
BlinkRed13()
ServoTurnShort()
basic.forever(function () {
    if (serial.readString() == fob) {
        BlinkBlue5()
        ServoTurnLong()
    } else if (serial.readString() == card) {
        BlinkYellow11()
        ServoTurnLong()
    } else if (pins.digitalReadPin(DigitalPin.P3) == 1) {
        BlinkBlue5()
        BlinkYellow11()
        BlinkRed13()
        ServoTurnShort()
    } else {
        all_off()
    }
})
