import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const movies = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    description: "Ein Dieb dringt in Träume ein und manipuliert Gedanken.",
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    description: "Eine Reise durch Raum, Zeit und menschliche Hoffnung.",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    description: "Batman kämpft gegen den Joker und gegen moralisches Chaos.",
  },
  {
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action",
    rating: 8.1,
    description: "Rasante Flucht durch eine brutale postapokalyptische Welt.",
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy",
    rating: 8.1,
    description: "Ein exzentrischer Concierge gerät in ein absurdes Abenteuer.",
  },
  {
    title: "Parasite",
    year: 2019,
    genre: "Drama",
    rating: 8.5,
    description: "Eine arme Familie infiltriert das Leben einer reichen Familie.",
  },
  {
    title: "Whiplash",
    year: 2014,
    genre: "Drama",
    rating: 8.5,
    description: "Ein junger Drummer trifft auf einen gnadenlosen Lehrer.",
  },
];

const genres = ["Alle", "Sci-Fi", "Action", "Comedy", "Drama"];

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("Alle");
  const [recommendation, setRecommendation] = useState(movies[0]);

  const filteredMovies = useMemo(() => {
    if (selectedGenre === "Alle") {
      return movies;
    }

    return movies.filter((movie) => movie.genre === selectedGenre);
  }, [selectedGenre]);

  function recommendMovie() {
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    setRecommendation(filteredMovies[randomIndex]);
  }

  function selectGenre(genre) {
    setSelectedGenre(genre);

    const genreMovies =
      genre === "Alle" ? movies : movies.filter((movie) => movie.genre === genre);

    setRecommendation(genreMovies[0]);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appTitle}>MovieReco</Text>
        <Text style={styles.subtitle}>Einfache Filmempfehlungen für heute Abend</Text>

        <View style={styles.genreContainer}>
          {genres.map((genre) => (
            <Pressable
              key={genre}
              onPress={() => selectGenre(genre)}
              style={[
                styles.genreButton,
                selectedGenre === genre && styles.genreButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.genreText,
                  selectedGenre === genre && styles.genreTextActive,
                ]}
              >
                {genre}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Empfehlung</Text>
          <Text style={styles.movieTitle}>{recommendation.title}</Text>

          <Text style={styles.meta}>
            {recommendation.year} · {recommendation.genre} · ⭐{" "}
            {recommendation.rating}
          </Text>

          <Text style={styles.description}>{recommendation.description}</Text>
        </View>

        <Pressable style={styles.mainButton} onPress={recommendMovie}>
          <Text style={styles.mainButtonText}>Neue Empfehlung holen</Text>
        </Pressable>

        <Text style={styles.footer}>
          Version 0.1 · ohne Login · ohne Backend · schnell gebaut
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    padding: 24,
  },
  appTitle: {
    color: "white",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 24,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  genreButton: {
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  genreButtonActive: {
    backgroundColor: "white",
  },
  genreText: {
    color: "#D1D5DB",
    fontWeight: "600",
  },
  genreTextActive: {
    color: "#111827",
  },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  label: {
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  meta: {
    color: "#FBBF24",
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    color: "#E5E7EB",
    fontSize: 17,
    lineHeight: 25,
  },
  mainButton: {
    backgroundColor: "#FBBF24",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  mainButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
  },
  footer: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 24,
  },
});