import styled from 'styled-components/native';

export const Container = styled.View`
  flex-grow: 1;
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const FuelRecordsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const FuelRecordsTitle = styled.Text`
  margin-top: 32px;
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

export const AddRecordButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border: 1px solid #387df6;
  border-radius: 4px;
`;

export const AddRecordText = styled.Text`
  font-size: 16px;
  color: #387df6;
  font-weight: 500;
`;
