define([
    'jasmine-jquery',
    'streamhub-timeline',
    'streamhub-sdk',
    '../MockStream'],
function (jasmine, TimelineView, Hub, MockStream) {
describe('A TimelineView', function () {
	// construction behavior
    describe('can be constructed', function() {
    	it ("with no options", function () {
	        var view = new TimelineView();
        	expect(view).toBeDefined();
    	});
    	it ("with empty options", function () {
        	var view = new TimelineView({});
        	expect(view).toBeDefined();
    	});
	    it ("with an el", function () {
	        setFixtures('<div id="hub-TimelineView"></div>');  
	        var view = new TimelineView({
	            el: $('#hub-TimelineView').get(0)
	        });
	        expect(view).toBeDefined();
	    });
	});
	
	// post construction behavior    
    describe ("after correct construction and binding", function () {
	    var view, streams;
	    
	    beforeEach(function() {
	        setFixtures('<div id="hub-TimelineView"></div>');
	        view = new TimelineView({
	            el: $('#hub-TimelineView').get(0)
	        });
	        console.log('here 1');
	        streams = new Hub.StreamManager({ main: new MockStream() });
	        console.log('here 2');
            streams.bind(view);
		});
        it ("should contain 50 mock items after streams.start()", function () {
            streams.start();
            expect(view.$el.find('.events ul>li').length).toBe(50);
        });
        it ("should call function pointer on click", function () {
        	var counter = 0;
        	view.onClick = function() {
        		counter++;
        	};
            streams.start();
        	view.$el.find('.events ul>li').get(20).click();
            expect(counter).toBe(1);
        });
        it ("should filter on start and end dates", function () {
        	var content = [streams.get('main')._createMockContent(),
	        	streams.get('main')._createMockContent(),
	        	streams.get('main')._createMockContent(),
	        	streams.get('main')._createMockContent(),
	        	streams.get('main')._createMockContent()];

            view.startDate = content[1].createdAt * 1000;
            view.endDate = content[3].createdAt * 1000;
        	for (i in content) {
                view.add(content[i]);
        	}
            expect(view.$el.find('.events ul>li').length).toBe(3);
        });
        it ("should pass extra meta content", function () {
        	var content = streams.get('main')._createMockContent();
        	content.body = '<p>test</p><em>{"eventType":"testType", "eventImportant":"true"}</em>';

        	view.metaElement = 'em';

            view.add(content);
            expect(view.$el.find('.events ul>li').length).toBe(1);
            expect(view.$el.find('.events ul>li').attr('data-hub-event-type')).toBe('testType');
            expect(view.$el.find('.events ul>li').attr('data-hub-event-important')).toBe('true');
        });
    });
}); 
});
