module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pluckprod : {
            // a minimal set of files that should get most non-web projects going
            files : ['**/*.js', '**/*.json', '**/*.types', '**/*.node'],
            // alternatively, copy everything not in a dev dependency:
            // files : ['**/*'],
            options : {
                target : './out'
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['pluckprod']);
};

