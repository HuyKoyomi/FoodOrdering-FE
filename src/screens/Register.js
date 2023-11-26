import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment/moment";
import React, { useState } from "react";
import { API_CREATE_USER } from "../Api/Contant";

export default function Register({ navigation }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");

  const checkAccount = async () => {
    if (
      account == "" ||
      password == "" ||
      name == "" ||
      birth == "" ||
      address == "" ||
      phone == "" ||
      card == ""
    ) {
      alert("Vui lòng điền đẩy đủ thông tin!");
    } else {
      try {
        let params = {
          account: account,
          password: password,
          fullName: name,
          phoneNumber: phone,
          email: "lmhuy.07042001@gmail.com",
          address: address,
          card: card,
          dob: moment(birth),
        };
        let response = await axios.post(API_CREATE_USER, params);
        let result = response?.data;
        if (result && result?.status) {
          alert(result?.message);
          navigation.navigate("SignIn");
        } else {
          alert(result?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFCC00", alignItems: "center" }}
    >
      <HeaderRegister navigation={navigation} />
      <BodyRegister
        account={account}
        setAccount={setAccount}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        birth={birth}
        setBirth={setBirth}
        address={address}
        setAddress={setAddress}
        phone={phone}
        setPhone={setPhone}
        card={card}
        setCard={setCard}
      />
      <FotterRegister checkAccount={checkAccount} />
    </SafeAreaView>
  );
}
const HeaderRegister = (props) => (
  <View
    style={{
      marginTop: 40,
      alignItems: "center",
      marginBottom: 20,
      width: 420,
    }}
  >
    <TouchableOpacity
      style={{ position: "absolute", left: 20 }}
      onPress={() => props.navigation.navigate("SignIn")}
    >
      <AntDesign name="back" size={30} color="black" />
    </TouchableOpacity>
    <Text style={{ color: "#FFF", fontSize: 25, fontWeight: "700" }}>
      Tạo tài khoản mới
    </Text>
  </View>
);

const BodyRegister = (props) => (
  <ScrollView
    style={{
      backgroundColor: "#fff",
      width: 360,
      padding: 20,
      paddingBottom: 20,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: "#eee",
    }}
  >
    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Tài khoản</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập tài khoản"
        onChangeText={(text) => {
          props.setAccount(text);
        }}
      ></TextInput>
    </View>

    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Mật Khẩu</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập mật khẩu"
        onChangeText={(text) => {
          props.setPassword(text);
        }}
      ></TextInput>
    </View>
    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Tên</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập Tên"
        onChangeText={(text) => {
          props.setName(text);
        }}
      ></TextInput>
    </View>

    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Ngày sinh</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập ngày sinh"
        onChangeText={(text) => {
          props.setBirth(text);
        }}
      ></TextInput>
    </View>

    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Số điện thoại</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập số điện thoại"
        onChangeText={(text) => {
          props.setPhone(text);
        }}
      ></TextInput>
    </View>

    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Địa chỉ</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập địa chỉ"
        onChangeText={(text) => {
          props.setAddress(text);
        }}
      ></TextInput>
    </View>

    <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Tài khoản ngân hàng</Text>
      <TextInput
        style={styles.text}
        placeholder="Nhập tài khoản"
        onChangeText={(text) => {
          props.setCard(text);
        }}
      ></TextInput>
    </View>

    <View style={{ height: 30 }}></View>
  </ScrollView>
);

const FotterRegister = ({ checkAccount }) => (
  <View
    style={{
      width: 420,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 30,
      marginTop: 20,
    }}
  >
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        width: 200,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      }}
      onPress={() => checkAccount()}
    >
      <Text style={{ fontSize: 20, color: "#FFCC00", fontWeight: "700" }}>
        Đăng kí
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  text: {
    height: 40,
    fontSize: 18,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 30,
  },
});
