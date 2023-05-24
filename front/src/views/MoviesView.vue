<template>
  <div>
    <div class="genre-filter">
      <div
        class="genre-option"
        v-for="genre in genres"
        :key="genre.id"
        :class="{ 'selected': genre.id === selectedGenre }"
        @click="selectGenre(genre.id)"
      >
        {{ genre.name }}
      </div>
    </div>
    <div class="container d-flex">
      <div class="row justify-content-center">
        <MovieCard
          class="mb-5 col-xs-12 col-md-6 col-lg-4 col-xl-3"
          v-for="movie in visibleMovies"
          :key="movie.id"
          :movie="movie"
          @click="openModal(movie)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard';

export default {
  name: 'MoviesView',
  components: {
    MovieCard,
  },
  data() {
    return {
      page: 1,
      perPage: 20,
      totalMovies: 0,
      movies: [],
      selectedGenre: '',
      genres: [],
    };
  },
  computed: {
    visibleMovies() {
      const filteredMovies = this.movies.filter((movie) => {
        return !this.selectedGenre || movie.genres.includes(this.selectedGenre);
      });
      return filteredMovies.slice(0, this.page * this.perPage);
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  created() {
    this.getCard();
    this.fetchGenres();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    getCard() {
      if (this.isLogin) {
        this.$store.dispatch('getCard').then(() => {
          this.movies = this.$store.state.Movies;
          this.totalMovies = this.movies.length;
        });
      } else {
        alert('로그인이 필요한 페이지입니다...');
        this.$router.push({ name: 'LogInView' });
      }
    },
    // openModal(movie) {
    //   // 모달 열기
    // },
    handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const distanceFromBottom = documentHeight - (windowHeight + scrollTop);

      if (distanceFromBottom < 100) {
        if (this.page * this.perPage < this.totalMovies) {
          this.page++;
        }
      }
    },
    selectGenre(genreId) {
      if (this.selectedGenre === genreId) {
        this.selectedGenre = ''; // If the clicked genre is already selected, deselect it
      } else {
        this.selectedGenre = genreId;
      }
      this.page = 1;
    },
    fetchGenres() {
      this.$store.dispatch('fetchGenres')
        .then(() => {
          this.genres = this.$store.state.genres; // 장르 데이터 설정
        });
    },
  },
};
</script>

<style>
.genre-filter {
  margin-bottom: 20px;
}

.genre-option {
  display: inline-block;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.selected {
  background-color: #8a8a8a;
  color: #fff;
}

.selected:hover {
  background-color: #707070;
}
</style>
