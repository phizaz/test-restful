var fs = require('fs');
var force_compile = true;

module.exports = function(grunt) {
  var root = 'public';

  var isModified = function (filepath) {
    var now = new Date();
    var modified = fs.statSync(filepath).mtime;
    return (now - modified) < 1500 || force_compile;
  };

  grunt.initConfig({
    coffeelint: {
      modified: {
        options: {
          force: true,
          'arrow_spacing': {
            level: 'warn'
          },
          'no_empty_functions': {
            level: 'warn'
          },
          'no_interpolation_in_single_quotes': {
            level: 'error'
          }
        },
        files: [
          {
            expand: true,
            cwd: root + '/coffee',
            src: '*.coffee',

            // Complie only when needed.
            filter: isModified
          }
        ]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: root + '/jade/',
            src: '*.jade',
            dest: root + '/html/',
            ext: '.html',
            extDot: 'last',

            // Complie only when needed.
            filter: isModified
          }
        ]
      }
    },
    sass: {
      compile: {
        // options: {
        //   style: 'compressed'
        // }
        files: [
          {
            expand: true,
            cwd: root + '/sass/',
            src: '*.sass',
            dest: root + '/css/',
            ext: '.css',
            extDot: 'last',

            // Complie only when needed.
            filter: isModified
          }
        ]
      },
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: [
          {
            expand: true,
            cwd: root + '/coffee',
            src: '*.coffee',
            dest: root + '/js/',
            ext: '.js',
            extDot: 'last',

            // Complie only when needed.
            filter: isModified
          }
        ]
      },
      compileJoin: {
        options: {
          bare: true,
          join: true
        },
        files: [
          { dest: root + '/js/app.js', src: root + '/coffee/*.coffee'}
        ]
      }
    },
    uglify: {
      js: {
        files: [
          { dest: 'app.min.js', src: root + '/js/app.js'}
        ]
      }
    },
    copy: {
      js: {
        files: [
          {src: [root + '/js/app.js'], dest: 'app.js', filter: 'isFile'}
        ]
      },
      html: {
        files: [
          {src: [root + '/html/app.html'], dest: 'index.html', filter: 'isFile'}
        ]
      },
      css: {
        files: [
          {src: [root + '/css/app.css'], dest: 'app.css', filter: 'isFile'}
        ]
      }
    },
    watch: {
      coffee: {
        files: [root + '/coffee/*'],
        tasks: [
          'coffeelint:modified',
          'coffee:compileJoin',
          // 'uglify:js',
          'copy:js',
          'disableForceCompile'
        ],
        options: {
          spawn: false,
          atBegin: true,
          interrept: true
        }
      },
      jade: {
        files: [root + '/jade/*'],
        tasks: ['jade:compile', 'copy:html', 'disableForceCompile'],
        options: {
          spawn: false,
          atBegin: true,
          interrept: true
        }
      },
      sass: {
        files: [root + '/sass/*'],
        tasks: ['sass:compile', 'copy:css', 'disableForceCompile'],
        options: {
          spawn: false,
          atBegin: true,
          interrept: true
        }
      }
    }
  });

  // Force Compile is on, only when it's the first time.
  // (force compile the first time the task is run)
  grunt.registerTask('disableForceCompile', '', function () {
    force_compile = false;
  });

  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
