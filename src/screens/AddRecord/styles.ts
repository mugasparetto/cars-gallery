import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: Platform.OS === 'android' ? 32 : 0,
  },
})`
  flex: 1;
  background-color: #efefef;
  position: relative;
`;

export const InputGroup = styled.View`
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput`
  height: 48px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #adadad;

  font-size: 16px;
  padding: 0 8px;
`;

export const TwoColumn = styled.View`
  flex-direction: row;
`;

export const AddRecordButton = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background: #387df6;
  border-radius: 8px;

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 16px;
  left: 16px;
`;

export const AddRecordText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
