import React from 'react';

import {
  Container,
  TextInfoContainer,
  InfoSubtitle,
  InfoTitle,
} from './styles';

import SvgIcon from '../../components/SvgIcon';

interface CarInfoProps {
  icon: 'gasoline' | 'ethanol' | 'transmission';
  info: number | string;
  unity?: string;
}

const CarInfo: React.FC<CarInfoProps> = ({ icon, info, unity }) => {
  return (
    <Container>
      <SvgIcon icon={icon} />
      <TextInfoContainer>
        <InfoTitle>{info}</InfoTitle>
        {unity && <InfoSubtitle>{unity}</InfoSubtitle>}
      </TextInfoContainer>
    </Container>
  );
};

export default CarInfo;
