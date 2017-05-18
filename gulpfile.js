'use strict'

const path = require('path')
const gulp = require('gulp')
const gulpfiles = require('gulpfiles')
const rename = require('gulp-rename')
const wrap = require('gulp-wrap')
const replace = require('gulp-replace')

const myPath = {
	src: './src/',
	dest: './dist/',
}
const scripts = {
	'main.js': [
		'./src/1.js',
		'./src/2.js',
	]
}

gulp.task('clean', gulpfiles.del({
	glob: path.join(myPath.dest, '*.*'),
}))

gulp.task('js', gulpfiles.concat({
	rules: scripts,
	dest: myPath.dest,
	config: {
		pipes: [
			{
				plugin: 'replace',
				config: [/\/\*\* DEBUG_INFO_START \*\*\//g, '/*'],
			},
			{
				plugin: 'replace',
				config: [/\/\*\* DEBUG_INFO_END \*\*\//g, '*/'],
			},
			{
				plugin: 'uglify',
				rename: 'main.min.js',
				config: {
					preserveComments: 'some',
				},
			}
		]
	},
}))

gulp.task('dist', gulp.series([
	'clean',
	'js',
]))
gulp.task('default', gulp.series('dist'))
