import React, { useState } from 'react';
import {View} from 'react-native';
import SelectList from './containers/SelectList';
import CreateListModal from './containers/CreateListModal';
import CreateListButton from './containers/CreateListButton';
import { TodoSelectScreenNavigationProp } from './navigation/types';
import styles from './styles';

interface Props {
  navigation: TodoSelectScreenNavigationProp;
}

const TodoSelectView = (props: Props): JSX.Element => {
  const [isCreateListModalVisible, setIsCreateListModalVisible] = useState(false);

  const toggleCreateListModal = (): void => {
    setIsCreateListModalVisible(!isCreateListModalVisible);
  }

  return (
    <View style={styles.container}>
      <SelectList navigation={props.navigation}/>
      <CreateListModal isCreateListModalVisible={isCreateListModalVisible} toggleCreateListModal={toggleCreateListModal} />
      <CreateListButton toggleCreateListModal={toggleCreateListModal} />
    </View>
  );
}

export default TodoSelectView;