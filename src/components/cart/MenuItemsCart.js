import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import _ from "lodash";
import LottieView from "lottie-react-native";
import moment from "moment";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API_CREATE_ORDER } from "../../Api/Contant";
import { formatCurrency } from "../../common/utils";
import UserContext from "../../context/UserContext";

export default function MenuItemsCart({ navigation }) {
  const [user, setUser] = React.useContext(UserContext);
  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  var total = 0;
  for (let i = 0; i < items.length; i++)
    total += Number(items[i].price) * items[i].quantity;

  const dispatch = useDispatch();
  const removeSelectItem = (item) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        ...item,
      },
    });

  const increaseQuantity = (item) =>
    dispatch({
      type: "INCREASE_THE_NUMBER_OF_PRODUCTS",
      payload: {
        ...item,
      },
    });

  const reduceQuantity = (item) =>
    dispatch({
      type: "REDUCE_THE_NUMBER_OF_PRODUCTS",
      payload: {
        ...item,
      },
    });

  // date time
  var showDate = new Date();
  var date =
    showDate.getDate() +
    "/" +
    (showDate.getMonth() + 1) +
    "/" +
    showDate.getFullYear();

  //====================CREATE======================
  const createOrder = async () => {
    const order = {
      user: {
        userId: user?.userId,
      },
      status: 1, // Khởi tạo,
      totalPrice: total,
      receivedDate: null,
      orderDate: moment(),
    };
    const foodOrderList = [];
    _.map(items, (elment, index) => {
      foodOrderList.push({
        food: {
          foodId: elment?.foodId,
        },
        quantity: elment?.quantity,
      });
    });
    try {
      const response = await axios.post(API_CREATE_ORDER, {
        order: order,
        foodOrderList: foodOrderList,
      });
      const result = response?.data;
      if (result?.orderId) {
        navigation.navigate("OrderCompleted");
      } else {
        alert("Có lỗi đã xảy ra!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //==================== RENDER ======================
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, marginTop: 10 }}>
      <ScrollView>
        {_.map(items, (food, index) => (
          <View
            key={index}
            style={{
              elevation: 3, // For Android shadow
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 15,
                padding: 10,
              }}
            >
              <Image
                source={{ uri: food?.image }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  marginTop: 10,
                }}
              />
              <FoodInfo food={food} />
            </View>

            <QuantityOder
              food={food}
              increaseQuantity={increaseQuantity}
              reduceQuantity={reduceQuantity}
              removeSelectItem={removeSelectItem}
            />
          </View>
        ))}
      </ScrollView>
      {total ? (
        <PayContainer
          total={total}
          navigation={navigation}
          createOrder={createOrder}
          date={date}
        />
      ) : (
        <EmptyCard />
      )}
    </SafeAreaView>
  );
}

const FoodInfo = ({ food }) => (
  <View style={{ width: 240, justifyContent: "space-evenly", marginLeft: 20 }}>
    <Text style={styles.titleStyle}> {food.foodName} </Text>
    <Text style={{ fontStyle: "italic", color: "gray" }}>
      {"Nhà hàng: "}
      <Text style={{ fontStyle: "normal", color: "black", fontWeight: "600" }}>
        {food.restaurantName}
      </Text>
    </Text>
    <Text style={{ fontStyle: "italic", color: "gray" }}>
      Giá: {formatCurrency(food.price)}/ {food.unit}
    </Text>
    <Text style={{ fontSize: 18, color: "#ee4d2d" }}>
      Tổng: {formatCurrency(Number(food.price) * food.quantity)}
    </Text>
  </View>
);

const QuantityOder = ({
  food,
  increaseQuantity,
  reduceQuantity,
  removeSelectItem,
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 8,
      alignContent: "center",
    }}
  >
    <TouchableOpacity onPress={() => increaseQuantity(food)}>
      <AntDesign
        name="pluscircle"
        size={20}
        color="green"
        style={{ marginTop: 4 }}
      />
    </TouchableOpacity>

    <Text style={{ fontSize: 22, color: "green", marginHorizontal: 15 }}>
      {food?.quantity}
    </Text>

    <TouchableOpacity onPress={() => reduceQuantity(food)}>
      <AntDesign
        name="minuscircle"
        size={20}
        color="green"
        style={{ marginTop: 4 }}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => removeSelectItem(food)}>
      <MaterialIcons
        name="delete"
        size={27}
        color="red"
        style={{ marginLeft: 4 }}
      />
    </TouchableOpacity>
  </View>
);

const EmptyCard = () => (
  <View
    style={{
      top: 50,
      left: 0,
      marginBottom: 10,
      position: "absolute",
      zIndex: 1,
      alignItems: "center",
    }}
  >
    <LottieView
      style={{ height: 400, alignSelf: "center" }}
      source={require("../../../assets/animations/empty-cart.json")}
      autoPlay
      speed={0.5}
      // loop={false}
    />
    <View style={{ flexDirection: "row" }}>
      <AntDesign name="warning" size={30} color="#ee4d2d" />
      <Text style={{ color: "#ee4d2d", fontSize: 25, marginLeft: 10 }}>
        Giỏ hàng trống
      </Text>
    </View>
  </View>
);

const PayContainer = ({ createOrder, navigation, date, total }) => (
  <View
    style={{
      backgroundColor: "#FFCC00",
      height: 200,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
    }}
  >
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text
        style={{ fontSize: 20, fontWeight: "bold", margin: 20, marginTop: 15 }}
      >
        Ngày
      </Text>
      <Text
        style={{ fontSize: 20, fontWeight: "bold", margin: 20, marginTop: 15 }}
      >
        {date}
      </Text>
    </View>

    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text
        style={{ fontSize: 20, fontWeight: "bold", margin: 20, marginTop: 0 }}
      >
        Tổng tiền
      </Text>
      <Text
        style={{ fontSize: 20, fontWeight: "bold", margin: 20, marginTop: 0 }}
      >
        {formatCurrency(total)}
      </Text>
    </View>

    <TouchableOpacity
      style={{
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        padding: 13,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#eee",
        marginTop: 10,
      }}
      onPress={() => {
        createOrder();
      }}
    >
      <Text style={{ color: "#fff", fontSize: 20 }}>Thanh toán</Text>
    </TouchableOpacity>
  </View>
);

//========================================================================================

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});
