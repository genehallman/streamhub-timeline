# streamhub-timeline

streamhub-timeline is a [StreamHub App](http://apps.livefyre.com) that that visualizes a stream of social content as a timeline with clickable events.

## Getting Started

The quickest way to use streamhub-timeline is to use the built version hosted on Livefyre's CDN.

### Dependencies

streamhub-timeline depends on [streamhub-sdk](https://github.com/livefyre/streamhub-sdk). Ensure it's been included in your page.

	<script src="http://cdn.livefyre.com/libs/sdk/v1.0.1-build.147/streamhub-sdk.min.gz.js"></script>

Include streamhub-timeline too.

	<script src="http://livefyre-cdn-dev.s3.amazonaws.com/libs/apps/cheung31/streamhub-timeline/v2.0.0-build.3/streamhub-timeline.min.js"></script>
	
Optionally, include some reasonable default CSS rules for StreamHub Content. This stylesheet is provided by the StreamHub SDK.

    <link rel="stylesheet" href="http://cdn.livefyre.com/libs/sdk/v1.0.1-build.147/streamhub-sdk.gz.css" />

### Usage

1. Require streamhub-sdk and streamhub-timeline

        var Hub = Livefyre.require('streamhub-sdk'),
           TimelineView = Livefyre.require('streamhub-timeline');
    
1. An empty feed is no fun, so use the SDK to create a StreamManager for a Livefyre Collection

        var streamManager = Hub.StreamManager.create.livefyreStreams({
            network: "labs.fyre.co",
            siteId: 315833,
            articleId: 'example'
        });
        
1. Create a TimelineView, passing the DOMElement to render it in (```el``` option).

        var view = new TimelineView({
        	el: document.getElementById("timeline")
    	});
    
1. And bind the streamManager to your feed and start it up

        streamManager(view).start();

You now have a Timeline! See this all in action on [this jsfiddle](http://jsfiddle.net/G9PPf/5/).

## Local Development

Instead of using a built version of streamhub-timeline from Livefyre's CDN, you may wish to fork, develop on the repo locally, or include it in your existing JavaScript application.

Clone this repo

    git clone https://github.com/Livefyre/streamhub-timeline

Development dependencies are managed by [npm](https://github.com/isaacs/npm), which you should install first.

With npm installed, install streamhub-timeline's dependencies. This will also download [Bower](https://github.com/bower/bower) and use it to install browser dependencies.

    cd streamhub-timeline
    npm install

This repository's package.json includes a helpful script to launch a web server for development

    npm start

You can now visit [http://localhost:8080/](http://localhost:8080/) to see an example feed loaded via RequireJS.

# StreamHub

[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is used by the world's biggest brands and publishers to power their online Content Communities. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. Want StreamHub? [Contact Livefyre](http://www.livefyre.com/contact/).