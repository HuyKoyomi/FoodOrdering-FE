import React from "react";
import { Text, View } from "react-native";

export default function HeaderTabs() {
  return (
    <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 30 }}>
      <Text style={{ fontSize: 25, fontStyle: "italic", fontWeight: "bold" }}>
        VNFood
      </Text>
    </View>
  );
}
