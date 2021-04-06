import React from 'react';

import { Header, Title, Me, Avatar } from './styles';

const CustomHeader: React.FC = () => {
  return (
    <Header>
      <Title>Murilo's garage</Title>
      <Me>
        <Avatar source={{ uri: 'http://github.com/mugasparetto.png' }} />
      </Me>
    </Header>
  );
};

export default CustomHeader;
