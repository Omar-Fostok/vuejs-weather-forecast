<template>
  <div class="hourWeather">
    <h2>Today's weather</h2>
    <div class="scroller" id="scroll">
      <Card
        v-for="index in 16"
        :key="index"
        :hour="hours[index - 1]"
        :temp="temps[index - 1]"
        :image="images[index - 1]"
      />
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";

export default {
  name: "WeatherToday",
  props: ["hours", "temps", "images"],
  components: {
    Card,
  },
};
</script>
<style scoped>
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
.degree {
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
.small-sup {
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
.small-sup {
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
  .newImagePos {
    padding: 0;
  }
  .nextFiveDays {
    margin-left: 1vw;
  }
  .newDayPos {
    position: relative;
    bottom: -2vw;
  }
  .newImagePos {
    position: relative;
    bottom: -13px;
    margin: auto;
  }
  .newHighPos {
    position: relative;
    bottom: -45px;
    right: -21px;
  }
  .newLowPos {
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

  .newHighPos {
    bottom: -35px;
  }
  .newLowPos {
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
  .degree {
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
  .newHighPos {
    position: relative;
    bottom: -45px;
    right: -21px;
  }
  .newLowPos {
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
  .newHighPos {
    position: relative;
    bottom: -45px;
    right: -21px;
  }
  .newLowPos {
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
  .degree {
    font-size: 100px;
  }

  .image1 {
    width: 190px;
    top: -2px;
    left: -35px;
  }
}
</style>
