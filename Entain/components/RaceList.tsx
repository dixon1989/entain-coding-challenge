import React, {Fragment, memo, ReactElement} from 'react';

import {Text, View, Modal, Pressable, TouchableOpacity} from 'react-native';
import {styles} from '../styles/globalStyles';
import CountDown from 'react-native-countdown-component';
import {RaceListProps} from './RaceList.interface';
import {useToggle} from '../hooks/useToggle';

function RaceList(props: RaceListProps): ReactElement {
  const {item, onRemoveRaceOnExpire} = props;

  const [isRaceListModalOpened, , openRaceListModal, closeRaceListModal] =
    useToggle();

  const checkRacingCategory = (categoryId: string) => {
    switch (categoryId) {
      case '9daef0d7-bf3c-4f50-921d-8e818c60fe61':
        return 'Greyhound Racing';

      case '161d9be2-e909-4326-8c2c-35ed71fb460b':
        return 'Harness Racing';

      case '4a2788f8-e825-4d36-9894-efd4baf1cfae':
        return 'Horse Racing';

      default:
        return 'Unknown Category';
    }
  };

  /*
   * Not quite sure how the format of the advertised_start and seconds is used. It duration in seconds can be more than a year.
   * Logically, I have implemented in a way that if item of the countdown reaches 0 it should remove the selected item from the list.
   */

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => openRaceListModal()}
        style={styles.raceViewContainer}>
        <Text>{checkRacingCategory(item.category_id)}</Text>
        <View>
          <View>
            <Text style={styles.raceNumberText}>{'# ' + item.race_number}</Text>
          </View>
          <CountDown
            until={item.advertised_start.seconds + 60}
            timeToShow={['M', 'S']}
            onFinish={() => {
              onRemoveRaceOnExpire(item.race_id);
            }}
            size={15}
          />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isRaceListModalOpened}
        onRequestClose={() => {
          closeRaceListModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Race Name: {item.race_name}</Text>
            <Text style={styles.modalText}>
              Race Number: {item.race_number}
            </Text>
            <Text style={styles.modalText}>
              Meeting Name: {item.meeting_name}
            </Text>
            <Text style={styles.modalText}>Etc etc..</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeRaceListModal()}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}

export default memo(RaceList);
