import React from "react";
import { StyleSheet, View } from "react-native";

const FormRow = props => {
  const { children, first, last } = props;
  return (
    <View
      style={[
        styles.container,
        first ? styles.first : null,
        last ? styles.last : null
      ]}
    >
      {children}
    </View>
  );
};

export default FormRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    elevation: 1,
    marginVertical: 5,
    padding: 10
  },
  first: {
    marginTop: 10
  },
  last: {
    marginBottom: 10
  }
});
