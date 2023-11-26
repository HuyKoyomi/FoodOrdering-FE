import { AntDesign } from "@expo/vector-icons";
import _ from "lodash";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../common/utils";
import OderItem from "./OderItem";

const windowWidth = Dimensions.get("window").width;

export default function ViewCart({ navigation }) {
  // tao modal
  const [modalVisible, setModalVisible] = useState(false);
  // của sổ modal hiện ra
  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <AntDesign
            style={{ position: "absolute", marginLeft: 80, marginTop: 15 }}
            name="checkcircle"
            size={30}
            color="green"
          />
          <Text style={styles.restaurantName}>Thêm Thành công</Text>
          <ScrollView style={{}}>
            {_.map(items, (item, index) => (
              <OderItem key={index} item={item} />
            ))}
          </ScrollView>

          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Tổng tiền</Text>
            <Text style={{ color: "#ee4d2d", fontWeight: "600", fontSize: 16 }}>
              {formatCurrency(total)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                marginTop: 20,
                padding: 13,
                alignItems: "center",
                borderRadius: 30,
                width: 300,
                position: "relative",
                flexDirection: "row",
                justifyContent: "flex-end",
                borderWidth: 1,
                borderColor: "#eee",
              }}
              onPress={() => (
                setModalVisible(false), navigation.navigate("Cart")
              )}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                Mua hàng
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  marginRight: 10,
                  backgroundColor: "red",
                  fontStyle: "italic",
                }}
              >
                {formatCurrency(total)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  //--------------------------------------------------------
  const { items } = useSelector((state) => state.cartReducer.selectedItems);

  const total = items
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  //---------------------------------------------------------

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>

      {total ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 10,
            zIndex: 9,
            width: 300,
            marginLeft: (windowWidth - 300) * 0.5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
                flexDirection: "row",
                justifyContent: "flex-end",
                borderWidth: 1,
                borderColor: "#eee",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 20 }}>
                Thêm vào giỏ hàng
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  marginRight: 10,
                  backgroundColor: "red",
                  fontStyle: "italic",
                }}
              >
                {total ? formatCurrency(total) : null}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },

  restaurantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 10,
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
