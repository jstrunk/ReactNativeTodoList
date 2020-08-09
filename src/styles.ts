import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '75%',
  },
  footer: {
    backgroundColor: 'white',
    padding: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  remove: {
    textAlign: 'center',
    color: 'red',
  },
  addItem: {
    padding: 15,
    textAlign: 'left',
    color: 'grey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: '100%',
  },
  list: {
    marginBottom: 40,
  },
  item: {
    textAlign: 'left',
    color: 'black',
  },
  itemdone: {
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  checkBox: {
    color: '#bfbfbf',
  },
  header: {
    backgroundColor: 'skyblue',
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
  backbutton: {
    textAlign: 'left',
    color: 'white',
  },
  createListButtonView: {
    position: 'absolute',
    right: 50,
    bottom: 80,
  },
  createListTextInput: {
    padding: 15,
    textAlign: 'left',
    borderBottomWidth: 1,
    width: '100%',
  },
});

export default styles;