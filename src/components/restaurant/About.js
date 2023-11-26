import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function About({ navigation, ...props }) {
  const { id, name, image, price, reviews, rating, restaurantType, location } =
    props.route.params;

  const description = `${restaurantType} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View style={{ backgroundColor: "#FFCC00", borderWidth: 2 }}>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
      <Map navigation={navigation} location={location} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {props.description}
  </Text>
);

const Map = (props) => (
  <View>
    <TouchableOpacity
      style={{
        position: "absolute",
        padding: 10,
        margin: 10,
        bottom: 0,
        right: 0,
        borderRadius: 100,
        backgroundColor: "black",
        marginBottom: 30,
        borderWidth: 1,
        borderColor: "#eee",
      }}
      onPress={() =>
        props.navigation.navigate("Map", {
          location: props.location,
        })
      }
    >
      <Entypo name="location" size={15} color="white" />
    </TouchableOpacity>
    <Text
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 5,
        paddingRight: 15,
      }}
    >
      GPS
    </Text>
  </View>
);
