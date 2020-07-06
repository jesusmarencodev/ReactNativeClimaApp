import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Weather = ({resultAPI}) => {
  const {name, main} = resultAPI;
  if(!name || !main) return null;

  //grados kelvin
  const kelvin = 273.15;

	return (
		<>
			<View
        style={styles.weather}
      >
        <Text style={[styles.text, styles.current]}>
          {parseInt( main.temp -kelvin)}
          <Text style={styles.temp}>&#x2103;</Text>
          <Image
            style={{width: 66, height:58}}
            source={{uri: `http://openweathermap.org/img/w/${resultAPI.weather[0].icon}.png`}}
          />
        </Text>
        <View style={styles.temperatures}>
          <Text style={styles.text}>Min {' '}
            <Text style={styles.temperatures}>
              {parseInt(main.temp_min - kelvin)} &#x2103;
            </Text>
          </Text>
          <Text style={styles.text}>Max {' '}
            <Text style={styles.temperatures}>
              {parseInt(main.temp_max - kelvin)} &#x2103;
            </Text>
          </Text>
        </View>
      </View>
		</>
	);
};

export default Weather;

const styles = StyleSheet.create({
  weather : {
    marginBottom: 20,
  },
  text : {
    color : '#FFF',
    fontSize : 20,
    textAlign : 'center',
    marginRight :20
  },
  current: {
    fontSize : 80,
    marginRight :0,
    fontWeight : 'bold',
  },
  temp: {
    fontSize : 24,
    fontWeight : 'normal',
    fontWeight : 'bold',
  },
  temperatures : {
    flexDirection : 'row',
    justifyContent : 'center',
  }
});
