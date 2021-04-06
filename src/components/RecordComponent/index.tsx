import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

import SvgIcon from '../SvgIcon';

import {
  Container,
  Header,
  RecordInfo,
  GasStation,
  DateTag,
  DeleteButton,
} from './styles';

interface RecordProp {
  record: FuelRecord;
  onDelete: (id: number) => void;
}

const RecordComponent: React.FC<RecordProp> = ({ record, onDelete }) => {
  const date = new Date(record.date);

  const handleDelete = async () => {
    onDelete(record.id!);
  };

  return (
    <Container>
      <SvgIcon icon={record.fuelType} />
      <RecordInfo>
        <Header>
          <GasStation>{record.gasStation}</GasStation>
          <DateTag>{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</DateTag>
        </Header>
        <Text style={{ fontSize: 18, color: '#575757' }}>
          Fuel amount: {record.fuelAmount} L
        </Text>
        <Text style={{ fontSize: 18, marginTop: 4, color: '#575757' }}>
          Total kilometers: {record.kilometers} km
        </Text>
      </RecordInfo>
      <DeleteButton onPress={handleDelete}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </DeleteButton>
    </Container>
  );
};

export default RecordComponent;
