var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");
var concat = require("gulp-concat");
var sass = require("gulp-sass");

var sources = [
	"ui/app.js",
	"ui/**/*.js"
];

var css = [
	"ui/**/*.scss"
];


gulp.task("sass", function () {
	return gulp.src(css)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});


gulp.task("default", function () {
	return gulp.src(sources)
        .pipe(ngAnnotate())
        .pipe(concat("app.js"))
        .pipe(gulp.dest("."));
});

gulp.task("watch", ["default"], function () {
	gulp.watch(sources, ["default"]);
});
