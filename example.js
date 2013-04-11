define(function(require) {
	var Hub = require('streamhub-sdk');
	var View = require('streamhub-timeline');

	return function(sdk, opts) {

        var view = new View({
            streams: Hub.Streams.forCollection(opts).start(),
            el: document.getElementById("timelineHolder")
        });
        
        return view;
    };
});
