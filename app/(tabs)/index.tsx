import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTopSearches } from "@/services/firebaseApi";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTopSearches);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const movieData = movies ?? [];

  return (
    // <SafeAreaView className="flex-1 bg-primary">
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={!moviesLoading && !moviesError ? movieData : []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        ListHeaderComponent={
          <View className="mt-20">
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-4 mb-5 mx-auto"
            />

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  // ItemSeparatorComponent={() => <View className="w-10" />}
                  contentContainerStyle={{ paddingRight: 30, gap: 40 }}
                />
              </View>
            )}

            {moviesLoading || trendingLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : moviesError || trendingError ? (
              <Text className="text-red-500 text-center mt-10">
                {moviesError?.message ||
                  trendingError?.message ||
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
    // </SafeAreaView>
  );
}
