<template>
  <div class="search-city-name">
    <div class="sun"></div>
    <form id="weather-form">
      <div class="container">
        <div class="row">
          <div class="col-md-offset-0">
            <div class="weather-container">
              <h1>Weather forecast</h1>
              <div class="get-weather">
                <input
                  v-model="cityName"
                  id="cityName-input"
                  type="text"
                  placeholder="Enter the city name"
                  required
                />

                <button @click="shareData()" id="get-button" class="get-button">
                  Get
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="clouds">
      <img src="../assets/cloud1.png" alt="" style="--i: 1" />
      <img src="../assets/cloud2.png" alt="" style="--i: 2" />
      <img src="../assets/cloud3.png" alt="" style="--i: 3" />
      <img src="../assets/cloud4.png" alt="" style="--i: 4" />
      <img src="../assets/cloud5.png" alt="" style="--i: 5" />
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "SearchCityName",
  computed: {
    cityName: {
      get() {
        return this.$store.state.cityName;
      },
      set(newValue) {
        this.$store.commit("setCityName", newValue);
      },
    },
  },

  // , params: {data:this.cityName}
  methods: {
    shareData() {
      localStorage.setItem("cityName", this.$store.state.cityName);

      if (window.localStorage.getItem("cityName") == "") {
        window.alert("input field cannot be empty!");
      } else {
        this.$router.push({ name: "CityWeather" });
      }
    },
  },
};
</script>

<style scoped>
/* Start clouds css */
* {
  box-sizing: border-box;
}
.clouds {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.clouds img {
  position: absolute;
  bottom: 0;
  max-width: 100%;
  animation: animate calc(8s * var(--i)) linear infinite;
}
@keyframes animate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
/* End clouds css */
.search-city-name {
  height: 100vh;
  background-image: linear-gradient(
    to bottom,
    hsl(236deg 62% 43%),
    hsl(203deg 82% 44%)
  );
}

* {
  box-sizing: border-box;
}

.weather-container {
  width: 80vw;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 20%;
}
.weather-container .get-weather {
  padding: 20px;
  display: flex;
  position: relative;
  z-index: 100;
}
.weather-container .get-weather input {
  color: white;
  width: 100%;
  padding: 15px 20px;
  border: none;
  border: 2px solid white;
  font-size: 20px;
  height: 54px;
  border-radius: 1vw;
  font-family: "Cairo", sans-serif;

  background-color: rgba(255, 255, 255, 0.151);
}
::placeholder {
  color: white;
  font-family: "Cairo", sans-serif;
}
.weather-container .get-weather input:hover {
  box-shadow: 0 0 1vw rgba(255, 255, 255, 0.425);
}
.weather-container .get-weather input:focus {
  outline: none;
  box-shadow: 0 0 1vw rgba(255, 255, 255, 0.425);
}
.weather-container .get-weather .get-button {
  font-family: "Cairo", sans-serif;
  text-decoration: none;

  width: 25%;
  margin-left: 1vw;
  height: 54px;
  background-color: white;
  color: hsl(203deg 82% 44%);
  line-height: 54px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
}
.weather-container .get-weather .get-button:hover {
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.76);
}
button {
  outline: none;
  border: none;
}
h1 {
  width: fit-content;
  margin: auto;
  text-align: center;
  font-family: "Sacramento", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 7vw;
  text-shadow: 0vw 0vw 1vw white;
  position: relative;
  z-index: 10;
  top: 3vw;
  color: white;
}
.sun {
  height: 200px;
  width: 200px;
  background-color: #f9d71c;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  border-radius: 50%;
  top: -100px;
  left: -100px;
  box-shadow: 0vw 0vw 0vw rgba(255, 255, 0, 0.664);
  animation-name: example;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes example {
  0% {
    box-shadow: 0vw 0vw 3vw rgba(255, 255, 0, 0.664);
  }
  100% {
    box-shadow: 10vw 10vw 20vw rgba(255, 255, 0, 0.664);
  }
}
@media only screen and (max-width: 992px) {
  h1 {
    top: 6vw;
  }
  .weather-container .get-weather input {
    border: 0.2vw solid white;
  }
  .sun {
    height: 150px;
    width: 150px;
    top: -75px;
    left: -75px;
  }
  h1 {
    font-size: 14vw;
  }
  .weather-container .get-weather .get-button {
    border-radius: 1vw;
    height: 7vw;
    line-height: 7vw;
    font-size: 3vw;
  }
  .weather-container .get-weather input {
    padding: 0;
    padding-left: 2vw;
    height: 7vw;
    font-size: 3.5vw;
  }
}

@media only screen and (max-width: 450px) {
  h1 {
    top: 9vw;
  }
}
</style>
