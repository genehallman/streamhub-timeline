define(function(require) {
var Backbone = require('backbone'),
    ContentView = require('streamhub-backbone/views/ContentView');
    
var TimelineView = Backbone.View.extend(
{
    initialize: function (opts) {
        this.$el.addClass(this.className);
        this.$el.hide();
        this.startDate = opts.startDate || new Date(0);
        this.endDate = opts.endDate || new Date(Math.pow(10,15));
        this.metaElement = opts.metaElement;
        
        this.render();

        var self = this;
        this.collection.each(function(item) {
        	self._insertItem(item, self.collection);
        });
        
        this.collection.on('add', this._insertItem, this);
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
    var createdAt = item.get('createdAt') * 1000;
    
    if (createdAt < this.startDate || createdAt > this.endDate) {
    	return;
    }
    
	var itemMetaEl = $('<div>' + item.get('bodyHtml') + '</div>').find(this.metaElement);
	var	itemMeta = {};
	try { itemMeta = JSON.parse(itemMetaEl.text()); } catch (ex) {}    
    
    var left = ((createdAt - this.startDate) / (this.endDate - this.startDate)) * 100;
    debugger;
    
    var itemEl = $(document.createElement('li'));
    itemEl.addClass('event-dot');
    itemEl.css('left', left + '%');
    
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
    
    this.listEl.append(itemEl);
    itemEl.addClass('visible-event-dot');

    return itemEl;
};

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
