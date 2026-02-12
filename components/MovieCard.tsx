import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MovieCard = ({
  title,
  id,
  poster_path,
  vote_count,
  vote_average,
  release_date,
}) => {
  return (
    <Link href={`/movie/${id}`} asChild>
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
        <Text className="text-white mt-2 text-sm font-bold">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
