const D = ExpantaNum
let game = {
  ordinal: 0,
  over: 0,
  base: 10,
  ordinalPoints: 0,
  automation: {
    successor: {
      loop: 0,
      amount: 0
    },
    maximize: {
      loop: 0,
      amount: 0
    }
  },
  factors: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  }, // cant use arrays here because save system
  unlocks: {
    markup: false,
    dynamicFactor: false,
    boosters: false,
    challenges: false,
    incrementy: false,
    manifolds: false,
    collapse: false,
    darkness: false,
    singularity: false,
    singularityFunctions: false,
    omegaChallenges: false,
    incrementyverse: false,
    fractalEngine: false
  },
  // actually imma keep the not really implemented yet shit out
  lastTick: Date.now(),
  themeId: 0,
} // switched to let so that loading can work
const app = new Vue({
  el: "#app",
  data: {
    tab: 1,
    markupSubTab: 1,
    style: 1,
    game,
    displayOrd,
    ordinalDisplay,
    calcOrdPoints,
    calculateHardy,
    theme,
    getAutoCost
  }
}) 

theme.updateTheme()

