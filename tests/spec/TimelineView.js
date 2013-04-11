define([
    'jasmine-jquery',
    'streamhub-timeline',
    'streamhub-sdk',
    'streamhub-sdk/streams',
    '../MockStream'],
function (jasmine, TimelineView, Hub, Streams, MockStream) {
describe('A TimelineView', function () {
    it ("can have tests run", function () {
        expect(true).toBe(true);
    });
    it("can do HTML tests",function(){  
        setFixtures('<div id="hub"></div>');  
        $('#hub')
            .append('<li>So</li>')
            .append('<li>So</li>');
        expect($('#hub li').length).toBe(2);  
    });
	
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
    	it ("with only a Mock Hub.Stream", function () {
        	var view = new TimelineView({
            	streams: new Streams({main: new MockStream()})
        	});
    	    expect(view).toBeDefined();
    	});
	    it ("with an el", function () {
	        setFixtures('<div id="hub-TimelineView"></div>');  
	        var view = new TimelineView({
	            el: $('#hub-TimelineView').get(0)
	        });
	        expect(view).toBeDefined();
	    });
	    it ("with an el and Mock Hub.Stream", function () {
	        setFixtures('<div id="hub-TimelineView"></div>');  
	        var view = new TimelineView({
	            streams: new Streams({main: new MockStream()}),
	            el: $('#hub-TimelineView').get(0)
	        });
	        expect(view).toBeDefined();
	    });
	});
	
	// post construction behavior    
    describe ("after correct construction", function () {
	    var view;
	    
	    beforeEach(function() {
	        setFixtures(
		        '<div id="hub-TimelineView"></div>'
		    );
	        view = new TimelineView({
	            streams: new Streams({main: new MockStream()}),
	            el: $('#hub-TimelineView').get(0)
	        });
	        window.view = view;
		});
        it ("should contain 50 mock items after streams.start()", function () {
            view.streams.start();
            expect(view.$el.find('.events ul>li').length).toBe(50);
        });
        it ("should call function pointer on click", function () {
        	var counter = 0;
        	view.onClick = function() {
        		counter++;
        	};
        	view.streams.start();
        	view.$el.find('.events ul>li').get(20).click();
            expect(counter).toBe(1);
        });
        it ("should filter on start and end dates", function () {
        	var content = [view.streams.get('main')._createMockContent(),
	        	view.streams.get('main')._createMockContent(),
	        	view.streams.get('main')._createMockContent(),
	        	view.streams.get('main')._createMockContent(),
	        	view.streams.get('main')._createMockContent()];
	        
        	view.startDate = content[1].createdAt * 1000;
        	view.endDate = content[3].createdAt * 1000;
        	for (i in content) {
        		view.emit('add', content[i]);
        	}
            expect(view.$el.find('.events ul>li').length).toBe(3);
        });
        it ("should pass extra meta content", function () {
        	var content = view.streams.get('main')._createMockContent();
        	content.body = '<p>test</p><em>{"eventType":"testType", "eventImportant":"true"}</em>';

        	view.metaElement = 'em';

        	view.emit('add', content);
            expect(view.$el.find('.events ul>li').length).toBe(1);
            expect(view.$el.find('.events ul>li').attr('data-hub-event-type')).toBe('testType');
            expect(view.$el.find('.events ul>li').attr('data-hub-event-important')).toBe('true');
        });
    });
}); 
});