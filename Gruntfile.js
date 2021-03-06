var fs = require('fs'),
	pkg = require('./package.json'),
	bannerTemplate = '/**\n' +
		' * <%= pkg.name %> - v<%= pkg.version %> (build date: <%= grunt.template.today("dd/mm/yyyy") %>)\n' +
		' * <%= pkg.url %>\n' +
		' * <%= pkg.description %>\n' +
		' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
		' * Licensed MIT\n' +
		' */\n',
	gruntConfig = {
		pkg: pkg,
		bumpup: {
			file: 'package.json'
		},
		uglify: {
			lib: {
				src: pkg.srcPath + 'observatorium.js',
				dest: pkg.srcPath + 'observatorium.min.js',
				options: {
					banner: bannerTemplate
				}
			}
		},
		qunit: {
			files: [pkg.testPath + '**/*.html']
		},
		jshint: {
			lint: pkg.srcPath + 'observatorium.js',
			options: {
				indent: 4,
				boss: true, // Позволяет делать присвоение в условиях `if (a = true) { ... }`
				undef: true, // Ругается на необъявленные переменные
				curly: true, // Обязует ставить { } при работе с if, for и т.д.
				forin: true, // Обязует использовать hasOwnProperty при работе с for in
				unused: true, // Ругается если переменная объявлена, но никогда не использовалась
				newcap: true, // Обязует все конструкторы называть с большой Буквы
				eqnull: true, // Отключает предупреждения при нестрогом сравнении с null (== null) 
				jquery: true, // Не ругается на jquery
				browser: true, // Не ругается на хостовые переменные браузера
				noempty: true, // Ругается если обнаружен пустой блок в js
				latedef: true, // Запрещает работать с переменными до того, как они были объявлены
				camelcase: true, // Все переменные должны быть только в camelCase
				quotmark: 'single', // Все ковычки должны быть одинарными
				scripturl: true, // Позволяет в урле использовать конструкции типа `javascript:0`
				'-W030': false, // Expected an assignment or function call and instead saw an expression
				globals: {
					module: true,
					define: true,
					require: true,
					console: true
				}
			}
		}
	};

module.exports = function(grunt) {
	// Инициализируем конфиг
	grunt.initConfig(gruntConfig);

	// Подключаем таски
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-bumpup');

	// Регистрируем кастомные таски
	grunt.registerTask('updatepkg', 'Update pkg version after bumpup.', function() {
		gruntConfig.pkg = grunt.file.readJSON('package.json');
		grunt.log.writeln('ok!');
	});

	// Регистрируем таски
	grunt.registerTask('default', ['jshint', 'bumpup:build', 'updatepkg', 'uglify', 'qunit']);
	grunt.registerTask('build', ['bumpup:build', 'updatepkg', 'uglify']);
	grunt.registerTask('travis', ['jshint', 'uglify', 'qunit']);
	grunt.registerTask('tests', 'qunit');
};
