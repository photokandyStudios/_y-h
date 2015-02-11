// based on http://stackoverflow.com/a/28088306/741043
var gulp = require("gulp");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var to5ify = require("6to5ify");
var uglify = require("gulp-uglify");

function doBuild( buildMode ) {
  var isRelease = (buildMode === "release");

  browserify("./index.js", { debug: !isRelease, standalone: "h" })
    .transform(to5ify)
    .bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source("yasmf-h" + ((isRelease) ? ".min" : "") + ".js"))
    .pipe(buffer())
    .pipe(isRelease ? gutil.noop() : sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(isRelease ? uglify() : gutil.noop())
    .pipe(isRelease ? gutil.noop() : sourcemaps.write(".")) // writes .map file
    .pipe(gulp.dest("./build"));
}


gulp.task("build-regular", doBuild.bind(null, "debug"));
gulp.task("build-minify", doBuild.bind(null, "release"));
gulp.task("build", ["build-regular", "build-minify"]);
gulp.task("default", ["build"]);

