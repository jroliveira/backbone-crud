#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-exec"

  grunt.initConfig

    copy:
      jquery:
        files: [{
          expand: true
          cwd: "bower_components/jquery/"
          src: "jquery.js"
          dest: "vendor/js/"
        }]
      bootstrap:
        files: [{
          expand: true
          cwd: "bower_components/bootstrap/docs/assets/css/"
          src: "bootstrap.css"
          dest: "vendor/css/"
        }, {
          expand: true
          cwd: "bower_components/bootstrap/docs/assets/css/"
          src: "bootstrap-responsive.css"
          dest: "vendor/css/"
        }, {
          expand: true
          cwd: "bower_components/bootstrap/docs/assets/js/"
          src: "bootstrap.js"
          dest: "vendor/js/"
        }, {
          expand: true
          cwd: "bower_components/bootstrap/docs/assets/img/"
          src: "glyphicons-halflings-white.png"
          dest: "vendor/img/"
        }, {
          expand: true
          cwd: "bower_components/bootstrap/docs/assets/img/"
          src: "glyphicons-halflings.png"
          dest: "vendor/img/"
        }]
      requirejs:
        files: [{
          expand: true
          cwd: "bower_components/requirejs/"
          src: "require.js"
          dest: "vendor/js/"
        },{
          expand: true
          cwd: "bower_components/requirejs-text/"
          src: "text.js"
          dest: "vendor/js/"
        }]
      underscore:
        files: [{
          expand: true
          cwd: "bower_components/underscore/"
          src: "underscore.js"
          dest: "vendor/js/"
        }]
      backbone:
        files: [{
          expand: true
          cwd: "bower_components/backbone/"
          src: "backbone.js"
          dest: "vendor/js/"
        }]

    exec:
      jekyll:
        cmd: "jekyll build --trace"

    watch:
      options:
        livereload: true
      source:
        files: [
          "_drafts/**/*"
          "_includes/**/*"
          "_layouts/**/*"
          "_posts/**/*"
          "css/**/*"
          "js/**/*"
          "_config.yml"
          "*.html"
          "*.md"
        ]
        tasks: [
          "exec:jekyll"
        ]

    connect:
      server:
        options:
          port: 4000
          base: '_site'
          livereload: true

  grunt.registerTask "build", [
    "copy"
    "exec:jekyll"
  ]

  grunt.registerTask "serve", [
    "build"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "default", [
    "serve"
  ]