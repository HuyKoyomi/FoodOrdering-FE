import axios from "axios";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { API_GET_ALL_FOOD_BY_RESTAURANT } from "../../Api/Contant";
import { formatCurrency } from "../../common/utils";

export default function MenuItems({ ...props }) {
  const { id, name } = props.route.params;
  const [foodsDataBase, setFoodsDataBase] = React.useState([]);
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: name,
        checkboxValue: checkboxValue,
        quantity: 1,
      },
    });

  //--------------------USEEFFECT-------------------------------- //

  useEffect(() => {
    getAPI(API_GET_ALL_FOOD_BY_RESTAURANT(id));
  }, []);

  //--------------------FUNCTION--------------------------------//
  const getAPI = async (URL) => {
    try {
      const response = await axios.get(URL);
      setFoodsDataBase(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        borderWidth: 5,
        borderRadius: 30,
        backgroundColor: "white",
        marginBottom: 10,
        height: "66%",
      }}
    >
      <ScrollView>
        {foodsDataBase.map((food, index) => (
          <View
            key={index}
            style={{
              elevation: 3, // For Android shadow
              borderRadius: 5,
            }}
          >
            <View style={styles.menuItemStyle}>
              <BouncyCheckbox
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />
              <FoodInfo food={food} />
              <Image
                source={{ uri: food.image }}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const FoodInfo = ({ food }) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}> {food.foodName} </Text>
    <Text>{food.description} </Text>
    <Text>
      {
        <Text style={{ color: "#ee4d2d", fontWeight: "600", fontSize: 16 }}>
          {formatCurrency(food?.price)}
        </Text>
      }
      {" / " + food?.unit}
    </Text>
  </View>
);

//========================================================================================

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "500",
  },
});
