
module.exports = function(RED) {
   	"use strict";
	var jsonld = require('jsonld');

    function SampleNode(n) {
        RED.nodes.createNode(this,n);

        var node = this;
        //var msg = {};

        this.on('input', function (msg) {
 	try {
		jsonld.toRDF(msg.payload, {format: 'application/nquads'}, function(err, nquads) {
  			// nquads is a string of nquads 
   			msg.headers = {};
   			msg.headers['Content-Type'] = "text/plain";
   			msg.payload = nquads;
			node.send(msg);
		});
            } catch(e) { node.error(e.message,msg); }
        });

        this.on("close", function() {
        });
    }

    RED.nodes.registerType("jsonld-tordf",SampleNode);

}
