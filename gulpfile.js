var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');

var targetDir = "static";

var jsSources = [
	"src/module.js",
	"src/**/*.js"
];

var templates = [
	"src/**/*.html"
];

var cssSources = [
	"src/**/*.scss"
];

gulp.task("sass", function () {
	return gulp.src(cssSources)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(targetDir + "/css"));
});

gulp.task("template", function () {
	return gulp.src(templates)
		.pipe(gulp.dest(targetDir));
});

gulp.task("js", function () {
	return gulp.src(jsSources)
				.pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat("app.js"))
				.pipe(sourcemaps.write())
        .pipe(gulp.dest(targetDir));
});

gulp.task("default", ["js", "template"]);

gulp.task("watch", ["default"], function () {
	gulp.watch(jsSources, ["js"]);
	gulp.watch(templates, ["template"]);
	// gulp.watch(cssSources, ["sass"]);
});
