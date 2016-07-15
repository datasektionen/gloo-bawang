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
                    'static/js/app.js': ['static/js/app.jsx'],
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
                    'static/js/app.min.js': 'static/js/app.js'
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
