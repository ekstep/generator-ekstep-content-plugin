'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-ekstep-content-plugin:app', () => {
    var generator;

    describe('run without install', function() {
        beforeAll(done => {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({})
                .withPrompts({
                    name: 'org.ekstep.plugins.myplugin',
                    version: '1.0',
                    description: 'This plugin does wonders!!',
                    author: 'John Doe'
                })
                .on('ready', function(__generator__) {
                    generator = __generator__;
                })
                .on('end', done)
                .toPromise();
        });

        it('should create files in a folder named <pluginName>-<version>', () => {
            assert.equal(path.basename(generator.destinationRoot()), 'org.ekstep.plugins.myplugin-1.0');
        });

        it('should create eslint configuration extending ekstep-content-plugin configuration', () => {
            assert.fileContent('.eslintrc.yaml', 'extends: "ekstep-content-plugin"');
        });

        it('should create git ignore configuration to exclude generated files', () => {
            assert.fileContent('.gitignore', /\.DS_Store/);
            assert.fileContent('.gitignore', /node_modules/);
            assert.fileContent('.gitignore', /bower_components/);
            assert.fileContent('.gitignore', /docs/);
            assert.fileContent('.gitignore', /coverage/);
        });

        it('should create bower.json file containing plugin details and dependencies', () => {
            assert.jsonFileContent('bower.json', {
                name: 'org.ekstep.plugins.myplugin',
                dependencies: {
                    'ekstep-content-plugin-dev-common': 'ekstep/ekstep-content-plugin-dev-common'
                }
            });
        });

        it('should create gulpfile for running build tasks using dev common gulp tasks', () => {
            assert.file([
                'gulpfile.js'
            ]);
            assert.fileContent('gulpfile.js', /ekstep-content-plugin-dev-common\/lib\/gulp-tasks'/);
        });

        it('should create Jenkinsfile using common library for building content plugin', () => {
            assert.fileContent('Jenkinsfile', /@Library\('ekstep-content-plugin-jenkins-common'\) _/);
            assert.fileContent('Jenkinsfile', /buildContentPlugin/);
        });

        it('should create plugin manifest containing plugin details', () => {
            assert.jsonFileContent('manifest.json', {
                id: 'org.ekstep.plugins.myplugin',
                ver: '1.0',
                title: 'myplugin',
                description: 'This plugin does wonders!!',
                author: 'John Doe'
            });
        });

        it('should create package.json file containing plugin details and dependencies', () => {
            assert.jsonFileContent('package.json', {
                name: 'org.ekstep.plugins.myplugin',
                devDependencies: {
                    'ekstep-content-plugin-dev-common': 'ekstep/ekstep-content-plugin-dev-common'
                }
            });
        });

        it('should create README file with plugin name, description, usage', () => {
            assert.fileContent('README.md', /# org\.ekstep\.plugins\.myplugin/);
            assert.fileContent('README.md', /This plugin does wonders!!/);
            assert.fileContent('README.md', /### Usage/);
            assert.fileContent('README.md', /### Development/);
            assert.fileContent('README.md', /Please refer to \[wiki\]/);
        });

        it('should create editor source files', () => {
            assert.fileContent('editor/init.js', /org\.ekstep\.plugins\.myplugin = {};/);
            assert.fileContent('editor/plugin.js', /org\.ekstep\.plugins\.myplugin\.EditorPlugin = org\.ekstep\.contenteditor\.basePlugin\.extend/);
            assert.fileContent('editor/help.md', /org\.ekstep\.plugins\.myplugin/);
        });

        it('should create editor test files', () => {
            assert.fileContent('test/editor/plugin.spec.js', /new org\.ekstep\.plugins\.myplugin\.EditorPlugin/);
        });

        it('should create renderer source files', () => {
            assert.fileContent('renderer/plugin.js', /Plugin\.extend/);
        });

        it('should create editor test files', () => {
            assert.fileContent('test/renderer/plugin.spec.js', /RendererPlugin/);
        });

        it('should copy assets icon image without changing the content', () => {
            assert.fileContent('assets/icon.png', generator.fs.read(generator.templatePath('plugin-files/assets/icon.png')));
        });

        describe('with name & version configuration from prompts', function() {
            beforeAll(done => {
                return helpers.run(path.join(__dirname, '../generators/app'))
                    .withOptions({})
                    .withPrompts({
                        name: 'org.ekstep.plugins.myplugin',
                        version: '1.0',
                        description: 'This plugin does wonders!!',
                        author: 'John Doe'
                    })
                    .on('ready', function(__generator__) {
                        generator = __generator__;
                    })
                    .on('end', done)
                    .toPromise();
            });

            it('should create files in a folder named <pluginName>-<version> received from prompts', () => {
                assert.equal(path.basename(generator.destinationRoot()), 'org.ekstep.plugins.myplugin-1.0');
            });
        });

        describe('with name & version configuration from options', function() {
            beforeAll(done => {
                return helpers.run(path.join(__dirname, '../generators/app'))
                    .withOptions({
                        name: 'org.ekstep.plugins.myplugin',
                        version: '1.0'
                    })
                    .withPrompts({
                        description: 'This plugin does wonders!!',
                        author: 'John Doe'
                    })
                    .on('ready', function(__generator__) {
                        generator = __generator__;
                    })
                    .on('end', done);
            });

            it('should create files in a folder named <pluginName>-<version> received from options', () => {
                assert.equal(path.basename(generator.destinationRoot()), 'org.ekstep.plugins.myplugin-1.0');
            });
        });
    });

    describe('run with install', function() {
        beforeAll(done => {
            return helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({
                    skipInstall: false
                })
                .withPrompts({
                    name: 'org.ekstep.plugins.myplugin',
                    version: '1.0',
                    description: 'This plugin does wonders!!',
                    author: 'John Doe'
                })
                .on('ready', function(__generator__) {
                    generator = __generator__;
                })
                .on('end', done)
                .on('error', function() {
                    process.exit(1);
                });
        });

        it('should create plugin and run the build successfully', () => {
            assert.equal(path.basename(generator.destinationRoot()), 'org.ekstep.plugins.myplugin-1.0');
            assert.file(['node_modules', 'bower_components', 'docs', 'dist', 'coverage']);
        });
    });
});
