module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['public/*.jsx'],
				tasks: ['react']
			}
		},
		react: {
		    files: {
		      expand: true,
		      cwd: 'public',
		      src: ['*.jsx'],
		      dest: 'public',
		      ext: '.js'
		    }
	  	}
	})

	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
}