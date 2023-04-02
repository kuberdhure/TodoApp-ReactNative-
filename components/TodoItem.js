import Checkbox from "expo-checkbox";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const checkedStyle = () => {
  return {
    opacity: 0.7,
  };
};

const checkedText = () => {
  return {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  };
};

function removeItem(key, array, setState, updateDBItems) {
  let arr = array.filter((item, index) => item.key !== key);
  setState(arr);
  updateDBItems(arr);
}

function TodoItem(props) {
  const [iconVisible, setIconVisible] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => setIconVisible(true)}
      onPress={() => setIconVisible(false)}
    >
      <View
        style={
          props.isChecked ? [styles.todoItem, checkedStyle()] : styles.todoItem
        }
      >
        <Checkbox
          color={"#337ef5"}
          value={props.isChecked}
          onValueChange={(value) => {
            props.setChecked(value);
          }}
          style={styles.checkbox}
        />
        <Text
          style={props.isChecked ? [styles.text, checkedText()] : styles.text}
        >
          {props.todo}
        </Text>
        {iconVisible ? (
          <Entypo
            name="cross"
            size={35}
            color="red"
            onPress={() =>
              removeItem(
                props.itemKey,
                props.list,
                props.updateState,
                props.updateItems
              )
            }
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    height: 90,
    width: 320,
    borderRadius: 10,
    borderColor: "#333333",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
    backgroundColor: "#333333",
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  checkbox: {
    padding: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    width: "75%",
  },
});

export { TodoItem };
