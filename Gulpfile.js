var gulp = require('gulp'),
	less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	sprite = require('gulp-sprite-generator'),
	newer = require('gulp-newer'),
	pngquant = require('imagemin-pngquant'),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),

	autoprefix = new LessPluginAutoPrefix({browsers: ["> 5%"]}),

	src = {
		css: 'lib/view/css/**/*',
		less: 'lib/view/css/less/style.less',
		mainJs: [
			'lib/view/js/modules/*'
		],
		img: 'lib/view/img/pre/**/*'
	},
	build = {
		mainJs: 'lib/view/js/main.js'
	};

//Получаем js
function js(jsVar) {
	jsVar = jsVar || 'mainJs';

	return gulp.src(src[jsVar])
		.pipe(newer(build[jsVar]))
		.pipe(concat(build[jsVar]))
		.pipe(gulp.dest("lib/view/js"))
}

//Мини-таски для разных js
gulp.task('mainJs', function() {js('mainJs')});


//Получаем css
gulp.task('less', function () {
    return gulp.src(src.less)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('lib/view/css'));
});

//Жмем картинки
gulp.task('imagemin', function () {
    return gulp.src(src.img)
        .pipe(newer('lib/view/img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('lib/view/img'));
});


// Чистим css & img
gulp.task('clean', function() {
    return gulp.src(['lib/view/css', 'lib/view/img'], {read: false})
        .pipe(clean());
});

// Действия по умолчанию
// Можно раскомментировать clean, чтобы в папке build убрать мусор
gulp.task('default', /*['clean'],*/ function(){
    gulp.start('mainJs', 'less', 'imagemin');

    // Отслеживаем изменения в файлах
    gulp.watch(src.mainJs, ['mainJs']);
    gulp.watch(src.css, ['less']);
    gulp.watch(src.img, ['imagemin']);
});