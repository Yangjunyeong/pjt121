import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    Movies:[],
    genres: [],
    token: null,
    randomMovie: null,
    recentMovies:[],
  },
  getters: {
    isLogin: state => state.token ? true : false,
    getRandomMovie: state => state.randomMovie
  },
  mutations: {
    // signup & login -> 완료하면 토큰 발급
    SAVE_TOKEN (state, token) {
      state.token = token
      router.push({name : 'home'}) // store/index.js $router 접근 불가 -> import를 해야함
    },
    //
    GET_CARD(state, resdata){
      state.Movies = resdata
      console.log(resdata)
    },
    LOGOUT(state) {
      state.token = null;
    },
    SET_GENRES(state, genres) {
      state.genres = genres
    },
    SET_RANDOM_MOVIE(state, movie) {
      state.randomMovie = movie
    },
    GET_RECENT(state, recent){
      state.recentMovies = recent
    }
  },
  actions: {
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
        .then((res) => {
          // console.log(res)
          // context.commit('SIGN_UP', res.data.key)
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
        console.log(err)
      })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key)
        })
      .catch((err) => console.log(err))
    },
    logout(context) {
      context.commit('LOGOUT');
      // 로그아웃 후 로그인 페이지로 이동하거나 다른 필요한 동작을 수행할 수 있습니다.
      router.push({ name: 'LogInView' });
    },
    //
    getCard(context){
      axios({
        method:'get',
        url:"http://127.0.0.1:8000/api/v1/movies/",
        headers:{
          Authorization:`Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          context.commit('GET_CARD', res.data)

        })
        .catch(() =>{
          alert('에러떴다')
        })
    },
    fetchGenres({ commit }) {
      axios.get(`${API_URL}/api/v1/movies/genres/`)
        .then((res) => {
          commit('SET_GENRES', res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getRandomMovie({ commit, state }, genreId = null) {
      let filteredMovies = state.Movies

      if (genreId) {
        filteredMovies = filteredMovies.filter((movie) => movie.genres.includes(genreId))
      }

      const randomIndex = Math.floor(Math.random() * filteredMovies.length)
      const randomMovie = filteredMovies[randomIndex]
      commit('SET_RANDOM_MOVIE', randomMovie)
    },
    getRecentMovies(context){
      const API_KEY= "e61e2e3c124b0718f734281454239f47"
      const API_URL = `https://api.themoviedb.org/3/movie/now_playing`
      axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          language: "ko-KR",
          page: 1,
        }
      })
      .then(res => {
        // 응답 데이터를 처리합니다.
        // const recentMovies = response.data.results;
        console.log(res.data.results);
        context.commit('GET_RECENT', res.data.results)
      })
      .catch(error => {
        // 오류를 처리합니다.
        console.error(error);
      });
    }
  },
  modules: {
  }
})
