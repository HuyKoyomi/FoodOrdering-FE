import React from "react";
import { Text, View } from "react-native";
import { formatCurrency } from "./../../common/utils";

export default function OderItem({ item }) {
  const { foodName, price } = item;
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 20,
        borderBottomWidth: 1,
        borderColor: "#999",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 16 }}>{foodName}</Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>
        {formatCurrency(price)}
      </Text>
    </View>
  );
}
