import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import _ from "lodash";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  API_GET_ALL_FOODORDERS_BY_ORDERID,
  API_GET_ALL_ORDER_BY_USERID,
} from "../Api/Contant";
import { formatCurrency, genDate } from "../common/utils";
import UserContext from "../context/UserContext";

export default function ({ navigation }) {
  const [user, setUser] = React.useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [check, setCheck] = useState(false); //false : mua hàng, true: đặt bàn

  useEffect(() => {
    getHistoryOrder();
  }, []);

  const getHistoryOrder = async () => {
    try {
      const response = await axios.get(
        API_GET_ALL_ORDER_BY_USERID(user?.userId)
      );
      const result = response?.data;
      if (result && result?.length != 0) {
        setOrders(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <HeaderAccount user={user} check={check} setCheck={setCheck} />
      <BodyHistory
        user={user}
        navigation={navigation}
        orders={orders}
        reservation={reservation}
      />
    </SafeAreaView>
  );
}

const HeaderAccount = (props) => {
  return (
    <View
      style={{ height: 100, alignItems: "center", backgroundColor: "#FFCC00" }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "white",
          marginTop: 30,
          position: "absolute",
        }}
      >
        Lịch sử
      </Text>
    </View>
  );
};

const BodyHistory = ({ user, navigation, orders }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodOrder, setFoodOrder] = useState([]);

  async function openModalVisible(orderId) {
    await getFoodOrderByOrderId(orderId);
    setModalVisible(true);
  }

  const getFoodOrderByOrderId = async (orderId) => {
    try {
      const response = await axios.get(
        API_GET_ALL_FOODORDERS_BY_ORDERID(orderId)
      );
      const result = response?.data;
      if (result && result?.length != 0) {
        setFoodOrder(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AntDesign
            name="closecircle"
            size={30}
            color="red"
            onPress={() => setModalVisible(false)}
          />
          <Text
            style={{
              fontSize: 18,
              fontStyle: "italic",
              fontWeight: "500",
              marginTop: 20,
            }}
          >
            Chi tiết đơn hàng
          </Text>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          {_.map(foodOrder, (item, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}
              >
                <View style={{ width: 240, justifyContent: "space-evenly" }}>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item?.food?.foodName}
                  </Text>
                  <Text style={{ fontStyle: "italic", color: "gray" }}>
                    Số lượng: {item?.quantity} {item?.food?.unit}
                  </Text>
                  <Text style={{ fontSize: 16, color: "green" }}>
                    Tổng:{" "}
                    {formatCurrency(Number(item?.food?.price) * item?.quantity)}
                  </Text>
                </View>
                <Image
                  source={{ uri: item?.food?.image }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                  }}
                />
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
      </View>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        collapsable={true}
      >
        {checkoutModalContent()}
      </Modal>

      <ScrollView
        style={{
          backgroundColor: "#FFCC00",
          marginTop: 10,
          width: 360,
          marginLeft: 20,
          borderRadius: 30,
          marginBottom: 20,
          padding: 20,
        }}
      >
        <>
          {orders && orders?.length == 0 ? (
            <LottieView
              style={{ height: 400, alignSelf: "center", marginBottom: 10 }}
              source={require("../../assets/animations/empty-state.json")}
              autoPlay
              speed={0.5}
            />
          ) : (
            <>
              {_.map(orders, (item, index) => (
                <View
                  key={index}
                  activeOpacity={1}
                  style={{ marginBottom: 30 }}
                >
                  <TouchableOpacity
                    onPress={async () => openModalVisible(item?.orderId)}
                  >
                    <ItemHistory
                      orderId={item?.orderId}
                      totalPrice={item?.totalPrice}
                      orderDate={item?.orderDate}
                      receivedDate={item?.receivedDate}
                      status={item?.status}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </>
      </ScrollView>
    </>
  );
};

const ItemHistory = ({
  orderId,
  totalPrice,
  orderDate,
  receivedDate,
  status,
}) => (
  <View
    style={{
      backgroundColor: "#fff",
      marginVertical: 10,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#eee",
      borderRadius: 10,
      elevation: 5, // For Android shadow
    }}
  >
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Text style={{ fontSize: 15, fontStyle: "italic", color: "gray" }}>
        Mã hóa đơn:
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {"Order_" + orderId}
      </Text>
    </View>
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Text style={{ fontSize: 15, fontStyle: "italic", color: "gray" }}>
        Thời gian đặt:
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {orderDate && genDate("DD/MM/YYYY HH:mm:ss", orderDate)}
      </Text>
    </View>
    {receivedDate && (
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 15, fontStyle: "italic", color: "gray" }}>
          Thời gian nhận:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {receivedDate && genDate("DD/MM/YYYY HH:mm:ss", receivedDate)}
        </Text>
      </View>
    )}
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Text style={{ fontSize: 15, fontStyle: "italic", color: "gray" }}>
        Trạng thái:
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {getStatusText(status)}
      </Text>
    </View>
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Text style={{ fontSize: 15, fontStyle: "italic", color: "gray" }}>
        Tổng tiền:
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ee4d2d" }}>
        {formatCurrency(totalPrice)}
      </Text>
    </View>
  </View>
);

const getStatusText = (status) => {
  switch (status) {
    case 1:
      return <Text style={{ color: "orange" }}>Chờ giao hàng</Text>;
    case 2:
      return <Text style={{ color: "green" }}>Đã giao hàng</Text>;
    case 3:
      return <Text style={{ color: "red" }}>Đã hủy</Text>;
    case 4:
      return <Text style={{ color: "blue" }}>Trả hàng</Text>;
    default:
      return <Text></Text>;
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    opacity: 0.95,
    padding: 16,
    height: 400,
    margin: 20,
    marginVertical: 100,
    elevation: 5,
    borderRadius: 10,
    flex: 1,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  subtotalText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
});
