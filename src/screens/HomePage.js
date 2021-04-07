import React from "react";
import { View, Button, Image, Text } from "react-native";
import styled from "styled-components/native";
// components
import Branding from "../components/Branding";

const HomePage = () => {
  return (
    <Page>
      <Branding />
    </Page>
  );
};

const Page = styled.View`
  flex: 1;
  background-color: #ddffbc;
  padding: 10px;
`;

export default HomePage;
