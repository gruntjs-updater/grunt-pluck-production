module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pluckprod : {
            files : ['**/*.js', '**/.json'],
            options : {
                target : './out'
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['pluckprod']);
};

