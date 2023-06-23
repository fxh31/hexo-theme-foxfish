// 由于hexo默认不支持scss，所以需要使用gulp将scss转换成css：npm install gulp gulp-sass gulp-autoprefixer gulp-clean-css --save-dev
// 也可以使用hexo的scss插件
const gulp = require("gulp");
const concat = require("gulp-concat"); // 合并文件

const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer"); // CSS自动添加前缀（不同浏览器的支持）
const cleanCSS = require("gulp-clean-css"); // 压缩css代码可以帮助减小CSS文件的大小，提高网页加载速度。在gulp中，可以使用cleanCSS插件来压缩CSS文件。使用cleanCSS插件可以轻松地将CSS文件压缩为一行，或去除注释、空格等无用字符，从而减小文件大小

gulp.task("css", async function () {
  gulp
    .src([
      "source/stylesheets/base.scss",
      "source/stylesheets/index.scss",
      "source/stylesheets/post.scss",
      "source/stylesheets/personal.scss",
      "source/stylesheets/archives.scss",
    ])
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(autoprefixer("last 2 version"))
    .pipe(concat("build.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("source/dist/css"));
});

gulp.task("build-css", gulp.series("css"));

// 监听.scss文件的变化，实时构建
gulp.task("watch", function () {
  // Watch .scss
  const cssVendors = ["source/stylesheets/*.scss"];
  gulp.watch(cssVendors, gulp.series("build-css"));
});

// 运行gulp文件
gulp.task("dev", gulp.series("build-css", "watch"));
// 构建css文件命令
gulp.task("build", gulp.series("build-css"));

// 默认运行入口
gulp.task("default", gulp.series("dev"));
