'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-docular');

  grunt.initConfig({
    env: grunt.option('env') || 'development',
    loopback_sdk_angular: {
      services: {
        options: {
          input: './server/server.js',
          output: 'client/lb-service.js',
          apiUrl: (grunt.option('apiHost') || 'http://0.0.0.0') + '/api',
        },
      },
    },
    docular: {
      groups: [
        {
          groupTitle: 'LoopBack',
          groupId: 'loopback',
          sections: [
            {
              id: 'lbServices',
              title: 'LoopBack Services',
              scripts: ['js/lb-services.js'],
            },
          ],
        },
      ],
    },
  });

  grunt.config('clean', {
    src: [
      'swagger/*.*',
    ],
  });
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.config('convert', {
    yml2json: {
      files: [
        {
          expand: true,
          cwd: 'swagger-yaml/',
          src: ['*.yaml'],
          dest: 'swagger/',
          ext: '.json',
        },
      ],
    },
  });
  grunt.loadNpmTasks('grunt-convert');

  grunt.config('updateJson', {
    options: {
      src: 'server/configuration/<%= env %>.config.json',
      indent: '\t',
    },
    // update loopback config.json
    loopbackConfig: {
      dest: 'server/config.json',
      fields: {
        port: null,
      },
    },
  });
  grunt.loadNpmTasks('grunt-update-json');

  grunt.registerTask('swagger', [
    'clean',
    'convert',
    'updateJson',
  ]);

  grunt.registerTask('angular', [
    'loopback_sdk_angular',
    // 'docular',
  ]);
};
