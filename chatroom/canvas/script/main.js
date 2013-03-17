var Main = function(token, initialMessages) {
  this.handlers = {};

  this.roster = new Roster(this);
  this.transcript = new Transcript(this);
  this.sender = new Sender(this);
  this.handleMessages(initialMessages);

  var channel = new goog.appengine.Channel(token);
  var main = this;
  var handler = {
    'onopen': function() {},
    'onclose': function() {},
    'onerror': function(err) {},
    'onmessage': function(msg) {
      main.handleJSONMessages(msg);
    }
  };
  var socket = channel.open(handler);
};

Main.prototype.registerHandler = function(messageId, handler) {
  this.handlers[messageId] = handler;
};

Main.prototype.handleJSONMessages = function(msg) {
  msgs = JSON.parse(msg.data);
  this.handleMessages(msgs);
};

Main.prototype.handleMessages = function(msgs) {
  var i;
  for (i = 0; i < msgs.length; i++) {
    this.handlers[msgs[i][0]](msgs[i][1]);
  }
};