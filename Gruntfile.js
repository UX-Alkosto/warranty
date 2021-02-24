
'use strict';
module.exports = function (grunt) {

    var themes = ['alkosto']

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**/css/*", "dist/**/js/*"]
        },
        cssmin: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                compatibility: 'ie8',
                report: 'gzip',
                inline: ['local'],
                level: {
                    1: {
                        all: true
                    },
                    2: {
                        all: true
                    }
                }
            },
            dist: {
                expand: true,
                cwd: 'dist',
                src: ['**/css/*.css'],
                dest: 'dist'
            }
        },
        less: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                compress: true,
                paths: ['dist/css'],
                modifyVars: {
                    themeName: '<%= theme %>'
                },
                plugins: [
                    new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] }),
                    new (require('less-plugin-clean-css'))({ advanced: true })
                ]
            },
            theme: {
                files: {
                    'dist/<%= theme %>/css/<%= pkg.name %>.css': 'src/less/index.less'
                }
            }
        },
        themes: themes,
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                report: "gzip",
                compress: true,
                reserveDOMProperties: true,
                sourceMap: false,
                exportAll: true,
            },
            dist: {
                files: {
                    'dist/common/js/select.js': ['src/js/select.js'],
                    'dist/common/js/centros.js': ['src/js/funcionalidad-centros.js']
                },
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerMultiTask('themes', 'Generate styles for each site', function () {
        const done = this.async();
        grunt.log.writeln('Compile less for: ' + this.data);
        grunt.config('theme', this.data);
        grunt.task.run('less');
        done();
    });
    grunt.registerTask('default', ['clean', 'themes', 'cssmin', 'uglify']);
};