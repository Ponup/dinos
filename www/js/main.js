
requirejs.config({
    baseUrl: 'js',
    paths: {
        _: '../bower_components/underscore/underscore-min'
    },
    shim: {
        _: { exports: '_' }
    }
});

var app = {
    basePath: null,

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.basePath = ( 'android' === device.platform.toLowerCase() ? '/android_asset/www/' : '' );

        requirejs(['game']);
    }
};

app.initialize();
