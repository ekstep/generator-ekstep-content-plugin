// Renderer plugin can't be tested as of now
// Please move the logic to other classes and test them independently
// Let the plugin class delegate functionality to these classes
/* istanbul ignore next */
Plugin.extend({
    _type: '<%= pluginName %>',
    _isContainer: false,
    _render: true,
    initPlugin: function() {

    }
});
