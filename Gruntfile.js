
'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**"]
        },
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
                    'dist/common/js/centros.js': ['src/js/funcionalidad-centros.js']
                },
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerTask('default', ['clean', 'uglify']);
};