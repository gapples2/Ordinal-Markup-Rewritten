const D = ExpantaNum
let game = {
  ordinal: 0,
  over: 0,
  base: 10,
  ordinalPoints: 0,
  lastTick: Date.now()
} // switched to let so that loading can work
const app = new Vue({
  el: "#app",
  data: {
    tab: 1,
    style: 1,
    game,
    displayOrd,
    ordinalDisplay
  }
})



