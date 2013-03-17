var Sender = function(messageManager) {
  $('#message-form').submit(this.submitText);
};

Sender.prototype.submitText = function() {
  $('#message-text-input').attr('disabled', true);
  $('#message-text-submit').attr('disabled', true);
  message = $('#message-text-input').val();
  var obj = new Object();
  obj.type = 'text';
  obj.text = message;
  var objStr = JSON.stringify(obj);
  $.ajax('/sendmessage',
	 { 'data': {'m': message},
	   'type': 'POST',
	   'success': function() {
	     $('#message-text-input').val('');
	     $('#message-text-input').removeAttr('disabled');
	     $('#message-text-submit').removeAttr('disabled');
	   }
	 });
  return false;
};

Sender.prototype.submitFigMsg = function(obj) {
	var obj2 = obj;
	console.log("submitFigMsg");
	obj2.kind = 'fig';
	var objStr = JSON.stringify(obj2);
	console.log(obj2);
  $.ajax('/sendmessage',
	 { 'data': {'m': objStr},
	   'type': 'POST',
	   'success': function() {}
	 });
  return false;
};