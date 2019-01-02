var gulp = require("gulp");

var sass = require("gulp-sass");//转css
var clean = require("gulp-clean-css");//压缩

var server = require("gulp-webserver");//服务

var uglify = require("gulp-uglify");//压缩js
var concat = require("gulp-concat");//合并js


var fs = require("fs");
var path= require("path");
var url = require("url");

//css
gulp.task("sass",function(){
    return gulp.src("./src/styles/*.scss")
    .pipe(sass())
    .pipe(clean())
    .pipe(gulp.dest("./src/css"));
})

//js
gulp.task("conjs",function(){
    return gulp.src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./src/js"));
})


//监听
gulp.task("watch",function(){
    gulp.watch("./src/styles/*.scss",gulp.series("sass"));
    gulp.watch("./src/scripts/*.js",gulp.series("conjs"));

})

gulp.task("server",function(){
    return gulp.src("src")
    .pipe(server({
        port : 9990,
        open:true,
        middleware : function(req,res,next){
            if(req.url === "./favicon.ico"){
                return res.end();
            }
            console.log(req.url)
            // var pathname = url.parse(req.url).pathname;
            // if(pathname === "/"){
            //     res.end(fs.readFileSync(__dirname,"src","index.html"));
            // }
            if(req.url === "/"){
                res.end(fs.readFileSync("./src/index.html"))
            }else{
                var pathname = url.parse(req.url).pathname;
                console.log(pathname)
                res.end(fs.readFileSync("./src/"+pathname))
            }
            
        }
    }))
})

gulp.task("build",function(){
    return gulp.src("./src/css/style.css")
    .pipe(gulp.src("./src/js/all.js"))
    .pipe(gulp.dest("./dist"))
})

gulp.task("default",gulp.series("server","watch"));