import React from "react";
import { View, Button, Image, Text } from "react-native";
import styled from "styled-components/native";
// components
import Spacer from "../components/Spacer";
import Branding from "../components/Branding";
import MenuButton from "../components/MenuButton";

const HomePage = () => {
  return (
    <Page>
      <Branding />
    </Page>
  );
};

const Page = styled.View`
  flex: 1;
  padding: 10px;
`;

export default HomePage;
