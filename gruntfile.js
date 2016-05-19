// gruntfile.js
module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            dev: {
                options: {
                    paths: ["static/css"]
                },
                files: {
                    "static/css/compiled.css": "static/css/import.less"
                }
            }
        },
        watch: {
            files: ['static/css/**/*.less'],
            tasks: ['less']
        },
        browserify: {
            dev: {
                files: {
                    'static/js/news.js': ['static/js/news.jsx'],
                    'static/js/first.js': ['static/js/first.jsx', 'static/js/stickies.jsx']
                },
                options: {
                    transform: [
                        ["babelify", {"presets": ["es2015", "react"]}]
                    ]
                }
            }
        },
        uglify: {
            dev: {
                files: {
                    'static/js/first.min.js': 'static/js/first.js',
                    'static/js/news.min.js': 'static/js/news.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less', 'browserify', 'uglify']);
    grunt.registerTask('dev', ['less', 'browserify', 'uglify', 'watch']);

};