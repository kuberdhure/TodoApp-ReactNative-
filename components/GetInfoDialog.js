import { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function GetInfoDialog(props) {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Todo</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => {
          // input = val.toString();
          setText(val);
        }}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (text.length > 0) {
              props.addItem((prevTodos) => {
                var arr = [
                  {
                    todo: text,
                    key: props.numKeys + 1,
                    isChecked: false,
                  },
                  ...prevTodos,
                ];

                props.updateTodo(arr);
                return arr;
              });
              props.stateChange(false);
            } else {
              Alert.alert(
                "Invalid input",
                "Cannot input empty string , Please try again"
              );
            }
          }}
        >
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={props.stateChange}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 190,
    justifyContent: "space-between",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginHorizontal: 25,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 10,
  },
  input: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#ddd",
    width: 250,
    height: "35%",
    padding: 10,
  },
  btn: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#ddd",
    height: 45,
    marginHorizontal: 2,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#aa81f7",
  },
  text: {
    color: "#337ef5",
    fontSize: 16,
  },
  headerText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 24,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 15,
  },
});

export { GetInfoDialog };
