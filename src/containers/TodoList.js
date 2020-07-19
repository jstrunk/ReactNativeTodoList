/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { toggleItem, deleteItem } from '../redux/actions';
import List from '../components/List';

const mapStateToProps = state => ({
  items: state.todoList,
})

const mapDispatchToProps = dispatch => ({
  toggleItem: index => dispatch(toggleItem(index)),
  deleteItem: index => dispatch(deleteItem(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(List);