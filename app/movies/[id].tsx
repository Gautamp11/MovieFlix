import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-gray-400 font-normal text-sm">{label}</Text>
      <Text className="text-white font-normal text-sm">{value || "N/A"}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(parseInt(id as string, 10)),
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-2xl font-bold text-white">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-sm text-light-200">
              {movie?.release_date?.split("-")[0] || "N/A"}
            </Text>
            <Text className="text-sm text-light-200">
              {movie?.runtime || "N/A"}m
            </Text>
          </View>

          <View className="flex-row items-center gap-x-2 mt-2 bg-dark-100 rounded-md ">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average || 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              ({movie?.vote_count || 0} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(", ")}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget || 0) / 1_000_000}M`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.floor((movie?.revenue || 0) / 1_000_000)}M`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies
              ?.map((c: any) => c.name)
              .join(", ")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 bg-accent mx-5 rounded-lg flex flex-row items-center justify-center py-3.5"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
