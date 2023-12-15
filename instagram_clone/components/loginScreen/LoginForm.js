import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { validate } from "email-validator";
import axios from "axios";

const backendUrl = "http://192.168.29.221:8000";

const LoginForm = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password needs to be atleast 6 characters long "),
  });

  const handleLogin = async (values) => {
    try {
      setLoading(false);
      const response = await axios.post(`${backendUrl}/api/login/`, {
        email: values.email,
        password: values.password,
      });

      console.log("Login successful:", response.data);
      setLoading(true);
      // Navigate to the home screen after successful login
      navigation.push("HomeScreen"); // Adjust this based on your navigation setup
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with an error status
        if (error.response.status === 401) {
          // Unauthorized: Invalid email or password
          if (error.response.data.error === "Invalid password") {
            setError("Invalid password");
            // Handle invalid password error on the frontend (e.g., show an alert)
          } else if (error.response.data.error === "Invalid email") {
            setError("Invalid email address");
            // Handle invalid email error on the frontend (e.g., show an alert)
          }
        } else {
          setError("Error logging in:", error.message);
          // Handle other errors (e.g., show a generic error message)
        }
      } else {
        // The request was made but no response was received
        setError("Error logging in:", error.message);
        // Handle other errors (e.g., show a generic error message)
      }
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={LoginFormSchema}
        validationOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
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
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#00A3FF" }}>Forgot Password</Text>
            </View>
            <View style={{ marginBottom: 30 }}>
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
                Log in
              </Text>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : null}
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={{ color: "#fff", marginRight: 10 }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#00A3FF" }}>Sign Up</Text>
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
    borderRadius: 4,
  }),
  signupContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});

export default LoginForm;
