import React from "react";
import { View, Button, Image, Text } from "react-native";
import styled from "styled-components/native";
// components
import Spacer from "../components/Spacer";
import Branding from "../components/Branding";
import HomeButton from "../components/HomeButton";

const HomePage = () => {
  return (
    <Page>
      <Branding />
      <Spacer />
      <HomeButton title="Giới thiệu" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <HomeButton flexGrow="3" title="Chụp Ảnh" />
        <HomeButton flexGrow="1" title="Đăng Ảnh" />
      </View>
      <HomeButton title="Nhận diện Realtime" />
    </Page>
  );
};

const Page = styled.View`
  flex: 1;
  padding: 10px;
`;

export default HomePage;
