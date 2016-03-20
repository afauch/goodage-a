module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //===
    //Autoprefix all CSS parameters
    autoprefixer: {
      dist: {
          files: {
              'dist/css/global.css': 'dist/css/global.css'
          }
      }
    },
    //=== Concatenate all JS files
    concat: {
      options: {
        // define a string to put between each file in the concatenated output  
        separator: '\n\n'
      },
      dist: {
        // the files to concatenate
        src: ['src/js/**/*.js'],
        // the location of the resulting SCSS file
        dest: 'dist/js/script.js'
      }
    },
    //===
    //Minify CSS
    cssmin:{
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          // This tells uglify to create a file within dist/ that contains the result of minifying the JavaScript files.
          // Here I use <%= concat.dist.dest %> so uglify will minify the file that the concat task produces.
          // THIS IS REALLY USEFUL
          'dist/css/global.min.css': ['<%= sass.dist.dest %>']
        }
      }
    },
    //===
    //Lint Javascript for errors
    jshint: {
      // define the files to lint -
      // deliberately avoid js files in subfolders
      // (right now that's just vendor files)
      files: ['Gruntfile.js', 'src/js/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    //===
    //Precompile SASS
    sass: {
      dist: {
        // the files to concatenate
        src: ['src/scss/global.scss'],
        // the location of the resulting CSS file
        dest: 'dist/css/global.css'
      }
    },
    //===
    //Minify JS
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          // This tells uglify to create a file within dist/ that contains the result of minifying the JavaScript files.
          // Here I use <%= concat.dist.dest %> so uglify will minify the file that the concat task produces.
          // THIS IS REALLY USEFUL
          'dist/js/script.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    //===
    //Watch for changes, and run the specified tasks on changes
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint']);

  // the default task can be run just by typing "grunt" on the command line
  // The order is as follows:
  // 1. jshint: Lint Javascript
  // 2. sass: Precompile the global.scss file into a CSS file
  // 4. autoprefixer: Assign vendor prefixes where necessary
  // 5. cssmin: Minify main.css to improve filesize
  // 6. concat: Concatenate Javascript
  // 7. uglify: Minify Javascript
  grunt.registerTask('default', ['jshint', 'sass','autoprefixer', 'cssmin', 'concat', 'uglify']);

};