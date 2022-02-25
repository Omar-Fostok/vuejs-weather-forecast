<template>
  <div class="city-weather">
    <div class="container">
      <CityName
        :cityName="cityName"
        :countryName="countryName"
        :dayName="dayName"
        :dayDateNumber="dayDateNumber"
        :monthName="monthName"
      />
      <WeatherToday
        :image1="image1"
        :nowTemp="nowTemp"
        :weatherDescription="weatherDescription"
        :high_temp="high_temp"
        :wind_speed="wind_speed"
        :sunrise="sunrise"
        :low_temp="low_temp"
        :nowRain="nowRain"
        :sunset="sunset"
      />
      <HourWeather :hours="hours" :temps="temps" :images="images" />
      <NextFiveDays
        :shortDayNames="shortDayNames"
        :numberDates="numberDates"
        :lastImages="lastImages"
        :lowTemps="lowTemps"
        :highTemps="highTemps"
        :windSpeeds="windSpeeds"
        :rains="rains"
      />
    </div>
  </div>
</template>

<script>
import CityName from "@/components/CityName.vue";
import WeatherToday from "@/components/WeatherToday.vue";
import HourWeather from "@/components/HourWeather.vue";
import NextFiveDays from "@/components/NextFiveDays.vue";

export default {
  name: "CityWeather",
  data() {
    return {
      // CityName variables
      cityName: "",
      countryName: "",
      dayName: "",
      monthName: "",
      dayDateNumber: "",

      //
      x: 0,
      newcityName: localStorage.getItem("cityName"),
      long: "",
      lat: "",
      nowTemp: "",
      weatherDescription: "",
      image1: "",
      high_temp: "",
      wind_speed: "",
      sunrise: "",

      low_temp: "",
      nowRain: "",
      sunset: "",
      //

      // Cards Variables:
      hours: [],
      temps: [],
      images: [],

      // five days Variables:
      shortDayNames: [],
      numberDates: [],
      lastImages: [],
      lowTemps: [],
      highTemps: [],
      windSpeeds: [],
      rains: [],
    };
  },
  components: {
    CityName,
    WeatherToday,
    HourWeather,
    NextFiveDays,
  },

  methods: {
    formatAMPM(date) {
      var hours = date.getHours();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var strTime = hours + ampm;
      return strTime;
    },

    addZero(i) {
      if (0 <= i && i < 10) {
        i = "0" + i;
      }
      return i;
    },
  },
  created() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.newcityName}&units=metric&appid=f9cc0c5cf5c32caf5dd37a486785213a`
    )
      .then((response) => response.json())
      .then((data) => {
        // // longtitude
        this.long = data.coord.lon;
        // // latitude
        this.lat = data.coord.lat;
        this.cityName = data.name + ", ";
        this.countryName = data.sys.country;
        this.nowTemp =
          this.addZero(Math.round(data.main.temp)) +
          "<sup class='degree'> &deg;</sup>";
        this.weatherDescription = data.weather[0].description;
        this.image1 = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        this.high_temp =
          Math.round(data.main.temp_max) +
          "<sup class='small-sup'> &deg;</sup>";
        this.wind_speed = Math.round(data.wind.speed) + "mph";
        let date = new Date(data.sys.sunrise * 1000);
        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        this.dayName = days[date.getDay()];
        this.dayDateNumber = date.getUTCDate();
        this.monthName = date.toLocaleString("en-us", { month: "long" });
        let h = this.addZero(date.getHours());
        let m = this.addZero(date.getMinutes());
        let time = h + ":" + m;
        this.sunrise = time;
        this.low_temp =
          Math.round(data.main.temp_min) +
          "<sup class='small-sup'> &deg;</sup>";
        this.nowRain = data.main.humidity + "%";
        // // Sun set
        let date2 = new Date(data.sys.sunset * 1000);
        let h2 = this.addZero(date2.getHours());
        let m2 = this.addZero(date2.getMinutes());
        let time2 = h2 + ":" + m2;
        this.sunset = time2;
        // // End of first api
        ///
        ///
        // Starting the second
        return fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=minutely&units=metric&appid=f9cc0c5cf5c32caf5dd37a486785213a`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        // // Dealing with scrollHtml
        for (let i = 0; i < 48; i += 3) {
          //     // hours
          let date3 = new Date(data.hourly[i].dt * 1000);
          let time3 = this.formatAMPM(date3);
          this.hours.push(time3);
          //     // temp
          let newTemp =
            Math.round(data.hourly[i].temp) +
            '<sup class="small-sup-2">&deg;</sup>';
          this.temps.push(newTemp);
          //     // image - icon
          this.images.push(
            `http://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}@4x.png`
          );
        }
        //////////////////////////////////////////

        // // Dealing with fiveDaysHtml
        for (let i = 1; i <= 5; i++) {
          //     // preparations
          let date = new Date(data.daily[i].dt * 1000);
          var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

          let rightIndex = date.getDay();

          //      short day name
          this.shortDayNames.push(days[rightIndex]);

          this.numberDates.push(
            date.getUTCDate() + "/" + (date.getUTCMonth() + 1)
          );

          this.lastImages.push(
            `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@4x.png`
          );

          this.lowTemps.push(
            Math.round(data.daily[i].temp.min) +
              ` <span class="yes">-<span class="yes3">99</span> </span> <sup
                class="small-sup no"> &deg;</sup>`
          );

          this.highTemps.push(
            Math.round(data.daily[i].temp.max) +
              ` <sup class="small-sup">&deg;</sup>`
          );

          this.windSpeeds.push(Math.round(data.daily[i].wind_speed) + "mph");

          this.rains.push(Math.round(data.daily[i].humidity) + "%");
        }
      })
      .catch((err) => {
        alert("City Name is Not correct!!!");
        this.$router.push({ name: "SearchCityName" });
        throw err;
      });
  },
};
</script>

