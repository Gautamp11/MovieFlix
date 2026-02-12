import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  const movieData = movies ?? [];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <FlatList
          data={!moviesLoading && !moviesError ? movieData : []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
          ListHeaderComponent={
            <View>
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-4 mb-5 mx-auto"
              />

              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />

              {moviesLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="mt-10 self-center"
                />
              ) : moviesError ? (
                <Text className="text-red-500 text-center mt-10">
                  {moviesError?.message ||
                    "An error occurred while fetching movies."}
                </Text>
              ) : (
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
              )}
            </View>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <Text className="text-white text-center mt-10">
                No movies found.
              </Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
