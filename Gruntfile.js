module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      serve: {
        command: "phonegap serve &",
        stdout: true,
        stderror: true
      }
    },
    sass: { main: { files: { 'www/css/app.css': 'src/styles/app.scss' } } },
    uglify: {
      main: {
        files: { 'www/js/app.js': 'src/scripts/**/*.js' },
        options: {
          mangle: false,
          beautify: true,
          preserveComments: true
        }
      }
    },
    jade: {
      main: {
        options: { pretty: true },
        files: [{
          expand: true,
          cwd: 'src/views',
          src: ['**/*.jade', '!**/_*.jade'],
          dest: 'www',
          ext: '.html'
        }]
      }
    },
    sync: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/res',
            src: '**/*',
            dest: 'www/res'
          },
          {
            expand: true,
            cwd: 'src/images',
            src: '**/*',
            dest: 'www/images'
          }],
        updateAndDelete: true,
        compareUsing: "md5",
        verbose: true
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      scripts: {
        files: 'src/scripts/**/*.js',
        tasks: ['uglify']
      },
      css: {
        files: 'src/styles/**/*.scss',
        tasks: ['sass']
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: ['jade']
      },
      images: {
        files: 'src/images/**/*',
        tasks: ['sync']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['sass', 'jade', 'uglify', 'exec:serve', 'watch']);
};
