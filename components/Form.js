import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

const Form = ({search, setSearch, setConsult}) => {

  const { city, country } = search;

  //animate no se modifica con una funcion sino con la API de animate por eso no se necesita el setState
  const [animebtn] = useState(new Animated.Value(1));

  const entranceAnimation = () => {
    Animated.spring(animebtn, {
      toValue : .75
    }).start();
  }

  const exitAnimation = () => {
    Animated.spring(animebtn, {
      toValue : 1,
      friction: 1,
      tension : 30,
    }).start();
  }
  const animationStyle = {
    transform : [{scale:animebtn}]
  }

  //Validando el formulario y consultando el clima
  const checkWeather = () => {
    if(city.trim() === '' || country.trim() === ''){
      showAlert();
      return;
    }
    'consultando la API'
    setConsult(true);
  }
  //mostrar alerta
  const showAlert = () => {
    Alert.alert(
      'Error',
      'Add a city and country to the search',
      [{text : 'it is understood'}]
    )
  }

	return (
		<>
			<View style={styles.form}> 
        <View>
          <TextInput 
            value={city}
            onChangeText={cityParams => setSearch({...search, city:cityParams})}
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#667"
          />
        </View>
        <View>
          <Picker
            selectedValue={country}
            onValueChange={countryParams => setSearch({...search, country: countryParams})}
            style={{backgroundColor:'#FFF'}}
          >
            <Picker.Item label="--Select country--" value=""/>
            <Picker.Item label="EEUU" value="US"/>
            <Picker.Item label="MEXICO" value="MX"/>
            <Picker.Item label="ARGENTINA" value="AR"/>
            <Picker.Item label="COLOMBIA" value="CO"/>
            <Picker.Item label="COSTA RICA" value="CR"/>
            <Picker.Item label="SPAIN" value="ES"/>
            <Picker.Item label="PERU" value="PE"/>
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPress={() => checkWeather()}
          onPressIn={()=> entranceAnimation()}
          onPressOut={()=> exitAnimation()}
        >
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.txtSearch}>Search weather</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
		</>
	);
};

export default Form;

const styles = StyleSheet.create({

  input : {
    padding : 10,
    height : 50,
    backgroundColor : '#FFF',
    fontSize : 20,
    marginBottom : 20,
    textAlign : 'center'
  },
  btnSearch : {
    marginTop : 50,
    backgroundColor : '#000',
    padding : 10,
    justifyContent : 'center',
  },
  txtSearch : {
    color : '#FFF',
    fontWeight : 'bold',
    textTransform :'uppercase',
    textAlign : 'center',
    fontSize : 18
  }
});
