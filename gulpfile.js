var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");
var concat = require("gulp-concat");

var sources = [
	"ui/app.js",
	"ui/**/*.js"
];

gulp.task("default", function () {
	return gulp.src(sources)
        .pipe(ngAnnotate())
        .pipe(concat("app.js"))
        .pipe(gulp.dest("."));
});

gulp.task("watch", ["default"], function () {
	gulp.watch(sources, ["default"]);
});
