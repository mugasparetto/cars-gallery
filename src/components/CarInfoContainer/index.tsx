import React, { useContext } from 'react';

import { CarContext } from '../../context/CarContext';

import { Container } from './styles';
import CarInfo from '../CarInfo';

const CarInfoContainer: React.FC = () => {
  const { calculateAuthonomy } = useContext(CarContext) as ContextType;

  const { gasolineAvg, ethanolAvg } = calculateAuthonomy();

  return (
    <Container>
      <CarInfo
        icon="gasoline"
        info={gasolineAvg ? gasolineAvg : '---'}
        unity="km/L"
      />
      <CarInfo
        icon="ethanol"
        info={ethanolAvg ? ethanolAvg : '---'}
        unity="km/L"
      />
      <CarInfo icon="transmission" info="Automatic" />
    </Container>
  );
};

export default CarInfoContainer;
