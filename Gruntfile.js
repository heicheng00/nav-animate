module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    require("time-grunt")(grunt);

    grunt.initConfig({
        //监视 js css文件
         watch:{
             livereload: {
                 options: {
                     livereload: '<%= connect.options.livereload %>'
                 },
                 files: [
                     './{,*/}*.html',
                     './css/{,*/}*.css',
                     './img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                     './js/*.js'
                 ]
             }
         },
         connect:{
             options: {
                 port: 9000,
                 // Change this to '0.0.0.0' to access the server from outside.
                 hostname: 'localhost',
                 livereload: 35729
             },
             livereload:{
                 open:true
             }
         }
    })
    grunt.registerTask('build','clean','useminPrepare','filerev','usemin')
    grunt.registerTask('default','clean')

}