
module.exports = function(RED) {
   	"use strict";
	var jsonld = require('jsonld');

    function SampleNode(n) {
        RED.nodes.createNode(this,n);

        var node = this;
        var msg = {};

        this.on('input', function (msg) {
 	try {
// use the promises API
var promises = jsonld.promises;

// compaction
var promise = promises.compact(msg.payload, msg.context);
promise.then(
	function(compacted) {
			msg.payload = compacted;
   			node.send(msg);
	}, 
	function(err) {
	});

//		jsonld.compact(msg.payload, msg.context, function(err, compacted) {
//			msg.payload = compacted;
//                        msg.headers = {};
//                        msg.headers['Content-Type'] = "text/plain";
//   			node.send(msg);
//		});
            } catch(e) { node.error(e.message,msg); }
        });

        this.on("close", function() {
        });
    }

    RED.nodes.registerType("jsonld-compact",SampleNode);

}
