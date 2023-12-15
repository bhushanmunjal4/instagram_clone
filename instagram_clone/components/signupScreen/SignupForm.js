import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { validate } from "email-validator";
import axios from "axios";

const backendUrl = "http://192.168.29.221:8000";

const SignupForm = ({ navigation }) => {
  const [error, setError] = useState(null);

  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password needs to be atleast 6 characters long "),
  });

  // ... (your existing code)

  const handleSignUp = async (values) => {
    try {
      const response = await axios.post(`${backendUrl}/api/signup/`, {
        email: values.email,
        username: values.username,
        password: values.password,
      });

      console.log("Signup successful:", response.data);

      // Example: Navigate to the home screen after successful signup
      navigation.push("HomeScreen");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError("username is already taken");
        // Display the error message on the front end (you can use state to show it)
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error signing upoooooooo: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error signinguuuuuuu up:", error.message);
      }
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={handleSignUp}
        validationSchema={SignupFormSchema}
        validationOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: values.username.length > 2 ? "#4d4d4d" : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#b8b8b8"
                placeholder="Username"
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                textContentType="username"
                autoFocus={true}
                style={{ color: "#b8b8b8" }}
                onChangeText={handleChange("username")}
                onBlur={() => {
                  handleBlur("username");
                  setError(null);
                }}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || validate(values.email)
                      ? "#4d4d4d"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#b8b8b8"
                placeholder="Username or Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                style={{ color: "#b8b8b8" }}
                onChangeText={handleChange("email")}
                onBlur={() => {
                  handleBlur("email");
                  setError(null);
                }}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#4d4d4d"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#b8b8b8"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                style={{ color: "#b8b8b8" }}
                onChangeText={handleChange("password")}
                onBlur={() => {
                  handleBlur("password");
                  setError(null);
                }}
                value={values.password}
              />
            </View>
            <View>
              {error && (
                <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={{ color: "#fff", marginRight: 10 }}>
                already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#00A3FF" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    color: "#b8b8b8",
    backgroundColor: "#4d4d4d",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#00A3FF" : "#97C8F9",
    alignItems: isValid ? "center" : "center",
    justifyContent: "center",
    minHeight: 42,
    marginTop: 30,
    borderRadius: 4,
  }),
  signupContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});

export default SignupForm;
