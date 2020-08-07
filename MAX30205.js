////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions for MAX30205 temperature reading

MAX30205.prototype.initialize = function(){ // 0 0 0 0 0 0 0 0
  temp_sensor.write8(C.REG_CONFIGURATION, 0x00); // i believe this is the correct configuration, all the choices seem to be optimal with 0
};

MAX30205.prototype.one_shot_conversion = function(){ //one-shot enabled 1 0 0 0 0 0 0 1
  temp_sensor.write8(C.REG_CONFIGURATION, 0x81);
};

MAX30205.prototype.shutdown = function(){ //shutdown with one-shot disabled 0 0 0 0 0 0 0 1
  temp_sensor.write8(C.REG_CONFIGURATION, 0x01);
};

MAX30205.prototype.getTemperature = function(temperature, unit){
  
  temperature = this.read8(C.REG_TEMPERATURE)[0];

  if(unit == 0){ 
    temperature = temperature;
  }else{
    temperature = 1.80 * (temperature) + 32.00;
  }

};
