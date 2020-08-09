import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';

interface Props {
  toggleCreateListModal: () => void;
}

const CreateListButton = (props: Props): JSX.Element => {
  return (
    <View style={styles.createListButtonView}>
      <Icon type='font-awesome-5' name='plus-circle' solid={true} onPress={props.toggleCreateListModal} size={50} color='lightgreen' />
    </View>
  );
}

export default CreateListButton;