const PubSub = {

  publish: function (channel, payload) {
    const newEvent = new CustomEvent(channel, {detail: payload});
    document.dispatchEvent(newEvent);
    console.log(`Publishing on ${channel} with content: ${payload}.`)
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
    console.log(`Subscribing on ${channel}.`);
  },

  unsubscribe: function (channel, callback) {
    document.removeEventListener(channel, callback);
  }
};

module.exports = PubSub;
