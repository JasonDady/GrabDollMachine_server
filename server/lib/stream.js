'use strict';

const Stream = require('node-rtsp-stream');

const stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://jason:jason@180.112.122.18:554/cam/realmonitor?channel=1&subtype=0',
  // streamUrl: 'rtsp://admin:jiang123456@192.168.1.108:554/cam/realmonitor?channel=1&subtype=1',
  wsPort: 8084,
});

console.log('stream: ', stream);
