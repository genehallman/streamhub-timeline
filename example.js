define(function(require) {
	var Hub = require('streamhub-backbone');
	var View = require('streamhub-timeline');

	return function(sdk, opts) {
        var col = window.col = new Hub.Collection().setRemote({
            sdk: sdk,
            siteId: opts.siteId,
            articleId: opts.articleId1
        });

	var view = new View({
		collection: col,
		el: document.getElementById(opts.elementId),
		onClick: function(event) {
			alert($(event.currentTarget).text());
		}
	});

        view.render();
        
        return view;
    };
});
