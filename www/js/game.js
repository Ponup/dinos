define(function(require) {

    // Imports
    var _ = require('_');
    var Item = require('item');

    if(AdMob) {
        var config = require('config');

        AdMob.createBanner({
            adId: config.admobAdId,
            position: AdMob.AD_POSITION.TOP_CENTER,
            autoShow: true,
            isTesting: false 
        });
    }

    function Game() {
    }

    Game.prototype.init = function() {
        var self = this;
        document.getElementById('restartButton')
                .addEventListener('click', function(ev) {
                    self.start();
                    document.getElementById('overlay').style.display = 'none';
                }, false);

        var itemPaths = [
            'dino_long-small.png',
            'dino_rex-small.png',
            'dino_spikes-small.png',
            'dino_trice-small.png'
        ];
        
        this.items = [];
        itemPaths.forEach(function(value, index) {
            self.items.push(new Item(value, index));
            self.items.push(new Item(value, index));
        });
        
        this.music = new Media(app.basePath + 'audio/bg.mp3');
    };

    Game.prototype.start = function() {
        var self = this;

        this.music.play();

        this.stack = [];

        var board = document.getElementById('board');
        board.innerHTML = '';

        this.shuffledItems = _.shuffle(this.items);
        this.shuffledItems.forEach(function(item, index) {
            item.showBack();
            item.setEnabled(true);
            item.renderTo(board);
            item.setIndex(index);
            item.setOnClickCallback(self.onItemClick);
        });
    };

    Game.prototype.onItemClick = function() {
        var self = this;
        var itemIndex = this.parentNode.getAttribute('data-index');
        var item = game.shuffledItems[itemIndex];
        if(!item.enabled) { return; }
        if(item.showsFront()) {
            item.showBack();
        } else {
            item.showFront();
        }
        item.setEnabled(false);
        game.stack.push(item);
        if((game.stack.length % 2) === 0) {
            if(item.index !== game.stack[game.stack.length - 2].index) {
                var last = game.stack.pop();
                var lastLast = game.stack.pop();
                setTimeout(function() { last.showBack(); lastLast.showBack(); }, 1000);
                last.setEnabled(true);
                lastLast.setEnabled(true);
            }
        }

        if(game.stack.length === game.shuffledItems.length) {
            document.getElementById('overlay').style.display = 'block';
        }
    };

    var game = new Game();
    game.init();
    game.start();

});
