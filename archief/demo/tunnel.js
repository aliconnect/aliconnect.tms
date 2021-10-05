console.log('tms-demo tunnel');
aimClient = new require('@rws-lts/tms').tunnel({
  config: {
    http: {
      port: 9001,
    }
  }
});

// console.log(aimClient);
