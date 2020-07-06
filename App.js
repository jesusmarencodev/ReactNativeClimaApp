import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Form from './components/Form'
import Weather from './components/Weather'

const App = () => {

  const [search, setSearch] = useState({
    city : '',
    country : ''
  })

  const [consult, setConsult] = useState(false);
  const [resultAPI, setResultAPI] = useState({});
  const {city, country} = search;
  const [bgColor, setBgColor] = useState('rgb(71, 149, 212)');

  useEffect(()=>{ 
    const consultWeather = async () => {
      if(consult){
        const key = `9fd35b9802a9d46cb6e17671885a9561`;
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`
        try {
          const response = await fetch(url);
          const result = await response.json();
          setResultAPI(result)

          //Modifica los colores de fondo basados en la temperatura

          const kelvin  = 273.15;
          const {main}  = result;

          const current = main.temp - kelvin;
          
          if(current < 10){
            setBgColor('rgb(105, 108, 149)');
          }else if(current >= 10 && current < 25){
            setBgColor('rgb(71, 149, 212)');
          }else{
            setBgColor('rgb(178, 28, 61)');
          }
        } catch (error) {
          showAlert();
        }
      }
    }
    consultWeather();
    setConsult(false);
  },[consult])

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  //mostrar alerta
  const showAlert = () => {
    Alert.alert(
      'Error',
      'City or country not fount',
      [{text : 'it is understood'}]
    )
  }

 //Background color
 const bgColorApp = {
   backgroundColor : bgColor,
 }

  return (
    <>
    <TouchableWithoutFeedback onPress={()=> hideKeyboard()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.content}>
          {resultAPI.name &&
            (
              <Weather
                resultAPI={resultAPI}
              />
            )
          }
          <Form 
            search={search}
            setSearch={setSearch}
            setConsult={setConsult}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  app:{
    flex :1,
    justifyContent : 'center'
  },
  content : {
    marginHorizontal :'2.5%',

  }
})
