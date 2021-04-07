// Import React
import React, { useState } from "react";
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Button,
} from "react-native";

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNPytorch from "../../../react-native-pytorch";
import styled from "styled-components/native";
// components
import Spacer from "../../components/Spacer";
import Branding from "../../components/Branding";
import MenuButton from "../../components/MenuButton";

const CameraPage = () => {
  const [filePath, setFilePath] = useState({});
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };
  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 224,
      maxHeight: 224,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        // console.log("base64 -> ", response.base64);
        // console.log("uri -> ", response.uri);
        // console.log("width -> ", response.width);
        // console.log("height -> ", response.height);
        // console.log("fileSize -> ", response.fileSize);
        // console.log("type -> ", response.type);
        // console.log("fileName -> ", response.fileName);
        setFilePath(response);
      });
    }
  };
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 224,
      maxHeight: 224,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      // console.log("base64 -> ", response.base64);
      // console.log("uri -> ", response.uri);
      // console.log("width -> ", response.width);
      // console.log("height -> ", response.height);
      // console.log("fileSize -> ", response.fileSize);
      // console.log("type -> ", response.type);
      // console.log("fileName -> ", response.fileName);
      setFilePath(response);
    });
  };
  const [result, setResult] = useState({
    label: "",
    score: "",
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setValue((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <Page>
      <Branding />
      <Spacer />
      <MenuButton title="Giới thiệu" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <MenuButton
          flexGrow="3"
          title="Chụp Ảnh"
          onPress={() => captureImage("photo")}
        />
        <MenuButton
          flexGrow="1"
          title="Đăng Ảnh"
          onPress={() => {
            chooseFile("photo");
          }}
        />
      </View>
      <MenuButton title="Nhận diện Realtime" />

      <View>
        <Image source={{ uri: filePath.uri }} />
        <Button
          title="Nhào vô!!"
          onPress={async () => {
            const result = await RNPytorch.predict(filePath.uri);
            setResult((prevValue) => {
              return {
                ...prevValue,
                label: result[0].label,
                score: result[0].confidence,
              };
            });
          }}
        />
        <View>
          <Image style={{ height: 200 }} source={{ uri: filePath.uri }} />
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            {result.label} - {result.score}
          </Text>
          <Text>{filePath.uri}</Text>
          <TouchableOpacity onPress={() => captureImage("photo")}>
            <Text>Launch Camera for Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              chooseFile("photo");
            }}
          >
            <Text> Choose Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Page>
  );
};

const Page = styled.View`
  flex: 1;
  padding: 10px;
`;

export default CameraPage;
