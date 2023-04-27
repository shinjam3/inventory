import React, { useState, useEffect } from "react";
import { barcodeScannerStyles } from "../Styles/barcodeScannerStyles";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { Text, View, Pressable } from "react-native";
import * as Linking from "expo-linking";

export const BarcodeScanner = ({ setScannedData, closeModal }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [barcodeScanned, setBarcodeScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openScanner = () => {
    if (hasPermission === false) {
      Linking.openURL("app-settings:");
      return;
    }
    setShowScanner(true);
    setBarcodeScanned(false);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setBarcodeScanned(true);
    setShowScanner(false);
    try {
      const res = await fetch(
        `https://api.upcitemdb.com/prod/trial/lookup?upc=${data}`
      );
      const json = await res.json();
      if (!json.items.length) {
        alert("Unable to find info on scanned item");
        return;
      }
      const name = json.items[0].title;
      setScannedData(name);
      closeModal();
    } catch {
      alert("Unable to find info on scanned item");
      closeModal();
    }
  };

  const renderScanner = () => {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasPermission === false) {
      return (
        <Text>
          No access to camera. Please enable Camera access in the app settings
        </Text>
      );
    } else {
      return showScanner ? (
        <Camera
          style={barcodeScannerStyles.barCodeScanner}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.ean13,
              BarCodeScanner.Constants.BarCodeType.ean8,
              BarCodeScanner.Constants.BarCodeType.upc_a,
              BarCodeScanner.Constants.BarCodeType.upc_e,
              BarCodeScanner.Constants.BarCodeType.upc_ean,
            ],
          }}
          onBarCodeScanned={barcodeScanned ? undefined : handleBarCodeScanned}
        />
      ) : (
        <Pressable style={barcodeScannerStyles.placeholder} onPress={openScanner}>
          <Text style={barcodeScannerStyles.placeholderText}>Scan</Text>
        </Pressable>
      );
    }
  };

  return <View style={barcodeScannerStyles.content}>{renderScanner()}</View>;
};
