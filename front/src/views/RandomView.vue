<template>
  <div>
    <h2 class="text-white">오태식의 추천영화</h2>

    <!-- 장르 선택 -->
    <div v-if="first">
      <img
        src="@/assets/sok2.gif"
        alt="꼭 그렇게 다 가져가야만 속이 후련했냐"
      />
      <p class="text-white">너넨 추천 받으면 안됐어...</p>
      <h5 class="text-white">꼭 그렇게 추천을 받아야만 속이 후련했냐!!!!</h5>
    </div>

    <!-- 랜덤 영화 출력 -->

    <div v-if="!first">
      <div v-if="randomMovie" >
        <div class="row">
          <div class="col-6"> 
            <img class="movie-card" v-bind:src="`https://image.tmdb.org/t/p/original${randomMovie.poster_path}`" alt="movie poster" />
          </div>
          
          
          <div class= "col-5 text-white">
            <br>
            <br>
            <h3 >{{ randomMovie.title }}</h3>
            <br>
            <p> 평점: {{randomMovie.vote_average}}</p>
            <br>
            <p v-if="showFullOverview">{{ randomMovie.overview ? randomMovie.overview : '줄거리가 없네... 오태식이 슬퍼서 어쩌냐'}}</p>
            <p v-else>{{ randomMovie.overview.substring(0, 150) }}...</p>
            <br>
            <button class="btn btn-outline-dark" @click="toggleOverview">{{ showFullOverview ? '간략히 보기' : '더 보기' }}</button>
          
            <div>
              <div class="card-group">
                <div class="card text-bg-success ">
                  <img src="@/assets/byeong.jpg" class="card-img-top" alt="...">
                  <!-- <div class="card-body"> -->
                    <h5 class="text-bg-success p-3">고맙다... 태식아</h5>
                    <router-link class="text-bg-success p-3" :to="{ name: 'DetailView', params:{ id: randomMovie.id} }">영화 자세히 보기</router-link>
                    
                  <!-- </div> -->
                </div>
                <div class="card text-bg-danger">
                  <img src="@/assets/naga.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">병진이형, 나가</h5>
                    <h5 class="card-title">나가, 뒤지기 싫으면</h5>
                    <button class="text-bg-danger" @click="fetchRandomMovie">영화 다시 추천 받기</button>
                    
                  </div>
                </div>
                
              </div>
            </div>
          
          </div>


        </div>
      </div>
      <div v-else>No movie available</div>
      <!-- <div class="masthead" :style="randomMoviePosterURL" >
        <div class="container bg-dark">
          <div class="masthead-subheading">Welcome To Our Studio!</div>
          <div class="masthead-heading text-uppercase">
            It's Nice To Meet You
          </div>
          <a class="btn btn-primary btn-xl text-uppercase" href="#services"
            >Tell Me More</a
          >
        </div>
      </div> -->
    </div>

    <!-- 랜덤 영화 가져오기 버튼 -->
    <div class="d-flex justify-content-center " style="width: 100%">
      <div class="">
      <select class="form-select form-select-sm " v-model="selectedGenre">
        <option value="">전체</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
      </div>
    </div>
      <div v-if="first">
        <button class="btn btn-primary" @click="fetchRandomMovie">랜덤 영화 추출</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      first: true,
      selectedGenre: null,
      showFullOverview: false,
    };
  },
  computed: {
    ...mapGetters(["getRandomMovie"]),
    genres() {
      return this.$store.state.genres;
    },
    randomMovie() {
      console.log(this.$store.state.randomMovie)
      return this.$store.state.randomMovie;
    },
    randomMoviePosterURL() {
      if (this.randomMovie && this.randomMovie.poster_path) {
        console.log(
          `{ backgroundImage: url("https://image.tmdb.org/t/p/original${this.randomMovie.poster_path}"); }`
        );
        // return `https://image.tmdb.org/t/p/original${this.randomMovie.poster_path}`;
        return `background-image: url("https://image.tmdb.org/t/p/original${this.randomMovie.poster_path}");`;
      }
      return ""; // 예외 처리: URL이 없을 경우 빈 문자열 반환
    },
  },
  methods: {
    fetchRandomMovie() {
      if (this.selectedGenre === null) {
        alert("장르를 선택하시오");
        return;
      } else {
        this.first = false;
        this.$store.dispatch("getRandomMovie", this.selectedGenre);
      }
    },
    toggleOverview() {
      this.showFullOverview = !this.showFullOverview;
    },
  },
  created() {
    this.$store.dispatch("fetchGenres");
  },
};
</script>

<style>
.movie-card {
  height:600px;
  width: 400px;
  margin: 10px;
}
div.masthead {
  padding-top: 10.5rem;
  padding-bottom: 6rem;
  text-align: center;
  color: #fff;
  background-image: url("");
  background-repeat: no-repeat;
  /* background-attachment: scroll; */
  background-position: center center;
  /* background-size: cover; */
  object-fit: scale-down;
  
}
header.masthead .masthead-subheading {
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.5rem;
  margin-bottom: 25px;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
header.masthead .masthead-heading {
  font-size: 3.25rem;
  font-weight: 700;
  line-height: 3.25rem;
  margin-bottom: 2rem;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

@media (min-width: 768px) {
  header.masthead {
    padding-top: 17rem;
    padding-bottom: 12.5rem;
  }
  header.masthead .masthead-subheading {
    font-size: 2.25rem;
    font-style: italic;
    line-height: 2.25rem;
    margin-bottom: 2rem;
  }
  header.masthead .masthead-heading {
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 4.5rem;
    margin-bottom: 4rem;
  }
}
</style>
