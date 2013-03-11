/** @module TimelineView */
define(function(require) {
var Backbone = require('backbone'),
    ContentView = require('streamhub-backbone/views/ContentView');

/**
 * TimelineView is a view that uses streamhub data to populate a horizontail timeline.
 * It can optionally operate on just a given date range, embed meta content in a specified
 * child element of the item's bodyHtml, and can be passed an onClick event handler.
 * @alias module:TimelineView
 * @constructor
 * @param {Object.<string, *>} opts A set of options to configure this instance.
 * @param {Date} opts.startDate The start date to filter added events by.
 * @param {Date} opts.endDate The end date to filter added events by.
 * @param {string} opts.metaElement The selector of an element inside the bodyHtml of each content
 *        item that contains the meta data for this content item.
 * @param {function} opts.onClick An event handler to attach to each event dot.
 */
var TimelineView = Backbone.View.extend(
/** @lends TimelineView.prototype */
{
    initialize: function (opts) {
    	opts = opts || {};
        this.$el.addClass(this.className);
        this.$el.hide();
        this.startDate = opts.startDate || new Date(0);
        this.endDate = opts.endDate || new Date(Math.pow(10,15));
        this.metaElement = opts.metaElement;
        this.onClick = opts.onClick;
        
        this.render();

        var self = this;
        if (this.collection) {
	        this.collection.each(function(item) {
	        	self._insertItem(item, self.collection);
	        });
	        
	        this.collection.on('add', this._insertItem, this);
		}
    },
    /**
     * The css class name that this object will apply to it's holding element
     * @type {string}
     * @default hub-TimelineView
     */    
    className: "hub-TimelineView",
    /**
     * Renders a TimelineView. Creates a couple of holding html elements, then shows the timeline.
     */
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

/**
 * Inserts a new piece of content into the dom. Used as a callback handler
 * for collection.add events. If a metaElement was specified on creation, the element's contents
 * will be parsed as json, and "eventType" and "eventImportant" will be parsed out
 * and placed as data attributes on the event dot, useful for styling. 
 * @param {Object} item A piece of content that was streamed to this view from Streamhub.
 * @param {Backbone.Collection} col A reference to the collection that this item was added to.
 * @return {Object} The $html element that was inserted.
 * @protected
 */
TimelineView.prototype._insertItem = function (item, col) {
    var createdAt = item.get('createdAt') * 1000;
    if (createdAt < this.startDate || createdAt > this.endDate) {
    	return;
    }
    
	var itemMetaEl = $('<div>' + item.get('bodyHtml') + '</div>').find(this.metaElement);
	var	itemMeta = {};
	try { itemMeta = JSON.parse(itemMetaEl.text()); } catch (ex) {}    

    var left = ((createdAt - this.startDate) / (this.endDate - this.startDate)) * 100;
    
    var itemEl = $(document.createElement('li'));
    itemEl.addClass('event-dot');
    itemEl.css('left', left + '%');
    itemEl.attr('data-hub-contentid', item.get('id')); 
    
    if (itemMeta['eventType']) {
    	itemEl.attr('data-hub-event-type', itemMeta['eventType']);
    }
    if (itemMeta['eventImportant']) {
    	itemEl.attr('data-hub-event-important', itemMeta['eventImportant']);
    }
    
    var itemDescEl = $(document.createElement('div'));
    itemDescEl.addClass('event-desc');
    itemDescEl.html(
    	'<span class="body">' +
    	item.get('bodyHtml') +
    	'</span><span class="createdAtDate">' +
    	_formatCreatedAt(item.get('createdAt')) +
    	' </span>'
    );
    
    itemEl.append(itemDescEl);
    itemEl.mouseenter(function() { itemDescEl.addClass('visible-event-desc'); });
    itemEl.mouseleave(function() { itemDescEl.removeClass('visible-event-desc'); });
    itemEl.click(this.onClick);
    
    this.listEl.append(itemEl);
    itemEl.addClass('visible-event-dot');

    return itemEl;
};

/**
 * Helper function to format a date
 * @param {Date} date The date to format
 * @return {string} The formatted date
 * @private
 */
function _formatCreatedAt (date) {
    var d = new Date(date*1000),
        monthN = d.getMonth(),
        months;
    months = ['Jan','Feb','Mar','Apr','May',
              'Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    // If today, use time
    if (_dateIsToday(d)) {
        return _12hourTime(d);
    } else {
        // TODO: Show year when appropriate
        return "{day} {month}"
        .replace("{day}", d.getDate())
        .replace("{month}", months[monthN]);
    }
    function _12hourTime (date) {
        var f24 = d.getHours(),
            f12 = f24 % 12,
            ret = ""+f12,
            minutes = d.getMinutes(),
            ampm='';
        if (f12===0) f12 = '12';
        if (minutes<=9) minutes = "0"+minutes;
        if (f24 >= 12) ampm = 'p';
        return "{hour}:{min}{ampm}"
            .replace("{hour}", f12)
            .replace("{min}", minutes)
            .replace("{ampm}", ampm);
    }
    function _dateIsToday (date) {
        var today = new Date();
        return (date.getDate()==today.getDate() &&
                date.getMonth()==today.getMonth() &&
                date.getFullYear()==today.getFullYear());
    }
}

return TimelineView;
});
