import React, { useContext } from 'react';
import { Store } from '../Store';
import { defaultStyles } from '../Styles/defaultStyles';
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Button } from "react-native";

const barcodelookupKey = 'wzurbryb09fb4vuigruxl1cdql0n6j';

export const BarcodeScannerPage = ({ navigation }) => {
  const {barcodeScanned, showScanner, setBarcodeScanned, setShowScanner} = useContext(Store);
  
  const handleBarCodeScanned = async ({ type, data }) => {
    setBarcodeScanned(true);
    setShowScanner(false);
    // delete console log
    console.log(`Bar code with type ${type} and data ${data} has been scanned`);
    const res = await fetch(`https://api.barcodelookup.com/v3/products?barcode=${data}&formatted=y&key=${barcodelookupKey}`);
    const info = await res.json();
    console.log(info);
  };
  
  const openScanner = () => {
    setShowScanner(true);
    setBarcodeScanned(false);
  }
  
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {showScanner && 
      <BarCodeScanner 
      onBarCodeScanned={barcodeScanned ? undefined : handleBarCodeScanned} 
      style={defaultStyles.barCodeScanner} />
      }
      <Button title='scan' onPress={openScanner} />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