<style scoped>
.city-weather {
  background-image: linear-gradient(
    to bottom,
    hsl(236deg 62% 43%),
    hsl(203deg 82% 44%)
  );
  background-attachment: fixed;
  font-family: "Roboto", sans-serif !important;
  overflow-x: hidden;
  height: 100vh;
}
.city-weather >>> .container {
  font-family: "Roboto", sans-serif !important;
}
:root {
  --font: "Roboto", sans-serif;
}
/* var(--font) */
/* font-family: 'Roboto', sans-serif; */
body {
  /* background-color: hsl(236deg 62% 43%); */
  background-image: linear-gradient(
    to bottom,
    hsl(236deg 62% 43%),
    hsl(203deg 82% 44%)
  );
  background-attachment: fixed;
  font-family: var(--font);
  overflow-x: hidden;
}
/* additional */
#cityName {
  text-transform: capitalize;
}
/* end-additional */

h1 {
  color: white;
  font-size: xx-large;
  margin-bottom: 0;
}
p {
  color: hsl(233deg 48% 87%);
}
h2 {
  color: hsl(233deg 48% 87%);
  font-size: 19px;
}
.image1 {
  position: absolute;
  top: -22px;
  left: -52px;
  width: 250px;
  color: white;
  margin-left: 6vw;
  float: left;
}
.today-temp1 {
  color: white;
  font-size: 100px;
  float: right;
  font-weight: 300;
  margin-top: -3px;
}
.today-left {
  border-right: 1px solid rgb(255 255 255 / 0.3);
  height: 200px;
  padding: 27px;
}
.today-right {
  padding: 0 27px;
}
.city-weather >>> .degree {
  font-size: 120px;
  font-weight: 100;
  position: relative;
  top: 0px;
  left: -35px;
}
hr {
  opacity: 30%;
  display: none;
}
.clear {
  clear: both;
}
.today-temp2 {
  color: rgb(255 255 255 / 0.7);
  float: right;
  font-size: 20px;
  position: relative;
  top: -32px;
  left: -59px;
  width: 150px;
  text-align: center;
  margin: auto;
}
.up {
  color: white;
  font-size: 22px;
  text-align: center;
}
.down {
  color: rgb(255 255 255 / 0.6);
  text-align: center;
  margin-top: -4px;
  font-size: 13px;
}
.cell {
  text-align: center;
}
.table1 {
  width: 100%;
  height: 200px;
}
.table1 tr {
  width: 100%;
  text-align: center;
}
.table1 td,
.table1 th {
  text-align: center;
  width: 33.33%;
}
.temp-small {
  position: relative;
  width: fit-content;
  margin: auto;
}
.card1 .temp-small {
  top: -5px;
}
.city-weather >>> .small-sup {
  position: absolute;
  right: -8px;
  top: 14px;
  font-size: 25px;
  font-weight: 100;
}
.hourWeather,
.nextFiveDays {
  margin-top: 70px;
}
.scroller {
  width: 100%;
  height: 150px;
  overflow-x: scroll;
  white-space: nowrap !important;
}

.test {
  white-space: nowrap;
}

