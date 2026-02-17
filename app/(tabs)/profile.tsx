import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const onLogout = async () => {
    try {
      setSigningOut(true);
      await logout();
    } catch (error: any) {
      Alert.alert("Sign out failed", error?.message ?? "Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-white text-lg font-semibold">Your Profile</Text>
        <Text className="text-gray-400 text-sm">
          {user?.email ?? "No email found"}
        </Text>

        <TouchableOpacity
          className="bg-accent rounded-xl py-3 px-6 mt-4 min-w-40 items-center"
          disabled={signingOut}
          onPress={onLogout}
        >
          {signingOut ? (
            <ActivityIndicator color="#151312" />
          ) : (
            <Text className="text-primary  font-semibold">Sign Out</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
