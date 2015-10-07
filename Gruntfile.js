module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      serve: {
        command: "phonegap serve &",
        stdout: true,
        stderror: true
      }
    },
    sass: { dist: { files: { 'www/css/app.css': 'src/styles/app.scss' } } },
    jade: {
      compile: {
        options: { pretty: true },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.jade',
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
          },
          {
            expand: true,
            cwd: 'src/scripts',
            src: '**/*',
            dest: 'www/js'
          }],
        verbose: true
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
      },
      scripts: {
        files: 'src/scripts/**/*.js',
        tasks: ['sync']
      },
      images: {
        files: 'src/images/**/*',
        tasks: ['sync']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['sass', 'jade', 'exec:serve', 'watch']);
};
