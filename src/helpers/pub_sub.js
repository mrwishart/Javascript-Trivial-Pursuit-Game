const PubSub = {

  publish: function (channel, payload) {
    const newEvent = new CustomEvent(channel, {detail: payload});
    document.dispatchEvent(newEvent);
  },

  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
  },

  unsubscribe: function (channel, callback) {
    document.removeEventListener(channel, callback);
  }
}

module.exports = PubSub;
