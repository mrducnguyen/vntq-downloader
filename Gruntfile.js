module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'app',
                    mainConfigFile: 'app/js/conf/debug-config.js',

                    name: 'appModules',

                    out: 'app/js/app.min.js',
                    exclude: ['appConfig', 'jquery']//, 'bootstrap', 'bootstrapSelect', 'angular', 'angularRoute', 'angularAnimate']
                }
            }
        },

        clean: {
            optimize: ['build/optimized', 'build/dist']
        },

        copy: {
            optimize: {
                files: [
                    {
                        src: [
                            'libs/bootstrap/dist/css/bootstrap.min.css',
                            'libs/bootstrap/dist/fonts/**'
                        ],

                        dest: 'build/optimized/'
                    },
                    {
                        src: [
                            'libs/requirejs/require.js',
                            'libs/jquery/dist/jquery.min.js',
                            'libs/angular/angular.min.js'
                        ],

                        dest: 'build/optimized/'
                    },

                    {
                        src: [
                            'app/**',
                            '!app/less/**',
                            '!app/*.html',
                            '!app/js/**',

                            'app/js/conf/app-config.js',
                            'app/js/conf/release-config.js',
                            'app/js/app-main.js',
                            'app/js/app.min.js'
                        ],

                        dest: 'build/optimized/'
                    },

                    {src: 'app/index-release.html', dest: 'build/optimized/app/index.html'},
                    {src: 'app/js/conf/app-config-integrated.js', dest: 'build/optimized/app/js/conf/app-config.js'}
                ]
            }
        },

        compress: {
            optimize: {
                options: {
                    archive: 'build/dist/vntqApp.zip'
                },
                files: [
                    //{src: ['build/optimized/**'], dest: 'build/dist/'},
                    {expand: true, cwd: 'build/optimized/', src: ['**'], dest: ''}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('build', function (arg1) {
        grunt.task.run(['requirejs', 'clean:optimize', 'copy:optimize', 'compress:optimize']);
    });

    // Default task(s).
    grunt.registerTask('default', ['build']);
};