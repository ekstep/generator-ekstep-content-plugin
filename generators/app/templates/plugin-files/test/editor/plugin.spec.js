describe("EditorPlugin", function() {
    describe("newInstance", function() {
        var plugin;

        beforeEach(function() {
            plugin = new <%= pluginNameSpace %>.EditorPlugin({}, {}, {});
        });

        it("should ?", function() {
            plugin.newInstance();

            expect(true).toBe(true);
        });
    });
});
