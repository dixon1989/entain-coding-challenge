/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {getNedsResults} from './api';
import RaceList from './components/RaceList';
import {styles} from './styles/globalStyles';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [raceDataList, setRaceDataList] = React.useState<any>([]);
  let raceDataArray = [] as any;

  React.useEffect(() => {
    // Should start grabbing and renders data from Neds API and save it to a state.
    const load = async () => {
      const getRaceData = await getNedsResults();
      getRaceData.data.next_to_go_ids.forEach((id: string) => {
        const filteredUsers = Object.fromEntries(
          Object.entries(getRaceData.data.race_summaries).filter(([key]) =>
            key.includes(id),
          ),
        );

        raceDataArray.push(filteredUsers[id]);
      });
      setRaceDataList(raceDataArray);
    };
    load();
  }, []);

  /* This onRemoveRaceOnExpire is called when the timer reaches 0
   * then it will remove the array element from the RaceDataList
   * then renders the new list of data to be displayed on the 'Next to Go' screen
   */
  const onRemoveRaceOnExpire = useCallback(
    (id: string) => {
      var index = raceDataList.findIndex(function (item: any) {
        return item.race_id === id;
      });
      if (index !== -1) {
        setRaceDataList(raceDataList.splice(index, 1));
      }
    },
    [raceDataList],
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /* Requirements:
   * A user should see 5 races at all times, and they should be sorted by time ascending.
   * Race should disappear from the list after 1 min past the start time (​advertised_start).
   * User should see meeting name (​meeting_name), race number (​race_number) and countdown timer that indicates the start of the race.
   * User should be able to toggle race categories to view races belonging to only the selected category.
   */

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Next to Go</Text>
        </View>
        {raceDataList &&
          raceDataList
            .sort(
              (a: any, b: any) =>
                a.advertised_start.seconds - b.advertised_start.seconds,
            )
            .slice(0, 5)
            .map((item: any, number: React.Key | null | undefined) => {
              return (
                <RaceList
                  key={number}
                  item={item}
                  onRemoveRaceOnExpire={onRemoveRaceOnExpire}
                />
              );
            })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
