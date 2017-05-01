/**
 * Created by warren on 2017/4/30.
 */
var gulp = require("gulp"),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    cssver = require('gulp-make-css-url-version'),
    cache = require('gulp-cache'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    sass = require('gulp-sass'),
    revCollector = require('gulp-rev-collector');


/**
 *  gulp-rev 加md5后缀
 *  gulp-rev-collector 路径替换
 * */
var path = {
    //开发环境
    dev: {
        html: './app',
        sass: './app/sass',
        css: './app/css',
        js: './app/js',
        images: './app/images'
    },
    //发布环境
    dist: {
        html: './app/dist',
        sass: './app/dist/sass',
        css: './app/dist/css',
        js: './app/dist/js',
        images: './app/dist/images'
    }

};
//定义web服务模块  有了browser-sync应该不用这个模块了
//gulp.task('webserve', function () {
//    connect.server({
//        livereload:true,
//        port:9000
//    })
//})

// 浏览器自动刷新
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './app'
        },
        port: 8000

    });
    gulp.watch(path.dev.sass + "/*.scss", ['compass']);
    gulp.watch(path.dev.html + "/*.html", ['html']);
});
//配置 spritesmith 自动生成雪碧图 自己生成跟图片一样的宽高
gulp.task('sprite', ['del', 'html'], function () {
    var spriteData = gulp.src(path.dev.images + '/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'images/sprite.png',
            cssName: 'css/sprite.css'
        }));
    return spriteData.pipe(gulp.dest(path.dist.html));
})

//配置compass 自动生成雪碧图 自己不能生成宽高
gulp.task('compass', ['del'], function () {
    gulp.src(path.dev.sass + '/*.scss')
        .pipe(compass({
            config_file: './app/config.rb',
            sass: path.dev.sass,  //scss文件来源目录
            css: path.dev.css,   // css文件生成目录
            image: path.dev.images  //用于生成雪碧图的路径
        }))
        .pipe(concat('base.css'))
        .pipe(minifycss())
        .pipe(rename('base.min.css'))
        .pipe(rev())
        .pipe(gulp.dest(path.dev.css))
        .pipe(gulp.dest(path.dist.css))
        //.pipe(cssver())
        .pipe(rev.manifest())// 生成 rev-manifest.json
        .pipe(gulp.dest('app/rev-css'))
        .pipe(reload({stream: true}));
});
//修改index.html引用的 css js文件名
gulp.task('rev-html',['compass'], function () {
    gulp.src(['app/rev-css/*.json', path.dev.html+'/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.dist.html));

    gulp.run('html');
})
gulp.task('sass', function () {
    return gulp.src(path.dev.sass+'/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dev.css));
})

gulp.task('html', ['del'], function () {
    gulp.src(path.dev.html + '/*.html')
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}))
});



gulp.task('image', function () {
    gulp.src(path.dev.images + '/*.png')
        .pipe(cache(imagemin()))
        .pipe(reload({stream: true}))
        .pipe(gulp.dest(path.dist.image));
})
gulp.task('del', function () {
    return del.sync([path.dist.html, path.dev.images + '/*.png', path.dev.css]);
});

//默认任务
gulp.task('default', ['del', 'serve', 'compass','html'], function () {

});


gulp.task('build', ['del']);