.card1 {
  width: 105px;
  background-color: hsl(210deg 76% 35%);
  display: inline-block;
  height: 150px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 7px;
  line-height: 20px;
  padding-top: 5px;
}
.card1:hover {
  background-color: rgb(25, 109, 194);
}
.day {
  margin-top: 5px;
  margin-bottom: 5px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scroller::-webkit-scrollbar,
.scroller2::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroller,
.scroller2 {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.images-2 {
  width: 100px;
}
.img {
  width: 85px;
}
.hour {
  text-align: center;
  color: rgb(255 255 255 / 0.9);
  font-size: large;
  position: relative;
  bottom: -8px;
}
.icon-2 {
  width: fit-content;
  margin: auto;
}
.temp-3 {
  color: rgb(255 255 255 / 0.9);
  position: relative;
  font-size: large;
}
.city-weather >>> .small-sup {
  position: absolute;
  right: -8px;
  top: 14px;
  font-size: 25px;
  font-weight: 100;
}
.day {
  background-color: hsl(210deg 76% 35%);
  width: 100%;
  height: 80px;
  border-radius: 5px;
}
.day:hover {
  background-color: rgb(25, 109, 194);
}
.table2 {
  width: 100%;
  height: 100%;
}
.table2 td {
  text-align: center;
  width: 16.66666%;
}
.test {
  text-align: center;
}
.test .cell {
  margin-top: 16px;
}
.test .img {
  margin: auto;
  margin-top: 0px;
}
.col-13 {
  width: calc((100vw / 5) - 1vw);
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  float: left;
}
.special4 {
  display: none;
}
.yes {
  display: none;
}
.yes3 {
  display: none;
}
@media only screen and (max-width: 991px) {
  .city-weather >>> .newImagePos {
    padding: 0;
  }
  .nextFiveDays {
    margin-left: 1vw;
  }
  .city-weather >>> .newDayPos {
    position: relative;
    bottom: -2vw;
  }
  .city-weather >>> .newImagePos {
    position: relative;
    bottom: -13px;
    margin: auto;
  }
  .city-weather >>> .newHighPos {
    position: relative;
    bottom: -45px;
    right: -21px;
  }
  .city-weather >>> .newLowPos {
    position: relative;
    bottom: 8px;
    left: -8px;
  }
  .yes3 {
    display: inline-block;
    visibility: hidden;
  }
  .special4 {
    display: block;
    visibility: hidden;
  }
  .col-xs-2 {
    width: 19.83%;
  }
  .scroller2 {
    width: 100%;
    height: 150px;
    overflow-x: scroll;
    white-space: nowrap !important;
  }
  .scroller2 {
    height: 200px;
  }
  .yes2 {
    margin-top: -100px;
  }
  .yes {
    display: inline-block;
    margin-right: -12px;
  }
  .no {
    display: none;
  }

  .day {
    height: 170px;
  }
  .hourWeather {
    display: none;
  }
  .table1 {
    margin-top: 10px;
    margin-bottom: -20px;
  }
  .today-left {
    border: none;
  }
  hr {
    display: block;
  }
}
@media only screen and (max-width: 660px) {
  .col-xs-2 {
    width: 32.9%;
  }
}
@media only screen and (max-width: 450px) {
  .img {
    width: 100%;
  }
  .test .img {
    margin-top: -18px;
  }

  .city-weather >>> .newHighPos {
    bottom: -35px;
  }
  .city-weather >>> .newLowPos {
    bottom: 18px;
  }

  .nextFiveDays {
    margin-left: 2vw;
  }
  .table1 {
    margin-top: -10px;
  }

  .col-xs-2 {
    padding-right: 0;
  }
  .today-temp1 {
    font-size: 80px;
    margin-right: -10vw;
  }
  .today-temp2 {
    font-size: 17px;
    left: 1vw;
    top: -25px;
  }
  .city-weather >>> .degree {
    font-size: 100px;
  }

  .image1 {
    width: 190px;
    top: -2px;
    left: -35px;
  }
}

@media only screen and (max-width: 375px) {
  .test .img {
    margin-top: -10px;
  }
  .city-weather >>> .newHighPos {
    position: relative;
    bottom: -45px;
    right: -21px;
  }
  .city-weather >>> .newLowPos {
    position: relative;
    bottom: 8px;
    left: -8px;
  }
}
@media only screen and (max-width: 350px) {
  .img {
    width: 100%;
  }
  .test .img {
    margin-top: 0;
  }
  .city-weather >>> .newHighPos {
    position: relative;
    bottom: -45px;
    right: -21px;
  }
  .city-weather >>> .newLowPos {
    position: relative;
    bottom: 8px;
    left: -8px;
  }
  .nextFiveDays {
    margin-left: 2vw;
  }
  .table1 {
    margin-top: -10px;
  }

  .col-xs-2 {
    padding-right: 0;
  }
  .today-temp1 {
    font-size: 80px;
    margin-right: -10vw;
  }
  .today-temp2 {
    font-size: 17px;
    left: 1vw;
    top: -25px;
  }
  .city-weather >>> .degree {
    font-size: 100px;
  }

  .image1 {
    width: 190px;
    top: -2px;
    left: -35px;
  }
}
</style>
