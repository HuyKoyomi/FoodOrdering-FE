import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { genDate } from "../common/utils";
import UserContext from "../context/UserContext";

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const data = {
  id: "B19DCCN307",
  name: "Lý Mạnh Huy",
  gender: "Nam",
  phone: "0963681775",
  address: "Hưng Yên",
  userImage: require("../../assets/images/user.jpg"),
};

export default function ({ navigation }) {
  const [user, setUser] = React.useContext(UserContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <HeaderAccount
        userImage={data.userImage}
        userBackground={data.userBackground}
        user={user}
      />
      <BodyProfile user={user} navigation={navigation} />
    </SafeAreaView>
  );
}

const HeaderAccount = (props) => (
  <View
    style={{ height: 250, alignItems: "center", backgroundColor: "#FFCC00" }}
  >
    <Text
      style={{
        fontSize: 25,
        color: "white",
        marginTop: 50,
        position: "absolute",
      }}
    >
      Hồ Sơ
    </Text>
    <View
      style={{
        width: "80%",
        height: 200,
        marginTop: 200 - 144 / 2,
        backgroundColor: "white",
        borderRadius: 25,
        borderWidth: 3,
        borderColor: "#eee",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          borderWidth: 5,
          borderColor: "#eee",
          marginTop: 20,
          marginBottom: 10,
        }}
        source={props.userImage}
      />
      <Text style={{ fontSize: 20 }}>{props.user.name}</Text>
      <Text style={{ fontSize: 15, fontStyle: "italic", color: "#787878" }}>
        {props.user.phone}
      </Text>
    </View>
  </View>
);

const BodyProfile = (props) => (
  <View style={{ flex: 1, alignItems: "center" }}>
    <View
      style={{
        marginTop: 100,
        flex: 1,
        marginBottom: 100,
        justifyContent: "space-between",
        marginHorizontal: (windowWidth * 10) / 100,
      }}
    >
      <View>
        <Text
          style={{
            marginRight: 280,
            fontSize: 18,
            fontStyle: "italic",
            color: "#606060",
            width: 100,
          }}
        >
          Tài khoản
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>
            {props.user.account}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            marginRight: 280,
            fontSize: 18,
            fontStyle: "italic",
            color: "#606060",
            width: 100,
          }}
        >
          Họ tên
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>
            {props.user.fullName}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            marginRight: 280,
            fontSize: 18,
            fontStyle: "italic",
            color: "#606060",
            width: 100,
          }}
        >
          Ngày sinh
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>
            {props.user.dob && genDate("DD/MM/YYYY", props.user.dob)}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            marginRight: 280,
            fontSize: 18,
            fontStyle: "italic",
            color: "#606060",
            width: 100,
          }}
        >
          SĐT
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>
            {props.user.phoneNumber}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            marginRight: 280,
            fontSize: 18,
            fontStyle: "italic",
            color: "#606060",
            width: 100,
          }}
        >
          Địa chỉ
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>
            {props.user.address}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            marginRight: 280,
            fontSize: 18,
            fontStyle: "italic",
            color: "#606060",
            width: 100,
          }}
        >
          Ngân hàng
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>
            VCB - 1015695587
          </Text>
        </View>
      </View>
    </View>

    <TouchableOpacity
      style={{
        backgroundColor: "#FFCC00",
        width: "50%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 20,
      }}
      onPress={() => props.navigation.navigate("SignIn")}
    >
      <Text>Đăng Xuất</Text>
    </TouchableOpacity>
  </View>
);
