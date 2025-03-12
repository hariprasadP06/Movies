export type Movie = {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    ratings: number[];
  };
  
  export class MoviesManagement {
    private movies: Map<string, Movie> = new Map();
  
    addMovie(id: string, title: string, director: string, releaseYear: number, genre: string): void {
      if (this.movies.has(id)) {
        console.log("Movie with this ID already exists.");
        return;
      }
      this.movies.set(id, { id, title, director, releaseYear, genre, ratings: [] });
    }
  
    rateMovie(id: string, rating: number): void {
      if (!this.movies.has(id)) {
        console.log("Movie not found.");
        return;
      }
      if (rating < 1 || rating > 5) {
        console.log("Rating should be between 1 and 5.");
        return;
      }
      this.movies.get(id)!.ratings.push(rating);
    }
  
    getAverageRating(id: string): number | undefined {
      const movie = this.movies.get(id);
      if (!movie || movie.ratings.length === 0) return undefined;
      const sum = movie.ratings.reduce((acc, val) => acc + val, 0);
      return sum / movie.ratings.length;
    }
  
    getTopRatedMovies(): Movie[] {
      return Array.from(this.movies.values())
        .filter(movie => movie.ratings.length > 0)
        .sort((a, b) => (this.getAverageRating(b.id) || 0) - (this.getAverageRating(a.id) || 0));
    }
  
    getMoviesByGenre(genre: string): Movie[] {
      return Array.from(this.movies.values()).filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }
  
    getMoviesByDirector(director: string): Movie[] {
      return Array.from(this.movies.values()).filter(movie => movie.director.toLowerCase() === director.toLowerCase());
    }
  
    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
      return Array.from(this.movies.values()).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }
  
    getMovie(id: string): Movie | undefined {
      return this.movies.get(id);
    }
  
    removeMovie(id: string): void {
      if (!this.movies.has(id)) {
        console.log("Movie not found.");
        return;
      }
      this.movies.delete(id);
    }
  }