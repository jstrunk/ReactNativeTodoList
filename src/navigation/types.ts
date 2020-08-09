import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  TodoSelect: undefined;
  TodoList: {id: string};
};

export type TodoSelectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TodoSelect'
>;

export type TodoListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TodoList'
>;

export type TodoListScreenRouteProp = RouteProp<
  RootStackParamList,
  'TodoList'
>;

