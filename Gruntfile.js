module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      serve: {
        command: "phonegap serve",
        stdout: true,
        stderror: true
      }
    },
    sass: { dist: { files: { 'www/css/app.css': 'src/styles/app.scss' } } },
    jade: {
      compile: {
        options: { pretty: true },
        files: { 'www/index.html': 'src/index.jade' }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      css: {
        files: 'src/styles/**/*.scss',
        tasks: ['sass']
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: ['jade']
      }
    },
    copy: {
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
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass', 'jade', 'exec:serve', 'watch']);
};
