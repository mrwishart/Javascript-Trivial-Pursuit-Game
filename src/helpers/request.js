const PubSub = require('./pub_sub.js');

const RequestHelper = function (url) {
  this.url = url;
}

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then(res => res.json())
    .catch(err => console.error(err));
};

module.exports = RequestHelper;
