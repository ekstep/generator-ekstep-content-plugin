'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.props = _.merge({}, this.options);
    }

    prompting() {
        const prompts = [];
        if (!this.options.name) {
            prompts.push({
                type: 'String',
                name: 'name',
                message: 'Plugin Name:',
                default: 'org.ekstep.plugins.example'
            });
        }
        if (!this.options.version) {
            prompts.push({
                type: 'String',
                name: 'version',
                message: 'Plugin Version:',
                default: '1.0'
            });
        }
        prompts.push({
            type: 'String',
            name: 'author',
            message: 'Plugin Author:',
            default: 'ekstep'
        });
        prompts.push({
            type: 'String',
            name: 'description',
            message: 'Plugin Description:',
            default: 'This plugin is an example plugin'
        });
        return this.prompt(prompts).then(props => {
            this.props = _.merge(this.props, props);
        });
    }

    paths() {
        const pluginFolderName = this.props.name + '-' + this.props.version;
        this.destinationRoot(pluginFolderName);
    }

    writing() {
        this.log(chalk.green('Writing to plugin folder : ' + path.basename(this.destinationRoot())));
        const pluginName = this.props.name;
        const pluginVersion = this.props.version;
        const pluginDescription = this.props.description;
        const pluginAuthor = this.props.author;
        const pluginNameSpace = pluginName;
        const pluginShortName = _.last(_.split(pluginName, '.'));

        this.fs.copyTpl(
            this.templatePath('plugin-files'),
            this.destinationPath('./'), {
                pluginName: pluginName,
                pluginVersion: pluginVersion,
                pluginDescription: pluginDescription,
                pluginAuthor: pluginAuthor,
                pluginNameSpace: pluginNameSpace,
                pluginShortName: pluginShortName
            }, {}, { globOptions: { dot: true } }
        );

        // Workaround for issue where .gitignore gets replaced by .npmignore when used as npm dependency
        // https://github.com/yeoman/generator/issues/812
        this.fs.move(
            this.destinationPath('gitignore_renamed_in_generator'),
            this.destinationPath('.gitignore')
        );
    }

    install() {
        const self = this;
        this.installDependencies({
            callback: function() {
                self.log(chalk.green('Running gulp'));
                self.spawnCommandSync('node_modules/gulp/bin/gulp.js');
                self.log(chalk.green(`
You are all set here!
Find developer docs on https://github.com/ekstep/Contributed-Plugins/wiki
If you need inspiration from other plugins, visit https://github.com/ekstep?q=org.ekstep.plugins`));
            }
        });
    }
};
