define(function(require) {
	var Hub = require('streamhub-sdk');
	var View = require('streamhub-timeline');

	return function(el) {

	        var view = new View({ el: el });
	
		var streams = Hub.StreamManager.create.livefyreStreams({
		    network: "labs-t402.fyre.co",
		    environment: "t402.livefyre.com",
		    siteId: "303827",
		    articleId: 'labs_demo_fire'
		});
		
		streams.bind(view).start();
		
	        return view;
	};
});
