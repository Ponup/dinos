define(function(require) {

    var itemPaths = [
        'dino_long-small.png',
        'dino_rex-small.png',
        'dino_spikes-small.png',
        'dino_trice-small.png'
    ];

    var media = new Media(app.basePath + 'audio/bg.mp3');
    media.play();

    var Item = require('item');

    var items = [];

    itemPaths.forEach(function(value, index) {
        items.push(new Item(value, index));
        items.push(new Item(value, index));
    });

    var _ = require('_');

    var shuffledItems = _.shuffle(items);

    var stack = [];

    var board = document.getElementById('board');
    board.innerHTML = '';
    shuffledItems.forEach(function(item, index) {
        item.renderTo(board);
        item.setIndex(index);
        item.setOnClickCallback(function() {
            var itemIndex = this.parentNode.getAttribute('data-index');
            var item = shuffledItems[itemIndex];
            if(!item.enabled) { return; }
            if(item.showsFront()) {
                item.showBack();
            } else {
                item.showFront();
            }
            item.setEnabled(false);
            stack.push(item);
            if((stack.length % 2) === 0) {
                if(item.index !== stack[stack.length - 2].index) {
                    var last = stack.pop();
                    var lastLast = stack.pop();
                    setTimeout(function() { last.showBack(); lastLast.showBack(); }, 1000);
                    last.setEnabled(true);
                    lastLast.setEnabled(true);
                }
            }
        });
    });
});
