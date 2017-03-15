
module.exports = function(RED) {
   	"use strict";
	var N3 = require('n3');
	var parser = N3.Parser();


    function SampleNode(n) {
        RED.nodes.createNode(this,n);

        var node = this;
        //var msg = {};

        this.on('input', function (msg) {
 	try {

	parser.parse(msg.payload,
		function (error, triple, prefixes) {
               		if (triple) {
            		     	//console.log(triple.subject, triple.predicate, triple.object, '.');
                 		msg.payload = { "subject":triple.subject, "predicate":triple.predicate, "object":triple.object};
		 		node.send(msg);
                 		//node.send("payload":{ "subject":triple.subject, "predicate":triple.predicate, "object":triple.object});
 			} else {
                 		//console.log("# That's all, folks!", prefixes);
		 		node.send(null);
			}
      	});

            } catch(e) { node.error(e.message,msg); }
        });

        this.on("close", function() {
        });
    }

	RED.nodes.registerType("n3-parser",SampleNode);

}
