import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import RNSnackbar from 'react-native-snackbar-component';
import { Ionicons } from '@expo/vector-icons';

import { CarContext } from '../../context/CarContext';

import {
  Container,
  TextInput,
  InputGroup,
  InputLabel,
  TwoColumn,
  AddRecordButton,
  AddRecordText,
} from './styles';

interface AddRecordProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AddRecord: React.FC<AddRecordProps> = ({ navigation }) => {
  const {
    fuelRecords,
    setFuelRecords,
    saveRecord,
    loadingSave,
    setLoadingSave,
  } = useContext(CarContext) as ContextType;

  const [gasStation, setGasStation] = useState('');
  const [fuelType, setFuelType] = useState<null | 'gasoline' | 'ethanol'>(null);
  const [fuelAmount, setFuelAmount] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [snackbarOptions, setSnackbarOptions] = useState({
    visible: false,
    message: '',
  });

  const handleSubmit = async () => {
    if (
      gasStation === '' ||
      fuelType === null ||
      fuelAmount === '' ||
      kilometers === ''
    ) {
      setSnackbarOptions({
        visible: true,
        message: 'All fields are mandatory',
      });
      setTimeout(() => {
        setSnackbarOptions({ visible: false, message: '' });
      }, 3000);
      return;
    }

    if (parseFloat(kilometers) <= fuelRecords[0].kilometers) {
      setSnackbarOptions({
        visible: true,
        message: 'Total kilometers should be greater than last record',
      });
      setTimeout(() => {
        setSnackbarOptions({ visible: false, message: '' });
      }, 3000);
      return;
    }

    setLoadingSave(true);
    const newRecord = await saveRecord({
      gasStation,
      fuelAmount: parseFloat(fuelAmount),
      fuelType,
      kilometers: parseFloat(kilometers),
      date: new Date(),
    });

    setLoadingSave(false);

    if (newRecord instanceof Error) {
      setSnackbarOptions({ visible: true, message: newRecord.message });
      setTimeout(() => {
        setSnackbarOptions({ visible: false, message: '' });
      }, 3000);
      return;
    }

    setFuelRecords([newRecord, ...fuelRecords]);
    navigation.goBack();
  };

  return (
    <Container>
      <InputGroup style={{ marginTop: 32 }}>
        <InputLabel>Gas station</InputLabel>
        <TextInput
          value={gasStation}
          onChangeText={setGasStation}
          returnKeyType="next"
          editable={!loadingSave}
          style={{ opacity: !loadingSave ? 1 : 0.4 }}
        />
      </InputGroup>

      <InputGroup>
        <InputLabel>Fuel type</InputLabel>
        <RNPickerSelect
          onValueChange={(value) => setFuelType(value)}
          items={[
            { label: 'Gasoline', value: 'gasoline' },
            { label: 'Ethanol', value: 'ethanol' },
          ]}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerStyle({ loading: loadingSave }),
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          Icon={() => (
            <Ionicons name="chevron-down-outline" size={24} color="#adadad" />
          )}
          disabled={loadingSave}
        />
      </InputGroup>

      <TwoColumn>
        <InputGroup style={{ flexGrow: 1, marginRight: 8 }}>
          <InputLabel>Fuel amount</InputLabel>
          <TextInput
            keyboardType="number-pad"
            value={fuelAmount}
            onChangeText={setFuelAmount}
            returnKeyType="done"
            editable={!loadingSave}
            style={{ opacity: !loadingSave ? 1 : 0.4 }}
          />
        </InputGroup>
        <InputGroup style={{ flexGrow: 1, marginLeft: 8 }}>
          <InputLabel>Total kilometers</InputLabel>
          <TextInput
            keyboardType="number-pad"
            value={kilometers}
            onChangeText={setKilometers}
            returnKeyType="done"
            editable={!loadingSave}
            style={{ opacity: !loadingSave ? 1 : 0.4 }}
          />
        </InputGroup>
      </TwoColumn>

      <AddRecordButton
        onPress={handleSubmit}
        disabled={loadingSave}
        style={{ opacity: !loadingSave ? 1 : 0.4 }}
      >
        <AddRecordText>Add record</AddRecordText>
      </AddRecordButton>

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
    </Container>
  );
};

export default AddRecord;

interface PickerStyleProps {
  loading: boolean;
}

const pickerStyle = ({ loading }: PickerStyleProps) =>
  StyleSheet.create({
    inputIOS: {
      height: 48,
      backgroundColor: 'white',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#adadad',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      opacity: !loading ? 1 : 0.4,
    },
    inputAndroid: {
      height: 48,
      backgroundColor: 'white',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#adadad',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      opacity: !loading ? 1 : 0.4,
    },
  });
