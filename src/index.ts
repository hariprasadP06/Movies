import { MoviesManagement } from "./movies";
import * as readline from "readline";

const moviesManager = new MoviesManagement();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  console.log("\nMovies Management System");
  console.log("1. Add Movie");
  console.log("2. Rate Movie");
  console.log("3. Get Top Rated Movies");
  console.log("4. Get Movies by Genre");
  console.log("5. Get Movies by Director");
  console.log("6. Search Movies by Keyword");
  console.log("7. Get Movie Details");
  console.log("8. Remove Movie");
  console.log("9. Exit");

  rl.question("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        rl.question(
          "Enter movie details (id, title, director, releaseYear, genre): ",
          (input) => {
            const [id, title, director, releaseYear, genre] = input.split(",");
            moviesManager.addMovie(
              id.trim(),
              title.trim(),
              director.trim(),
              parseInt(releaseYear.trim()),
              genre.trim()
            );
            mainMenu();
          }
        );
        break;
      case "2":
        rl.question("Enter movie ID and rating (1-5): ", (input) => {
          const [id, rating] = input.split(",");
          moviesManager.rateMovie(id.trim(), parseInt(rating.trim()));
          mainMenu();
        });
        break;
      case "3":
        console.log("Top Rated Movies:", moviesManager.getTopRatedMovies());
        mainMenu();
        break;
      case "4":
        rl.question("Enter genre: ", (genre) => {
          console.log(
            "Movies in Genre:",
            moviesManager.getMoviesByGenre(genre.trim())
          );
          mainMenu();
        });
        break;
      case "5":
        rl.question("Enter director: ", (director) => {
          console.log(
            "Movies by Director:",
            moviesManager.getMoviesByDirector(director.trim())
          );
          mainMenu();
        });
        break;
      case "6":
        rl.question("Enter keyword: ", (keyword) => {
          console.log(
            "Search Results:",
            moviesManager.searchMoviesBasedOnKeyword(keyword.trim())
          );
          mainMenu();
        });
        break;
      case "7":
        rl.question("Enter movie ID: ", (id) => {
          console.log("Movie Details:", moviesManager.getMovie(id.trim()));
          mainMenu();
        });
        break;
      case "8":
        rl.question("Enter movie ID to remove: ", (id) => {
          moviesManager.removeMovie(id.trim());
          mainMenu();
        });
        break;
      case "9":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid option. Try again.");
        mainMenu();
        break;
    }
  });
}

mainMenu();
