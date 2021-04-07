import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
const logo = require("../images/logo.png");

const Branding = () => {
  return (
    <StyledView>
      <Logo source={logo} />
      <TextWrapper>
        <AppName>Flowers Recognition</AppName>
        <Sub>Khoa CNTT - Đại học Đà Lạt</Sub>
      </TextWrapper>
    </StyledView>
  );
};

const StyledView = styled.View`
  padding: 10px;
  width: 100%;
  background-color: #52734d;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
`;

const Logo = styled.Image`
  width: 120px;
  height: 120px;
`;
const TextWrapper = styled.View`
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
`;
const AppName = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: white;
`;

const Sub = styled.Text`
  font-size: 16;
  color: white;
`;

export default Branding;
