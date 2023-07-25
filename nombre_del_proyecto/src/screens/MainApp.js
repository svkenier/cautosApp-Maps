import React from 'react'
import SigninScreen from './SigninScreen'
import { View } from 'react-native'
import RegisterScreen from './RegisterScreen'
import MapScreen from "./MapScreen";
import BrowserScreen from './BrowserScreen';


const MainApp = () => {
 
  return (
    <View>
       
       {/* <BrowserScreen/> */}
        <MapScreen /> 
      {/* <SigninScreen/> */}
        {/* <RegisterScreen/> */}
      
      
       

    </View>
  )
}

export default MainApp