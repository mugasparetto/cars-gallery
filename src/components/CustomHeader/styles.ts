import styled from 'styled-components/native';

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #efefef;
  padding: 16px 0 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const Me = styled.View`
  position: absolute;
  right: 16px;
`;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 30px;
`;
