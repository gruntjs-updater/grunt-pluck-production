module.exports = function (grunt) {
    grunt.registerMultiTask('pluckprod',

            'Copies pattern match files to a deploy folder. '+
            'For any packages under `node_modules`, matching files'+
            ' in devDependencies modules are excluded.',
            
    function ()
    {

        var files = this.filesSrc; // should already be filtered by target file types.

        console.dir(grunt)
        
        var target = grunt.config('pluckprod.options.target') || 'out/';
        if (target.indexOf('./') === 0) target = target.slice(2);
        if (target.slice(-1) !== '/') target += '/';

        if (grunt.file.exists(target)) {
            grunt.log.writeln("Cleaning output target: " + target);
            grunt.file.delete(target);
        } else {
            grunt.log.writeln("Output target: " + target);
        }

        var excludedPaths = [];
        var isExcluded = function(q){return excludedPaths.some(function(c){return q.indexOf(c)===0;});};

        // look in all package.json files, read their devDeps and add to the excludedPaths list.
        var packages = grunt.file.expand("**/package.json");
        packages.sort(function(a,b){return a.length - b.length;}); // short paths first, makes exclude list shorter
        packages.forEach(function(pkgPath) {
            var rootPath = pkgPath.slice(0, -12) + 'node_modules/';

            var pkg = grunt.file.readJSON(pkgPath, {encoding:'utf8'});
            var devs = pkg.devDependencies;
            if (! devs) return;

            Object.keys(devs).forEach(function (name){
                var path = rootPath+name;
                if (!isExcluded(path)) excludedPaths.push(path); // only add if parent path is not excluded
            });
        });
        
        grunt.log.writeln("Copying ");
        // copy all pattern files that aren't in excluded paths
        files.forEach(function (value) {
            if (value.indexOf(target) === 0) return; // file is in the old deleted target. Ignore
            if (isExcluded(value)) return;
            if (grunt.file.isDir(value)) return; // some packages have names like `retroencabulator.js`...

            grunt.log.writeln('    ' + value);
            grunt.file.copy(value, target+'/'+value);
        });

    });
};

