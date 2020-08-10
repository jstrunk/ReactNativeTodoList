import { ITodoState } from "../src/redux/types";

export const oneListOneItemDone: ITodoState = {
  todoCollection: {
    listIds: [{id: 'list1', name: 'Test List'}],
    activeList: 'list1',
  },
  todoList: {
    name: 'Test List',
    byId: {
      abc1: {
        key: 'Run the tests',
        done: true,
      },
      def2: {
        key: 'foo',
        done: false,
      },
    },
    allItems: ['abc1', 'def2'],
  },
};

export const empty: ITodoState = {
  todoCollection: { listIds: [] },
  todoList: { byId: {}, allItems: []},
}