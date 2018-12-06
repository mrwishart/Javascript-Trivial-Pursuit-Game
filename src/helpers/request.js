const PubSub = require('./pub_sub.js');

const RequestHelper = function (url) {
  this.url = url;
}

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then(res => res.text())
    .catch(PubSub.publish("SystemView:UpdateMessage", "query-failed"));
};

module.exports = RequestHelper;
