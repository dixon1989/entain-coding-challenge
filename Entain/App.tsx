/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CountDown from 'react-native-countdown-component';
import {getNedsResults} from './api';
import Moment from 'moment';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [nextToGo, setNextToGo] = React.useState([]);
  const [raceData, setRaceData] = React.useState<any>();

  React.useEffect(() => {
    // Should Start grabbing data from webServices API
    const load = async () => {
      const getRaceData = await getNedsResults();
      setNextToGo(getRaceData.data.next_to_go_ids);
      setRaceData(getRaceData.data.race_summaries);
    };
    load();
  }, []);

  let raceDataList = [] as any;

  const fetchData = () => {
    if (raceData) {
      nextToGo.forEach((id: string) => {
        const filteredUsers = Object.fromEntries(
          Object.entries(raceData).filter(([key]) => key.includes(id)),
        );

        raceDataList.push(filteredUsers[id]);
      });
    }
  };

  fetchData();

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {raceData &&
          raceDataList
            .sort(
              (a: any, b: any) =>
                a.advertised_start.seconds - b.advertised_start.seconds,
            )
            .slice(0, 5)
            .map((item: any, number: React.Key | null | undefined) => {
              return (
                <View key={number} style={{margin: 10}}>
                  <Text>{checkRacingCategory(item.category_id)}</Text>
                  <CountDown
                    until={item.advertised_start.seconds}
                    timeToShow={['D', 'M', 'S']}
                    onFinish={() => console.log('finished')}
                    size={20}
                  />
                  <Text>{item.race_number}</Text>
                </View>
              );
            })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
