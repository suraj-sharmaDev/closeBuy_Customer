import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CartBadge from "../components/NavigationComponents/CartBadge";
import TabBarLabel from "../components/TabBarLabel";
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileTabNavigator from "./ProfileTabNavigator";

const StackNavOptions = {
  header : null,
  headerTransparent: true
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    navigationOptions: { ...StackNavOptions }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={"Home"}
    />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `home` : "home"}
    />
  ),
};

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen
  },
  {
    navigationOptions: { ...StackNavOptions }
  }
);

SearchStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={"Search"}
    />
  ),  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `search1` : `search1`}
    />
  ),
};

const CartStack = createStackNavigator(
  {
    Cart: CartScreen
  },
  {
    navigationOptions: { ...StackNavOptions }
  }
);


CartStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={"Cart"}
    />
  ),  
  tabBarIcon: ({ focused }) => (
    <CartBadge
      focused={focused}
      name={Platform.OS === "ios" ? `shoppingcart` : "shoppingcart"}
    />
  ),
};

const ProfileStack = ProfileTabNavigator;

ProfileStack.navigationOptions = ({navigation}) => {
  let tabBarLabel = ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={"Profile"}
    />
  );
  let tabBarIcon = ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `user` : `user`}
    />
  );
  let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }

    return {
      tabBarVisible,
      tabBarIcon,
      tabBarLabel
    };
};

export default createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    CartStack,
    ProfileStack
  },
  {
    initialRouteName: "HomeStack",
    tabBarOptions: {
      showLabel: true,
      style: {
        elevation : 26,
        borderTopColor: Colors.boxShadowColor,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20
      }
    }
  }
);
