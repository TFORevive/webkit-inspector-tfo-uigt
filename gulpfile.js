const fs = require("fs");
const gulp = require("gulp");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const svgToMiniDataURI = require("mini-svg-data-uri");
const DatauriParser = require("datauri/parser");
const datauriParser = new DatauriParser();

gulp.task("scripts", async () => {
    return gulp.src([
        "inspector/FakeImportScripts.js",
        "inspector/CodeMirror.js",
        "inspector/Esprima.js",
        //"inspector/Workers/Formatter/FormatterUtilities.js",
        "inspector/Workers/Formatter/FormatterContentBuilder.js",
        "inspector/Workers/Formatter/FormatterWorker.js",
        "inspector/Workers/Formatter/ESTreeWalker.js",
        "inspector/Workers/Formatter/EsprimaFormatter.js",
        "inspector/Workers/HeapSnapshot/HeapSnapshot.js",
        "inspector/Workers/HeapSnapshot/HeapSnapshotWorker.js",
        "inspector/Main.js",
        "inspector/Protocol/Legacy/7.0/InspectorBackendCommands.js"
    ])
        .pipe( replace(
            /\"Images\/([A-Za-z0-9\/]*)\.svg\"/g, (full, capture) => {
                //console.log(capture);
                return '"' + svgToMiniDataURI( fs.readFileSync("inspector/Images/" + capture + ".svg").toString() ) + '"';
        }) )
        .pipe( replace(
            /\"Images\/([A-Za-z0-9\/]*)\.png\"/g, (full, capture) => {
                //console.log(capture);
                return '"' + datauriParser.format( '.png', fs.readFileSync("inspector/Images/" + capture + ".png") ).content + '"';
        }) )
        .pipe( concat("main.js") )
        .pipe( gulp.dest("dist/") );
});

gulp.task("css", () => {
    const postcss = require("gulp-postcss");
    const url = require("postcss-url");

    return gulp.src([
        "inspector/CodeMirror.css",
        "inspector/Main.css",
    ])
        .pipe( postcss([ url({ url: "inline" }) ]) )
        .pipe( concat("main.css") )
        .pipe( gulp.dest("dist/") );
});

gulp.task("copyImages", () => {
    return gulp.src([
        //"inspector/Images/VisualStyleNone.svg",
        //"inspector/Images/VisualStylePropertyLinked.svg",
        //"inspector/Images/VisualStylePropertyUnlinked.svg",
        //"inspector/Images/BackArrow.png",
        //"inspector/Images/ForwardArrow.png",
    ])
        .pipe( gulp.dest("dist/Images/") );
});

gulp.task("copyHtml", () => {
    return gulp.src([
        "inspector/inspector.html",
        "inspector/inspectorPageIndex.html",
    ])
        .pipe( gulp.dest("dist/") );
});

gulp.task("default", gulp.parallel(["scripts", "css", "copyHtml"/*, "copyImages"*/]));
