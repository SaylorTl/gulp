vargulp=require('gulp');
varRevAll=require('gulp-rev-all');
varuglify=require('gulp-uglify');
varfilter=require('gulp-filter');
varminifycss=require('gulp-minify-css');

gulp.task('default',function() {
    varjsFilter=filter("**/*.js",{restore:true});
    varcssFilter=filter("**/*.css",{restore:true});

    varrevAll=newRevAll({

        //不重命名文件
        dontRenameFile: ['.html'] ,

        //无需关联处理文件
        dontGlobal: [/^\/favicon.ico$/,'.bat','.txt','.php'],

        //该项配置只影响绝对路径的资源
        prefix:'http://cdn.tttao8.cn'
    });

    returngulp.src(['public/app/**/statics/**','!public/app/**/statics/images/**','!public/app/**/statics/**/lib/**','!public/app/**/statics/fonts/**'])

        //压缩js
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)

        //压缩css
        .pipe(cssFilter)
        .pipe(minifycss())
        .pipe(cssFilter.restore)

        //加MD5后缀
        .pipe(revAll.revision())

        //输出
        .pipe(gulp.dest('public/dist/'))

        //生成映射json文件
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('watch',function() {
    gulp.watch('public/app/**/statics/**', ['default']);
});