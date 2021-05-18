require('@aliconnect/api');
aim.log('Start Tunnel')
aim()
.on('load', event => {
  console.log('Tunnel load');
})
.on('ready', event => {
  console.log('Tunnel READY');
})
