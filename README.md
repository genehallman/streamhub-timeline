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
















# streamhub-timeline

streamhub-timeline is a streamhub-sdk plugin that visualizes a stream as a timeline with clickable events.

## Views:
The streamhub-timeline comes with ```TimelineView```, a view for use with Livefyre's Streamhub. It adds content items as
```li``` elements to a ```ul``` with a hover description inside, available for styling, and click event handling.

## To run the example site:

    $ git clone git@github.com:genehallman/streamhub-timeline.git
    $ cd streamhub-timeline
    $ npm install
    $ npm start

+ To see the demo, browse to [localhost:8080](http://localhost:8080)
+ To run the tests, browse to [localhost:8080/tests/index.html](http://localhost:8080/tests/index.html)
+ To see the docs, browse to [localhost:8080/docs/index.html](http://localhost:8080/docs/index.html)

## To install on your site:
The easiest way to use the streamhub-timeline is to install it via [bower](http://twitter.github.com/bower/) and [requirejs](http://requirejs.org/):

### Install via Bower
Bower can be used to automatically download streamhub-timeline and its dependency tree.

```
$ bower install git://github.com/genehallman/streamhub-timeline.git
```

### Use via Require.js
Once you've called bower install, you'll have a suite of components available to you in the ```./components``` directory. These can be accessed via Require.js, as shown below.

    <!-- Get requirejs -->
    <script src="components/requirejs/require.js" type="text/javascript"></script>
    <!-- Get Livefyre sdk loader -->
    <script src="http://zor.t402.livefyre.com/wjs/v3.0.sdk/javascripts/livefyre.js"></script>
    <script type="text/javascript">
      require.config({
        baseUrl: 'components',
        paths: {
          jquery: 'jquery/jquery',
          text: 'requirejs-text/text',
          backbone: 'backbone/backbone',
          underscore: 'underscore/underscore',
          mustache: 'mustache/mustache',
          isotope: 'isotope/jquery.isotope',
          fyre: 'http://zor.t402.livefyre.com/wjs/v3.0/javascripts/livefyre',
        },
        packages: [ {
          name: 'streamhub-backbone',
          location: 'streamhub-backbone'
        },
        {
          name: "streamhub-timeline",
          location: "streamhub-timeline/src"
        }],
        shim: {
          backbone: {
              deps: ['underscore', 'jquery'],
              exports: 'Backbone'
          },
          underscore: {
              exports: '_'
          },
          isotope: {
              deps: ['jquery']
          },
          fyre: {
              exports: 'fyre'
          },
        }
      });
      
      // Now to load the example
      require(['streamhub-backbone', 'streamhub-timeline'],
          function(Hub, View) {
              fyre.conv.load({network: "network.fyre.co"}, [{app: 'sdk'}], function(sdk) {
              var col = window.col = new Hub.Collection().setRemote({
                  sdk: sdk,
                  siteId: "12345",
                  articleId: "article_1"
              });
              
              var view = new View({
                  collection: col,
                  el: document.getElementById("example"),
              });
              view.render();
          });
      });
    <script>
