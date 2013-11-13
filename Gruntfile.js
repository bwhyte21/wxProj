module.exports = function(grunt){
	
	grunt.initConfig({
		//this is where the grunt tasks go

		//this is where the package info is read in
		pkg: grunt.file.readJSON('package.json'), //use comma if adding npm tasks

		shell: {
			gitclone: {
				command: ['ls',
				'git clone https://github.com/bwhyte21/another-grunt-test.git test_one',
				'ls'].join('&&')
			},
			options: {
				stdout: true
			}
		},

		'bower-install': {
			target: {
				//point to the html file that is to be updated
				html: 'index.html',

				//Optional:
				//ignorePath: 'foldername/',

				//customize how stylesheets are included
				cssPattern: '<link rel="stylesheet" href="{{filePath}}"/>',

				//customize how scripts are included
				jsPattern: '<script type="text/javascript" src="{{filePath}}"> </script>'
			}
		}
	});

	//feel free to load any npm tasks here
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-bower-install');

	//this is a custom/personal task; one you yourself can create using the magical world of JS functions! weee!
	grunt.registerTask('scratch','pulls project from git repo', function(name){ //'lame' is pretty much the folder name in which you would like it to be called; e.g.: grunt scratch:folderName
		grunt.log.writeln('Scratching self...'); //just some fancy text to display

		//run the shell script to pull a proj from github
		grunt.task.run(['shell']);

		grunt.log.writeln('Scratching complete!');
	});
	//this function uses bower to pull some files from my github
	grunt.registerTask('mate', function(name){
		var bower = require('bower'),
			bower_done = this.async();

//		bower.commands.info([name]);

		bower.commands.install([name])
		.on('log', function(result){
			grunt.log.writeln(['bower', result.id.cyan, result.message].join(' '));
		})
		.on('error', function(){
			bower_done(false);
		})
		.on('end', function(results){
			bower_done();

			//run grunt bower-install
			grunt.task.run('bower-install');
		});


	});
}