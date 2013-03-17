var Roster = function(messageManager, rosterDiv) {
  this.rosterDiv = $('#roster-div');
  roster = this;
  messageManager.registerHandler('r',
				 function(msg) {
				   roster.updateRoster(msg);
				 });
};

Roster.prototype.updateRoster = function(roster) {
  this.rosterDiv.empty();
  var i;
  for (i = 0; i < roster.length; i++) {
    this.rosterDiv.append('<div class="roster-item">' + roster[i][1] + '</div>');
  }
};

