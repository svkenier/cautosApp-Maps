import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { GOOGLE_MAPS_KEY } from "@env";
import { TextInput } from "@react-native-material/core";
import useBrowserAddress from "../hooks/useBrowserAddress";


const MapScreen = () => {
  
  const {address} = useBrowserAddress()



  const [origin, setOrigin] = useState({
    latitude: 10.65274,
    longitude: -71.63019
  });
  
  const [destination, setDestination] = useState({
    latitude: -33.471782,
    longitude: -70.624515
  });

 




  
  const getCurrentPosition = async () => {
    const currentPosition = await Location.getCurrentPositionAsync({});
    // console.log(
    //   "currentPosition",
    //   currentPosition.coords.latitude,
    //   currentPosition.coords.longitude
    // );
    let latitude = currentPosition.coords.latitude;
    let longitude = currentPosition.coords.longitude;

    // setOrigin({
    //    latitude ,
    //    longitude
    //  });
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // El usuario no ha otorgado permiso para acceder a la ubicación
      }
  
      getCurrentPosition();
    };
  
    requestPermissions();
  }, []);


  
  useEffect(() => {
    const getLocationInfo = async () => {
      Location.geocodeAsync(address)
      .then(result => {
        const latitude = result[0].latitude;
        const longitude = result[0].longitude;
        
        // setDestination({latitude,longitude})
      })
      .catch(error => console.log(error));
    };
    getLocationInfo();
  }, [address]);
  
  console.log("destino",destination)
  console.log("origen",origin)


  return (
    <View style={styles.container}>


     

      <MapView
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{ latitude: origin.latitude, longitude: origin.longitude }}
          draggable={true}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          draggable={true}
          onDragEnd={(direction) =>
            setDestination(direction.nativeEvent.coordinate)
          }
        />
        <MapViewDirections
          origin={{ latitude: origin.latitude, longitude: origin.longitude }}
          destination={{latitude:destination.latitude,longitude:destination.longitude}}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="#3C5DDC"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
