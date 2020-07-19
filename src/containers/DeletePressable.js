/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {  deleteCompleted } from '../redux/actions';

const mapStateToProps = state => ({
  items: state.todoList,
})

const mapDispatchToProps = dispatch => ({
  onPress: () => dispatch(deleteCompleted()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TouchableOpacity);