import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  title,
  id,
  poster_path,
  vote_count,
  vote_average,
  release_date,
}) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `http://image.tmdb.org/t/p/w500${poster_path}`
              : "http://placehold.co/600x400/1a1a1a/fffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text numberOfLines={1} className="text-white mt-2 text-sm font-bold">
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average || 0)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-light-300 font-medium mt-1 text-xs">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
