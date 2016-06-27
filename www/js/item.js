'use strict';

define(function(require) {
    
    function Item(path, index) {
        this.path = path;
        this.index = index;
        this.enabled = true;

        this.side = 'back';

        this.section = document.createElement('section');

        this.item = document.createElement('div');
        this.item.className = 'Item Flipped';

        this.image = document.createElement('img');
        this.image = new Image();
        this.image.className = 'Side';
        this.image.src = 'img/' + this.path;
        this.item.appendChild(this.image);

        this.back = document.createElement('div');
        this.back.className = 'Side';
        this.item.appendChild(this.back);
        
        this.section.appendChild(this.item);
    }

    Item.prototype.setEnabled = function(enabled) {
        this.enabled = enabled;
    };

    Item.prototype.setOnClickCallback = function(callback) {
        this.image.addEventListener('click', callback, false);
        this.back.addEventListener('click', callback, false);
    };

    Item.prototype.setIndex = function(index) {
        this.item.setAttribute('data-index', index);
    };

    Item.prototype.showsFront = function() {
        return this.item.className == 'Item';
    };

    Item.prototype.showFront = function() {
        this.item.className = 'Item';
        this.side = 'front';
    };

    Item.prototype.showBack = function() {
        this.item.className = 'Item Flipped';
        this.side = 'back';
    };

    Item.prototype.renderTo = function(dom) {
        dom.appendChild(this.section);
    };

    return Item;
});
