import { icons } from "@/constants/icons";
import { signUp } from "@/services/firebaseApi";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Please make sure both passwords match.");
      return;
    }

    try {
      setSubmitting(true);
      await signUp(trimmedEmail, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Sign up failed", error?.message ?? "Unable to create account right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-primary justify-center px-7">
      <View className="mb-10">
        <Image source={icons.logo} className="w-16 h-12 self-center mb-3" />
        <Text className="text-4xl text-white font-semibold text-center">
          Movie VerdiQ
        </Text>
      </View>

      <View className="bg-dark-200/85 border border-dark-100 rounded-3xl p-5">
        <Text className="text-white text-3xl font-bold mb-1">Create Account</Text>
        <Text className="text-light-200 mb-6">Join Movie VerdiQ</Text>

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          className="bg-primary/75 text-white px-4 py-4 rounded-2xl mb-4 border border-dark-100"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#A8B5DB"
          value={email}
        />

        <TextInput
          className="bg-primary/75 text-white px-4 py-4 rounded-2xl mb-4 border border-dark-100"
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#A8B5DB"
          secureTextEntry
          value={password}
        />

        <TextInput
          className="bg-primary/75 text-white px-4 py-4 rounded-2xl mb-6 border border-dark-100"
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#A8B5DB"
          secureTextEntry
          value={confirmPassword}
        />

        <TouchableOpacity
          className="bg-accent rounded-2xl py-4 items-center"
          disabled={submitting}
          onPress={onSignup}
        >
          {submitting ? (
            <ActivityIndicator color="#151312" />
          ) : (
            <Text className="text-primary font-semibold text-base">
              Create account
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-light-200">Already have an account? </Text>
        <Link className="text-accent font-semibold" href="/login">
          Login
        </Link>
      </View>
    </View>
  );
}
