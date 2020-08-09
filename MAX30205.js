E.setFlags({pretokenise:1});

//object that holds all relavant register addresses on the MAX30205
const C = {
  
  //main address
  I2C_ADDR: 0b1001000,
  
  //register address
  REG_TEMPERATURE: 0x00, //temperature data is stored here
  REG_CONFIGURATION: 0x01, //Set bit D0 to 1 to place the device in shutdown mode
  //Bit D5 selects the temperature data format for the temperature, TOS, and THYST registers. When D5 is 0 (normal format), the data format is two’s complement with a range of 0 C to +50 C.
  REG_T_HYST: 0x02, //temperature data is stored here
  REG_T_OS: 0x03 //temperature data is stored here

  //for temp,thyst, and tox, Bits D[15:0] contains the temperature data, with the LSB = 0.00390625 C and the MSB=sign bit
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//creates software I2C port for Espruino devices
function MAX30205(i2c) {
    this.i2c = i2c;
    this.ad = C.I2C_ADDR;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//basic function to read 8 bits (1 byte) from MAX30205 from a specified register via i2c
MAX30205.prototype.read8 = function(reg) {
    this.i2c.writeTo(this.ad, reg);
    return this.i2c.readFrom(this.ad,1);
};

//basic function to read 16 bits (2 bytes) from MAX30205 from a specified register via i2c
MAX30205.prototype.read16 = function(reg) {
    this.i2c.writeTo(this.ad, reg);
    return this.i2c.readFrom(this.ad,2);
};

//basic function to write 8 bits to a specified register in the MAX30205 via i2c
MAX30205.prototype.write8 = function(reg, value) {
    this.i2c.writeTo(this.ad, reg, value);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions for MAX30205 temperature reading

MAX30205.prototype.initialize = function(){ // 0 0 0 0 0 0 0 0
  temp_sensor.write8(C.REG_CONFIGURATION, 0x00); 
};

MAX30205.prototype.one_shot_mode = function(){
  temp_sensor.write8(C.REG_CONFIGURATION, 0x81);
};

MAX30205.prototype.shutdown = function(){
  temp_sensor.write8(C.REG_CONFIGURATION, 0x01);
};

MAX30205.prototype.getTemperature = function(temperature, unit){
  
  let raw_temperature = 0;
  raw_temperature = this.read16(C.REG_TEMPERATURE);
  temperature = ~(raw_temperature) - 1;
  
  if(unit == 1){ 
    temperature = 1.80 * (temperature) + 32.00;
  }

};
