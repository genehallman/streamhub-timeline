# streamhub-timeline

streamhub-timeline is a StreamHub (Backbone) plugin that visualizes a stream as a timeline with clickable events.

![streamhub-timeline screenshot](https://drive.google.com/uc?id=0BwAX440-rUypR2dLLUJmQnd5SWM "streamhub-timeline screenshot")

Learn more about [StreamHub-Backbone](http://github.com/gobengo/streamhub-backbone)

## Prerequisites:
+ [npm](http://npmjs.org/)

## Documentation:
View the [API documentation](http://htmlpreview.github.com/?https://github.com/genehallman/streamhub-timeline/blob/master/docs/index.html).

### Streamhub Views:
The streamhub-timeline comes with ```TimelineView```, a view for use with Livefyre's Streamhub. It adds content items as
```li``` elements to a ```ul``` with a hover description inside, available for styling, and click event handling.

## To run the example site:

```
$ git clone git@github.com:genehallman/streamhub-timeline.git
$ cd streamhub-timeline
$ npm install
$ npm start
```

+ To see the demo, browse to [localhost:8080](http://localhost:8080)
+ To run the tests, browse to [localhost:8080/tests/index.html](http://localhost:8080/tests/index.html)
+ To see the docs, browse to [localhost:8080/docs/index.html](http://localhost:8080/docs/index.html)

## To install on your site:
The easiest way to use the streamhub-timeline is to install it via [bower](http://twitter.github.com/bower/) and [requirejs](http://requirejs.org/):

#### Install via Bower
Bower can be used to automatically download streamhub-timeline and its dependency tree.

```
$ bower install git://github.com/genehallman/streamhub-timeline.git
```

#### Use via Require.js
Once you've called bower install, you'll have a suite of components available to you in the ```./components``` directory. These can be accessed via Require.js, as shown below.

```
  ...
  
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
        fyre: 'http://zor.labs-t402.fyre.co/wjs/v3.0/javascripts/livefyre',
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
  
  ...
```
