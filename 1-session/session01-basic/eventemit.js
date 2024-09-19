const EventEmitter = require("events");

class NotifyEmitter extends EventEmitter {}
const notifyEmitter = new NotifyEmitter();

// register Listener
notifyEmitter.on("sendNotification", (message) => {
  console.log(`Sending notification ${message}`);
});

// Simulate events triggering notifications
setTimeout(() => {
  notifyEmitter.emit("sendNotification", "Meeting Reminder");
}, 2000);

setTimeout(() => {
  notifyEmitter.emit("sendNotification", "Reminder to call client");
}, 4000);

setTimeout(() => {
  notifyEmitter.emit("sendNotification", "ProductDelivery Reminder");
}, 6000);
