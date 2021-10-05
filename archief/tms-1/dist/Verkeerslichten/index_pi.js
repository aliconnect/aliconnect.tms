require('./index.js');
const SERVO_BLASTER_PATH = "/dev/servoblaster";
/*
* We need to use write() with a buffer so that we can pass the position=-1 argument.
* This is needed, otherwise we get an error because node default write tries to seek
* in the file which is not possible (it's a FIFO).
*/
function writeCommand(cmd , path) {
	const buffer = new Buffer(cmd + "\n");
	const fd = fs.open(path, "w", undefined, function(err, fd) {
		if (err) {
      console.log("Error opening file: " + err);
    } else {
			fs.write(fd, buffer, 0, buffer.length, -1, function(error, written, buffer) {
        if (error) {
          console.log("Error occured writing to " + path + ": " + error);
        } else {
          fs.close(fd, (err) => {
            if (err) {
              console.error('Failed to close file', err);
            } else {
              // console.log("\n> File Closed successfully");
            }
          });
        }
			});
		}
	});
}

function setServoPos (pinNumber, angle) {
  const value = ( Math.floor((angle/180 * 0.9) * 100) + 33 );
  writeCommand(pinNumber + "=" + value + "%", SERVO_BLASTER_PATH);
}

AfsluitBomen = {
  setpos(pos) {
    setServoPos("P1-12", pos);
  },
  open() {
    this.setpos(0);
  },
  sluit() {
    this.setpos(90);
  },
}

const ON = 1;
const OFF = 0;
const pinNames = {
  rood: 0,
  geel: 1,
  groen: 2,
}
const standRIO = {
  gedoofd: {rood: OFF, geel: OFF, groen: OFF},
  rood: {rood: ON, geel: OFF, groen: OFF},
  geel: {rood: OFF, geel: ON, groen: OFF},
  groen: {rood: OFF, geel: OFF, groen: ON},
}
const rios = [];
const mcp23017 = require('@aliconnect/api/lib/mcp23017');
for (var i=0; i<1; i++) {
  rios.push(new mcp23017({
    address: 0x20 + i, //all address pins pulled low
    device: '/dev/i2c-1', // Model B
  }));
}

rios.forEach(rio => {
  rio.setOutput = (standen) => {
    for (let [pin, onoff] of Object.entries(standen)) {
      rio.digitalWrite(pin in pinNames ? pinNames[pin] : pin, onoff);
    }
  }
  for (var i = 0; i < 16; i++) {
    rio.pinMode(i, rio.OUTPUT);
  }
  for (var i = 0; i < 16; i++) {
    rio.digitalWrite(i, OFF);
  }
});

Verkeerslicht.prototype.setStand = function (stand) {
  this.rio = this.rio || rios[this.indexVerkeerslicht = this.parent.Verkeerslicht.indexOf(this)];
  // console.log(this.$id, 'setStand PI', stand, this.index, rio);
  if (this.rio) {
    this.rio.setOutput(standRIO[stand]);
  }
  this.Stand = stand;
}
