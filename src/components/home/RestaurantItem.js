import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// funcion
export default function RestaurantItem({ navigation, ...props }) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 10 }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              id: restaurant.restaurantId,
              name: restaurant.restaurantName,
              image: restaurant.image,
              price: restaurant.price,
              reviews: restaurant.reviews,
              rating: restaurant.rating,
              restaurantType: restaurant.restaurantType,
              location: restaurant.location,
            })
          }
        >
          <View
            style={{
              marginVertical: 5,
              padding: 15,
              backgroundColor: "white",
              elevation: 3, // For Android shadow
              borderRadius: 15
            }}
          >
            <RestaurantImage image={restaurant.image} />
            <RestaurantInfo
              name={restaurant.restaurantName}
              rating={restaurant.rating}
              restaurantType={restaurant.restaurantType}
              reviews={restaurant.reviews}
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}
const RestaurantImage = (props) => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{
        width: "100%",
        height: 180,
      }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 0, margin: 15 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13 }}>Đặc sản: Miền {props.restaurantType}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>
        Đánh giá: {props.reviews}+
      </Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
