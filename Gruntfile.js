var config = require('./config/config');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        debug: {
            options: {
                open: false // do not open node-inspector in Chrome automatically
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:' + process.env.PORT
            }
        },

        watch: {
            options: {
                livereload: false
            },
            public: {
                files: ['public/**/*'],
                tasks: ['copy:public']
            },
            src: {
                files: ['src/**/*'],
                tasks: ['copy:src']
            },
            server: {
                files: ['config/config.js', 'server/*'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            public: {
                expand: true,
                cwd: 'public/',
                src: ['**'],
                dest: 'dist/public/'
            },
            src: {
                expand: true,
                flatten: true,
                cwd: 'src/',
                src: ['**'],
                dest: 'dist/public/js/'
            }
        },

        concat: {
            src: {
                //Concatenate all of the files in the jsResources configuration property
                src: ['src/super.js','src/motion.js','src/instance.js'],
                dest: 'dist/public/js/motion-device.js'
            }
        },

        clean: {
            dist: ['dist/']
        },

        express: {
            dev: {
                options: {
                    port: config.port,
                    script: 'server/server.js',
                    background: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', [
        'clean', 'copy:public', 'concat:src'
    ]);

    grunt.registerTask('start', [
        'default', 'express', 'watch'
    ]);

    grunt.registerTask('development', [
        'default', 'express', 'open:dev', 'watch'
    ]);

}
