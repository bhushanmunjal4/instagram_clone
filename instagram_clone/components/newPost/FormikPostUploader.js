import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";

const placeholderImage = "https://img.icons8.com/sf-black/64/FFFFFF/image.png";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A Url is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit"),
});
const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(placeholderImage);
  return (
    <Formik
      initialValues={{ capion: "", imageUrl: "" }}
      onSubmit={(values) => {
        console.log(values);
        console.log("Your post was submitted successfully");
        navigation.goBack();
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 10,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : placeholderImage,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 12, marginTop: 20 }}>
              <TextInput
                style={{ color: "#fff", fontSize: 18 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <View
            style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20 }}
          >
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              style={{ color: "#fff", fontSize: 16 }}
              placeholder="Enter image url"
              placeholderTextColor="gray"
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {errors.imageUrl && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.imageUrl}
              </Text>
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={{
                width: "50%",
                backgroundColor: isValid ? "#007BFF" : "#000",
                borderWidth: isValid ? "0" : "2",
                borderColor: isValid ? "gray" : "gray",
                padding: 10,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: isValid ? "white" : "gray" }}>Share</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
