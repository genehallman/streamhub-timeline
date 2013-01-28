define(function(require) {
var Backbone = require('backbone'),
    ContentView = require('streamhub-backbone/views/ContentView');
    
var TimelineView = Backbone.View.extend(
{
    initialize: function (opts) {
        this.$el.addClass(this.className);
        this.$el.hide();
        this.startDate = opts.startDate || new Date(0);
        this.endDate = opts.startDate || new Date(Math.pow(10,15));
        
        this.collection.on('add', this._insertItem, this);
        //this.collection.on('initialDataLoaded', this.render, this);
    },
    className: "hub-TimelineView",
    render: function () {
    	var listHolder = $(document.createElement('div'));
    	listHolder.addClass('events');

    	this.listEl = $(document.createElement('ul'));

    	listHolder.append(this.listEl);
    	this.$el.append($(document.createElement('div')).addClass('line-bg'));
    	this.$el.append(listHolder);

        this.$el.fadeIn();
    }
});

TimelineView.prototype._insertItem = function (item, col) {
    var itemEl = $(document.createElement('li'));
    itemEl.addClass('event-dot');
    itemEl.hide();
    
    var itemDescEl = $(document.createElement('div'));
    itemDescEl.addClass('event-desc');
    itemDescEl.html(item.get('bodyHtml') + '</br>' + item.get('createdAt'));
    itemDescEl.hide();
    
    itemEl.append(itemDescEl);
    itemEl.mouseenter(function() { itemDescEl.fadeIn(); });
    itemEl.mouseleave(function() { itemDescEl.fadeOut(); });
    
    this.listEl.append(itemEl);
    console.log(this.listEl);
    itemEl.fadeIn();

    return itemEl;
};

return TimelineView;
});
