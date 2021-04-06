import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.FlatList.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: Platform.OS === 'android' ? 32 : 0,
  },
})`
  flex: 1;
  background-color: #efefef;
`;
