var Transcript = function(messageManager, transcriptDiv) {
  this.transcriptDiv = $('#transcript-div');

  transcript = this;
  messageManager.registerHandler('m',
				 function(msg) {
				 	console.log(msg[1]);
				 	try{
					 	var obj = JSON.parse(msg[1]);
					 	if (obj.kind == "fig" ){
					 		transcript.updateFig(obj);
					 	}
				 	}
				 	catch(e) {
				   		transcript.updateTranscript(msg);
				   	}
				   	
				 });

};

Transcript.prototype.updateTranscript = function(transcript) {
  this.transcriptDiv.append('<div class="transcript-item">'
			    + '<span class="transcript-name">'
			    + transcript[0]
			    + '</span>'
			    + '<span class="transcript-test">'
			    + transcript[1]
			    + '</span>'
			    + '</div>');
};

Transcript.prototype.updateFig = function(obj) {
  drawObject(obj);
};