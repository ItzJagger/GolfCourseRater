import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type GolfCourse = {
  id: string; 
  name: string;
  latitude: number;
  longitude: number;
};

export default function HomeScreen() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Location permission denied.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const mocktest: GolfCourse[] = [
    {
      id: "1",
      name: "Royal Ashburn",
      latitude: coords ? coords.latitude + 0.01 : 0,
      longitude: coords ? coords.longitude + 0.01 : 0,
    },
  ];

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Getting your location…</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation
    >
      <Marker coordinate={coords} title="You are here" />
      {mocktest.map((course)=>(
         <Marker
          key={course.id}
          coordinate={{ latitude: course.latitude, longitude: course.longitude }}
          title={course.name}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: "crimson",
    textAlign: "center",
  },
});
