(function(){
  RIJSTROOK_BREEDTE = 3.4;
  RIJSTROKEN = 2;
  TUNNEL_LENGTE = 614;
  BUIS_HOOGTE = 4.2;
  BUIS_WAND_DIKTE = 0.6;
  ASFALT_STROOK_BREEDTE = 0.5;
  AFSTAND_TUNNEL_VERKEERSLICHTEN = 50;
  AFSTAND_VERKEERSLICHTEN_CAMERA = 50;
  POS_STOP = (TUNNEL_LENGTE + AFSTAND_TUNNEL_VERKEERSLICHTEN + 5) / 2;
  STAND = 'gedoofd';

  aim().extend({
    preset_default: [
      { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
      { name: "tegen", rx: 10, ry: -180, rz: 0, zoom: 1 },
      { name: "hulppost", rx: -10, ry: -20, rz: 0, zoom: 1.5 },
      { name: "vluchtdeur", rx: -10, ry: -30, rz: 0, zoom: 1 },
      { name: "sos", rx: -25, ry: 0, rz: 0, zoom: 1 },
      { name: "hulppost2", rx: -10, ry: 20, rz: 0, zoom: 1.5 },
      //{ rx: 20, ry: -180, rz: 0, zoom: 1 },
      //{ rx: 20, ry: -190, rz: 0, zoom: 1 },
      //{ rx: 20, ry: -200, rz: 0, zoom: 1 },
      //{ rx: -20, ry: -340, rz: 0, zoom: 1 },
      //{ rx: -20, ry: -350, rz: 0, zoom: 1 },
    ],
    kanalen: [
      // Eerste rij kanalen
      // { left: 480, top: 360, width: 960, height: 720, cameraID: 4, },
      // { left: 0, top: 0, width: 480, height: 360, cameraID: 2, },
      // { left: 480, top: 0, width: 480, height: 360, cameraID: 3, },
      // { left: 960, top: 0, width: 480, height: 360, cameraID: 4, },
      // { left: 0, top: 360, width: 480, height: 360, cameraID: 5, },
      // { left: 0, top: 720, width: 480, height: 360, cameraID: 6, },
      // { left: 0, top: 1080, width: 480, height: 360, cameraID: 7, },
      // { left: 480, top: 1080, width: 480, height: 360, cameraID: 8, },
      // { left: 960, top: 1080, width: 480, height: 360, cameraID: 9, },


      // { left: 1440, top: 360, width: 960, height: 720, cameraID: 1, },
      // { left: 1440, top: 0, width: 480, height: 360, cameraID: 4, },
      // { left: 1920, top: 0, width: 480, height: 360, cameraID: 5, },
      // { left: 2400, top: 0, width: 480, height: 360, cameraID: 6, },

      // { left: 2400, top: 360, width: 480, height: 360, cameraID: 9, },
      // { left: 2400, top: 720, width: 480, height: 360, cameraID: 10, },
      // { left: 1440, top: 1080, width: 480, height: 360, cameraID: 14, },
      // { left: 1920, top: 1080, width: 480, height: 360, cameraID: 15, },
      // { left: 2400, top: 1080, width: 480, height: 360, cameraID: 16, },



      //A1: { left: 0, top: 0, width: 480, height: 360 },
      //A2: { left: 480, top: 0, width: 480, height: 360 },
      //A3: { left: 960, top: 0, width: 480, height: 360 },
      //A4: { left: 1440, top: 0, width: 480, height: 360 },
      //A5: { left: 1920, top: 0, width: 480, height: 360 },
      //A6: { left: 2400, top: 0, width: 480, height: 360 },
      //A7: { left: 2880, top: 0, width: 480, height: 360 },
      //A8: { left: 3360, top: 0, width: 480, height: 360 },
      //A9: { left: 3840, top: 0, width: 480, height: 360 },
      //A10: { left: 4320, top: 0, width: 480, height: 360 },
      //A11: { left: 4800, top: 0, width: 480, height: 360 },
      //A12: { left: 5280, top: 0, width: 480, height: 360 },

      //// Tweede rij kanalen
      //B1: { left: 0, top: 360, width: 480, height: 360 },
      //B2: { left: 480, top: 360, width: 480, height: 360 },
      //B3: { left: 960, top: 360, width: 480, height: 360 },
      //B4: { left: 1440, top: 360, width: 480, height: 360 },
      //B5: { left: 1920, top: 360, width: 480, height: 360 },
      //B6: { left: 2400, top: 360, width: 480, height: 360 },
      //B7: { left: 2880, top: 360, width: 480, height: 360 },
      //B8: { left: 3360, top: 360, width: 480, height: 360 },
      //B9: { left: 3840, top: 360, width: 480, height: 360 },
      //B10: { left: 4320, top: 360, width: 480, height: 360 },
      //B11: { left: 4800, top: 360, width: 480, height: 360 },
      //B12: { left: 5280, top: 360, width: 480, height: 360 },

      //// Derde rij kanalen
      //C1: { left: 0, top: 720, width: 480, height: 360 },
      //C2: { left: 480, top: 720, width: 480, height: 360 },
      //C3: { left: 960, top: 720, width: 480, height: 360 },
      //C4: { left: 1440, top: 720, width: 480, height: 360 },
      //C5: { left: 1920, top: 720, width: 480, height: 360 },
      //C6: { left: 2400, top: 720, width: 480, height: 360 },
      //C7: { left: 2880, top: 720, width: 480, height: 360 },
      //C8: { left: 3360, top: 720, width: 480, height: 360 },
      //C9: { left: 3840, top: 720, width: 480, height: 360 },
      //C10: { left: 4320, top: 720, width: 480, height: 360 },
      //C11: { left: 4800, top: 720, width: 480, height: 360 },
      //C12: { left: 5280, top: 720, width: 480, height: 360 },

      //// Vierde rij kanalen
      //D1: { left: 0, top: 1080, width: 480, height: 360 },
      //D2: { left: 480, top: 1080, width: 480, height: 360 },
      //D3: { left: 960, top: 1080, width: 480, height: 360 },
      //D4: { left: 1440, top: 1080, width: 480, height: 360 },
      //D5: { left: 1920, top: 1080, width: 480, height: 360 },
      //D6: { left: 2400, top: 1080, width: 480, height: 360 },
      //D7: { left: 2880, top: 1080, width: 480, height: 360 },
      //D8: { left: 3360, top: 1080, width: 480, height: 360 },
      //D9: { left: 3840, top: 1080, width: 480, height: 360 },
      //D10: { left: 4320, top: 1080, width: 480, height: 360 },
      //D11: { left: 4800, top: 1080, width: 480, height: 360 },
      //D12: { left: 5280, top: 1080, width: 480, height: 360 },

      //// Vijfde rij kanalen
      //E1: { left: 0, top: 1440, width: 640, height: 480 },
      //E2: { left: 640, top: 1440, width: 640, height: 480 },
      //E3: { left: 1280, top: 1440, width: 640, height: 480 },
      //E4: { left: 1920, top: 1440, width: 640, height: 480 },
      //E5: { left: 2560, top: 1440, width: 640, height: 480 },
      //E6: { left: 3200, top: 1440, width: 640, height: 480 },
      //E7: { left: 3840, top: 1440, width: 640, height: 480 },
      //E8: { left: 4480, top: 1440, width: 640, height: 480 },
      //E9: { left: 5120, top: 1440, width: 640, height: 480 },

      //// Zesde rij kanalen
      //F1: { left: 0, top: 1920, width: 320, height: 240 },
      //F2: { left: 320, top: 1920, width: 320, height: 240 },
      //F3: { left: 640, top: 1920, width: 320, height: 240 },
      //F4: { left: 960, top: 1920, width: 320, height: 240 },
      //F5: { left: 1280, top: 1920, width: 320, height: 240 },
      //F6: { left: 1600, top: 1920, width: 320, height: 240 },
      //F7: { left: 1920, top: 1920, width: 320, height: 240 },
      //F8: { left: 2240, top: 1920, width: 320, height: 240 },
      //F9: { left: 2560, top: 1920, width: 320, height: 240 },
      //F10: { left: 2880, top: 1920, width: 320, height: 240 },
      //F11: { left: 3200, top: 1920, width: 320, height: 240 },
      //F12: { left: 3520, top: 1920, width: 320, height: 240 },
      //F13: { left: 3840, top: 1920, width: 320, height: 240 },
      //F14: { left: 4160, top: 1920, width: 320, height: 240 },
      //F15: { left: 4480, top: 1920, width: 320, height: 240 },
      //F16: { left: 4800, top: 1920, width: 320, height: 240 },
      //F17: { left: 5120, top: 1920, width: 320, height: 240 },
      //F18: { left: 5440, top: 1920, width: 320, height: 240 },

      // Schouwkanalen
      //S1: { left: 960, top: 1440, width: 960, height: 720 },
      //S2: { left: 1920, top: 1440, width: 960, height: 720 },
      //S3: { left: 2880, top: 1440, width: 960, height: 720 },
      //S4: { left: 3840, top: 1440, width: 960, height: 720 },
    ],
    kanaal_id: 0,
    // kanaalID: 'E1',
  });

  // aim().tunnel = {
  //   length: 600,
  //   rijstrookbreedte: 3.4,
  //   rijstroken: 2,
  //   buis: {
  //     height: 4,
  //   },
  //   // length: 2000,
  // };

  return;
  // TODO: MAX. werkt niet, uitzoeken

  aim().cameras = Object.assign([], {
    // 0: {
    //   x: - RIJSTROOK_BREEDTE * RIJSTROKEN / 2 - 2,
    //   y: BUIS_HOOGTE,
    //   z: (TUNNEL_LENGTE + AFSTAND_TUNNEL_VERKEERSLICHTEN + AFSTAND_VERKEERSLICHTEN_CAMERA) / 2,
    //   presetID: 0,
    //   preset: Object.assign([], {
    //     0: { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
    //
    //     0: { name: "mee", rx: -20, ry: 0, rz: 0, zoom: 1 },
    //
    //     1: { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
    //   }),
    // },
    // 1: {
    //   // x: - RIJSTROOK_BREEDTE * RIJSTROKEN / 2 - 2,
    //   // y: BUIS_HOOGTE,
    //   // z: (TUNNEL_LENGTE + AFSTAND_TUNNEL_VERKEERSLICHTEN + AFSTAND_VERKEERSLICHTEN_CAMERA) / 2,
    //   preset: Object.assign([], {
    //     0: { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
    //
    //     0: { name: "mee", rx: -20, ry: 0, rz: 0, zoom: 1 },
    //
    //     1: { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
    //   }),
    // },
    //5: {
    //	//url: 'https://vm06.ssf.videomanager.info:9006/livefeed?oid=1&auth=1454ddc6-c4c6-4fa3-a279-7ad516c9d9b7&size=640x524',
    //	url: "https://vm06.ssf.videomanager.info:9006/livefeed?oid=1&auth=1454ddc6-c4c6-4fa3-a279-7ad516c9d9b7",
    //	url: "https://www.thenorthernecho.co.uk/resources/images/6611754.jpg?display=1&htype=0&type=responsive-gallery",
    //	presetID: 0,
    //	preset: Object.assign([], {
    //		0: { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
    //		1: { name: "mee", rx: -10, ry: 0, rz: 0, zoom: 1 },
    //	}),
    //},
    // start: TUNNEL_LENGTE + 40,
    // eind: - TUNNEL_LENGTE - 20,
    afstand: 60,
  });


  for (var i = 0; i < 100; i++) {
    var p = (TUNNEL_LENGTE / 2) - 20 + 5 * aim().cameras.afstand - i * aim().cameras.afstand;
    if (p < - TUNNEL_LENGTE / 2 - 5 * aim().cameras.afstand) break;
    aim().cameras[i] = Object.assign({
      id: i,
      x: 5 + (p < - TUNNEL_LENGTE / 2 || p > TUNNEL_LENGTE / 2 ? - RIJSTROOK_BREEDTE * RIJSTROKEN / 2 - 1 : 0),
      y: BUIS_HOOGTE - 0.4,
      z: p,
      presetID: 0,
      preset: aim().preset_default,
    },aim().cameras[i]);
  }
})()
