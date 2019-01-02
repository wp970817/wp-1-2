var gulp = require("gulp");

var sass = require("gulp-sass");//转css
var clean = require("gulp-clean-css");//压缩

var server = require("gulp-webserver");//服务

var uglify = require("gulp-uglify");//压缩js
var concat = require("gulp-concat");//合并js

gulp.task("sass",function(){
    return gulp.src("./src/styles/*.scss")
    .pipe(sass())
    .pipe(clean())
    .pipe(gulp.dest("./src/css"));
})

gulp.task("conjs",function(){
    return gulp.src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./src/js"));
})

gulp.task("watch",function(){
    gulp.watch("./src/styles/*.scss",gulp.series("sass"));
    gulp.watch("./src/scripts/*.js",gulp.series("conjs"));

})

gulp.task("server",function(){
    return gulp.src("src")
    .pipe(server({
        port : 9990,
        open:true,
    }))
})