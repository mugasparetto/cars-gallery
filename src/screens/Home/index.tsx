import React, { useEffect, useContext, useState } from 'react';
import { ActivityIndicator, Alert, Text } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import RNSnackbar from 'react-native-snackbar-component';

import { Container } from './styles';

import carApi from '../../services/api';
import { CarContext } from '../../context/CarContext';
import RecordComponent from '../../components/RecordComponent';
import CarDetail from '../../components/CarDetail';

interface HomeProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const {
    setCar,
    fuelRecords,
    setFuelRecords,
    deleteRecord,
    loadingFetch,
    setLoadingFetch,
  } = useContext(CarContext) as ContextType;
  const [snackbarOptions, setSnackbarOptions] = useState({
    visible: false,
    message: '',
  });

  useEffect(() => {
    setLoadingFetch(true);
    carApi
      .get('/cars?_embed=fuelRecords')
      .then((response) => {
        const { data } = response;
        const [carData] = data;
        setCar(carData);
        setFuelRecords(carData.fuelRecords.reverse());
        setLoadingFetch(false);
      })
      .catch((_) => {
        setSnackbarOptions({
          visible: true,
          message: 'Could not fetch your data. Try again later.',
        });
        setTimeout(() => {
          setSnackbarOptions({
            visible: false,
            message: '',
          });
        }, 3000);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const response = await deleteRecord(id);

    if (response instanceof Error) {
      setSnackbarOptions({
        visible: true,
        message: 'Could not delete your record. Try again later.',
      });
      setTimeout(() => {
        setSnackbarOptions({
          visible: false,
          message: '',
        });
      }, 3000);
    }
  };

  const createDeleteAlert = (id: number) => {
    Alert.alert(
      'Delete record',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            handleDelete(id);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <>
      {loadingFetch && <ActivityIndicator size="large" color="#333" />}
      {!loadingFetch && (
        <Container
          ListHeaderComponent={
            <CarDetail
              onAddRecordPress={() => {
                navigation.navigate('New record');
              }}
            />
          }
          data={fuelRecords}
          keyExtractor={(record) => record.id.toString()}
          renderItem={({ item: record }) => (
            <RecordComponent
              record={record}
              onDelete={(id: number) => {
                createDeleteAlert(id);
              }}
            />
          )}
        />
      )}
      <RNSnackbar
        visible={snackbarOptions.visible}
        textMessage={snackbarOptions.message}
        actionHandler={() => {
          setSnackbarOptions({ visible: false, message: '' });
        }}
        actionText="OK"
        position="top"
        backgroundColor="#FB4E4E"
        accentColor="white"
      />
    </>
  );
};

export default Home;
