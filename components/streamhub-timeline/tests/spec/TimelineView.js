define([
    'jasmine-jquery',
    'streamhub-timeline',
    'streamhub-backbone',
    '../MockHubCollection'],
function (jasmine, TimelineView, Hub, MockHubCollection) {
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
    	it ("with only a Mock Hub.Collection", function () {
        	var view = new TimelineView({
            	collection: new MockHubCollection()
        	});
    	    expect(view).toBeDefined();
    	});
	    it ("with an el", function () {
	        setFixtures('<div id="hub-TimelineView"></div>');  
	        var view = new TimelineView({
	            el: $('#hub-TimelineView')
	        });
	        expect(view).toBeDefined();
	    });
	    it ("with an el and Mock Hub.Collection", function () {
	        setFixtures('<div id="hub-TimelineView"></div>');  
	        var view = new TimelineView({
	            collection: new MockHubCollection(),
	            el: $('#hub-TimelineView')
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
	            collection: new MockHubCollection(),
	            el: $('#hub-TimelineView'),
	        });
	        window.view =view;
		});
        it ("should contain 53 mock items after setRemote", function () {
            view.collection.setRemote({});
            expect(view.$el.find('.events ul>li').length).toBe(53);
        });
        it ("should call function pointer on click", function () {
        	var counter = 0;
        	view.onClick = function() {
        		counter++;
        	};
        	view.collection.setRemote({});
        	view.$el.find('.events ul>li').get(20).click();
            expect(counter).toBe(1);
        });
        it ("should filter on start and end dates", function () {
        	var content = [view.collection._createMockContent(),
	        	view.collection._createMockContent(),
	        	view.collection._createMockContent(),
	        	view.collection._createMockContent(),
	        	view.collection._createMockContent()];
	        
        	view.startDate = content[1].get('createdAt') * 1000;
        	view.endDate = content[3].get('createdAt') * 1000;
        	for (i in content) {
        		view.collection.add(content[i]);
        	}
            expect(view.$el.find('.events ul>li').length).toBe(3);
        });
        it ("should pass extra meta content", function () {
        	var content = view.collection._createMockContent();
        	content.set('bodyHtml', '<p>test</p><em>{"eventType":"testType", "eventImportant":"true"}</em>');

        	view.metaElement = 'em';

        	view.collection.add(content);
            expect(view.$el.find('.events ul>li').length).toBe(1);
            expect(view.$el.find('.events ul>li').attr('data-hub-event-type')).toBe('testType');
            expect(view.$el.find('.events ul>li').attr('data-hub-event-important')).toBe('true');
        });
    });
}); 
});