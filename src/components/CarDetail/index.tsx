import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';

import {
  Container,
  FuelRecordsHeader,
  FuelRecordsTitle,
  AddRecordButton,
  AddRecordText,
} from './styles';

import Carousel from '../../components/Carousel';
import CarInfoContainer from '../../components/CarInfoContainer';
import { CarContext } from '../../context/CarContext';

interface CarDetailProps {
  onAddRecordPress: () => void;
}

const CarDetail: React.FC<CarDetailProps> = ({ onAddRecordPress }) => {
  const { car, fuelRecords } = useContext(CarContext) as ContextType;

  const { width } = useWindowDimensions();

  return (
    <>
      {Object.keys(car).length !== 0 && fuelRecords.length !== 0 && (
        <Container>
          <Carousel data={car.images} itemWidth={width - 32} title={car.name} />
          <CarInfoContainer />
          <FuelRecordsHeader>
            <FuelRecordsTitle>Fuel records</FuelRecordsTitle>
            <AddRecordButton onPress={onAddRecordPress}>
              <AddRecordText>Add record</AddRecordText>
            </AddRecordButton>
          </FuelRecordsHeader>
        </Container>
      )}
    </>
  );
};

export default CarDetail;
