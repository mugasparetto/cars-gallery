import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  background-color: white;
  padding: 16px;
  margin-bottom: 16px;
  align-items: center;
  border-radius: 8px;
  position: relative;
`;

export const RecordInfo = styled.View`
  flex-direction: column;
  margin-left: 16px;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 8px;
`;

export const GasStation = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: 600;
`;

export const DateTag = styled.Text`
  font-size: 14px;
  color: #808080;
  margin-left: 16px;
`;

export const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;
