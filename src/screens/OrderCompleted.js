import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "./../common/utils";

export default function OrderCompleted({ navigation }) {
  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  var total = 0;
  for (let i = 0; i < items.length; i++)
    total += Number(items[i].price) * items[i].quantity;

  const dispatch = useDispatch();
  const resetSelectItem = () =>
    dispatch({
      type: "RESET_DATA",
    });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}
    >
      {/* checkbox animation */}
      <View>
        <LottieView
          style={{
            height: 100,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
          source={require("../../assets/animations/check.json")}
          autoPlay
          speed={0.5}
          // loop={false}
        />
        <Text
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "green",
            fontWeight: "bold",
          }}
        >
          {formatCurrency(total)}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          left: 20,
          top: 35,
          bottom: 10,
          zIndex: 1,
        }}
        onPress={() => (resetSelectItem(), navigation.navigate("Home"))}
      >
        <Ionicons name="arrow-back" size={40} color="black" />
      </TouchableOpacity>

      {/* //============================================ */}
      <ScrollView style={{ marginTop: 20 }}>
        {items.map((food, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 15,
                marginVertical: 10,
              }}
            >
              <FoodInfo food={food} />
              <FoodImage food={food} />
            </View>
            <View
              style={{
                width: "90%",
                height: 1,
                backgroundColor: "#838582",
                opacity: 0.3,
                marginLeft: "5%",
              }}
            />
          </View>
        ))}
      </ScrollView>

      {/* cooking  */}
      <LottieView
        style={{ height: 200, alignSelf: "center", marginBottom: 20 }}
        source={require("../../assets/animations/cooking.json")}
        autoPlay
        speed={0.5}
        // loop={false}
      />
    </SafeAreaView>
  );
}

//=============================================

//=============================================

const FoodInfo = ({ food }) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={{ fontSize: 19, fontWeight: "600" }}> {food.foodName} </Text>
    <Text style={{ fontStyle: "italic", color: "gray" }}>
      Số lượng: {food.quantity} {food.unit}
    </Text>
    <Text style={{ fontSize: 20, color: "green" }}>
      Tổng: {formatCurrency(Number(food.price) * food.quantity)}
    </Text>
  </View>
);

const FoodImage = ({food}) => (
  <View>
    <Image
      source={{ uri: food.image }}
      style={{
        width: 70,
        height: 70,
        borderRadius: 8,
      }}
    />
  </View>
);
