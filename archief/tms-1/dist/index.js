$ = new require('@aliconnect/sdk');
module.exports = {
  tunnel(config) {
    config.webroot = __dirname+'/public';
    console.log('tunnel', config, __dirname);
    return $.NodeApplication(config);
  }
};
//
//
//
// console.log('TMS')
// // require('@aliconnect/api');
// require(__dirname + '/lib/' + process.argv[2]);
// console.log('TMS1')
// // process.exit();
