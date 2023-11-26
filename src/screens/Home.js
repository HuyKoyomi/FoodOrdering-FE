import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  API_GET_ALL_RESTAURANT,
  API_GET_ALL_RESTAURANT_1,
  API_GET_ALL_RESTAURANT_2,
  API_GET_ALL_RESTAURANT_3,
} from "../Api/Contant";
import BottomTabs from "../components/home/BottomTabs";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItem from "../components/home/RestaurantItem";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState([]);
  const [allRestaurantData, setAllRestaurantData] = useState([]);
  const [area, setArea] = useState("all");

  //--------------------USEEFFECT--------------------------------
  useEffect(() => {
    getAPI(API_GET_ALL_RESTAURANT);
  }, []);
  //--------------------FUNCTION--------------------------------

  const getAPI = async (URL) => {
    try {
      const response = await axios.get(URL);
      setRestaurantData(response.data);
      setAllRestaurantData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkArea = (data) => {
    setArea(data);
    switch (data) {
      case "all":
        getAPI(API_GET_ALL_RESTAURANT);
        return;
      case "bac":
        getAPI(API_GET_ALL_RESTAURANT_1);
        return;
      case "trung":
        getAPI(API_GET_ALL_RESTAURANT_2);
        return;
      case "nam":
        getAPI(API_GET_ALL_RESTAURANT_3);
        return;
      default:
        return;
    }
  };
  const checkColor = (data) => {
    if (data == area) return "#FFCC00";
    else return "#FFF";
  };

  //========================================================//

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          backgroundColor: "#FFCC00",
        }}
      >
        <HeaderTabs />
        <SearchBar
          setRestaurantData={setRestaurantData}
          restaurantData={restaurantData}
          allRestaurantData={allRestaurantData}
        />
      </View>

      <Categories checkColor={checkColor} checkArea={checkArea} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantItem
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

const Categories = (props) => (
  <View
    style={{
      backgroundColor: "#fff",
      marginTop: 5,
      paddingVertical: 10,
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    }}
  >
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          marginRight: 10,
          backgroundColor: props.checkColor("all"),
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
        onPress={() => props.checkArea("all")}
      >
        <Text style={{ fontSize: 14, fontWeight: "900" }}>Tất Cả</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginRight: 10,
          backgroundColor: props.checkColor("bac"),
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
        onPress={() => props.checkArea("bac")}
      >
        <Text style={{ fontSize: 14, fontWeight: "900" }}>Miền Bắc</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginRight: 10,
          backgroundColor: props.checkColor("trung"),
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
        onPress={() => props.checkArea("trung")}
      >
        <Text style={{ fontSize: 14, fontWeight: "900" }}>Miền trung</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginRight: 10,
          backgroundColor: props.checkColor("nam"),
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
        onPress={() => props.checkArea("nam")}
      >
        <Text style={{ fontSize: 14, fontWeight: "900" }}>Miền Nam</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SearchBar = ({
  setRestaurantData,
  restaurantData,
  allRestaurantData,
}) => {
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: "row",
        borderRadius: 30,
        borderWidth: 1,
        width: "95%",
        marginLeft: "2.5%",
        height: 50,
        backgroundColor: "#eee",
      }}
    >
      <AntDesign
        name="search1"
        size={25}
        color="black"
        style={{ position: "absolute", marginLeft: 20, marginTop: 10 }}
      />
      <TextInput
        style={{ fontSize: 18, paddingHorizontal: 60 }}
        placeholder="Nhập tên nhà hàng"
        onChangeText={(e) => {
          const currValue = e.trim();
          const filteredData = allRestaurantData?.filter((entry) =>
            entry?.restaurantName
              ?.toLowerCase()
              .includes(currValue.toLowerCase())
          );
          setRestaurantData(filteredData);
        }}
      />
      <TouchableOpacity
        style={{
          borderRadius: 30,
          backgroundColor: "#fff",
          width: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  );
};
