import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, FlatList, Pressable } from "react-native";
import * as Crypto from "expo-crypto";
import { Store } from "../Store";
import { SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";
import { saveLocalData, getLocalData, cloneStorageUnit } from "../utils";
import { StorageUnitListItem } from "./StorageUnitListItem";
import { AddNewStorageModal } from "./AddNewStorageModal";
import { StorageUnitOptions } from "./StorageUnitOptions";
import { Notifications } from "./Notifications";

import { defaultStyles } from "../Styles/defaultStyles";
import { homePageStyles } from "../Styles/homePageStyles";
import { CustomModal } from "./CustomModal";

export const HomePage = ({ navigation }) => {
  const { storageUnits, setStorageUnits } = useContext(Store);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(undefined);
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const getDataFromDevice = async () => {
      try {
        const dataFromDevice = await getLocalData();
        if (Array.isArray(dataFromDevice) && dataFromDevice.length) {
          setStorageUnits(dataFromDevice);
          const notifs = [];
          const todaysDate = new Date();
          dataFromDevice.forEach((unit) => {
            unit.items?.forEach((item) => {
              const expDateMoment = moment(item.expiryDate, "MMMM Do, YYYY");
              const expDateNotifMoment = moment(item.expiryDateNotif, "MMMM Do, YYYY");
              const datesAreValid = expDateMoment.isValid() && expDateNotifMoment.isValid();
              const isBetweenNotifAndExpDate =
                datesAreValid &&
                moment(todaysDate).isBetween(expDateNotifMoment, expDateMoment, "day");
              const todayNotifDate = datesAreValid && expDateNotifMoment.isSame(todaysDate, "day");
              const todayExpDate = datesAreValid && expDateMoment.isSame(todaysDate, "day");
              if (todayNotifDate || isBetweenNotifAndExpDate || todayExpDate) {
                const daysDiff = expDateMoment.diff(todaysDate, "days");
                const notifMsg = `${item.name} from ${unit.name} is expiring in ${daysDiff} ${
                  daysDiff === 1 ? "day" : "days"
                }`;
                notifs.push(notifMsg);
              }
            });
          });
          setNotifications(notifs);
        }
      } catch (e) {
        alert("Error: could not retrieve saved data from device storage");
      }
    };
    getDataFromDevice();
  }, []);

  const handleSubmitName = async (submittedName) => {
    setShowAddModal(false);
    const newUnit = {
      id: Crypto.randomUUID(),
      name: submittedName,
      items: [],
    };
    const newUnits = [newUnit, ...storageUnits];
    setStorageUnits(newUnits);
    await saveLocalData(newUnits);
  };

  const handleToStorageUnitPage = () => navigation.navigate("StorageUnitPage");

  const handleOpenOptions = (unitData) => {
    setShowOptions(true);
    setSelectedUnit(unitData);
  };

  const handleRenameUnit = async (unitId, newName) => {
    const renameUnit = storageUnits.find((unit) => unit.id === unitId);
    if (renameUnit) renameUnit.name = newName;
    const storageUnitsClone = cloneStorageUnit(storageUnits);
    await saveLocalData(storageUnitsClone);
  };

  const handleDeleteUnit = async (unitId) => {
    const filtered = storageUnits.filter((unit) => unit.id !== unitId);
    setStorageUnits(filtered);
    await saveLocalData(filtered);
  };

  const closeNotification = (idx) => {
    setNotifications(notifications.filter((notif, index) => index !== idx));
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.appTitle}>INVENTORY</Text>
      <View style={homePageStyles.subtitleContainer}>
        <View style={homePageStyles.notificationBell}>
          <SimpleLineIcons name="bell" size={30} onPress={() => setShowNotifs(true)} />
        </View>
        <Text style={homePageStyles.pageTitle}>Storage Units</Text>
        <View style={homePageStyles.subtitleFiller} />
      </View>
      <View style={defaultStyles.contentContainer}>
        {storageUnits.length ? (
          // have to put FlatList container styles in a View that wraps the list
          <View style={homePageStyles.flatListContainer}>
            <FlatList
              bounces={false}
              data={storageUnits}
              renderItem={({ item }) => (
                <StorageUnitListItem
                  data={item}
                  toStorageUnitPage={handleToStorageUnitPage}
                  openOptions={handleOpenOptions}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        ) : (
          <Text style={homePageStyles.noUnitsText}>No storage units</Text>
        )}
        <Pressable style={homePageStyles.addButton} onPress={() => setShowAddModal(true)}>
          <SimpleLineIcons name="plus" size={40} color="black" />
        </Pressable>
        <CustomModal isVisible={showNotifs} closeModal={() => setShowNotifs(false)}>
          {notifications.length ? (
            <View>
              <Text style={homePageStyles.notificationsModalTitle}>Notifications</Text>
              <Notifications notifs={notifications} closeNotif={closeNotification} />
            </View>
          ) : (
            <Text style={homePageStyles.notificationsModalTitle}>No Notifications</Text>
          )}
        </CustomModal>
        <AddNewStorageModal
          isVisible={showAddModal}
          submitName={handleSubmitName}
          closeModal={() => setShowAddModal(false)}
        />
        {selectedUnit && (
          <StorageUnitOptions
            unitData={selectedUnit}
            isVisible={showOptions}
            toStorageUnitPage={handleToStorageUnitPage}
            renameStorageUnit={handleRenameUnit}
            deleteStorageUnit={handleDeleteUnit}
            closeOptions={() => setShowOptions(false)}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
