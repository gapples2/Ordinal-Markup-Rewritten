let hotkeyPresets = {
  main: {
    markup: "k",
    maxall: "m",
    factorShift: "s",
    successor: "",
    maximize: ""
  }
}
let game = {
  preset: "main",
  ordinal: 0,
  isPsi: false,
  opIsPsi: false,
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
    },
    psiAutoclicker: 0,
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
  boosterUpgrades: {
    col1: 0,
    col2: 0,
    col3: 0, 
    col4: 0,
    col5: 0
  },
  factorShifts: 0,
  factorBoosts: 0,
  boosters: 0,
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
  customTheme: {
    textColor: "black",
    bgColor: "white",
    markupTextColor: "white",
    markupBgColor: "black",
    markupBorderColor: "#B67F33",
    tabButtonTextColor: "black",
    tabButtonBgColor: "white",
    tabButtonBorderColor: "black",
    tabButtonHover: "#dfdfdf",
    buttonTextColor: "black",
    buttonBgColor: "white",
    buttonBorderColor: "black",
    buttonHoverColor: "#EFEFEF",
    boosterTextColor: "#3838ff",
    boosterBgColor: "#000000",
    boosterBorderColor: "#3838ff",
  },
  trim: 5,
}
const factorShiftCosts = [200,800,3000,50000,2e11,3e20,1e100,36*3+1, Infinity]
const ordMarks = [
  "&psi;(Ωx)",
  "&psi;(Ω<sup>2</sup>x)",
  "&psi;(Ω<sup>y</sup>)",
  "&psi;(Ω<sup>Ω</sup>x)",
  "&psi;(Ω<sup>Ω+1</sup>x)",
  "&psi;(Ω<sup>Ω+2</sup>x)",
  "&psi;(Ω<sup>Ω+y</sup>)",
  "&psi;(Ω<sup>Ω2</sup>x)",
  "&psi;(Ω<sup>Ω2+1</sup>x)",
  "&psi;(Ω<sup>Ω2+2</sup>x)",
  "&psi;(Ω<sup>Ω2+y</sup>)",
  "&psi;(Ω<sup>Ωy</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup></sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+y</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+y</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
  "&psi;(Ω<sup>Ω<sup>2</sup>y</sup>)",
  "&psi;(Ω<sup>Ω<sup>y</sup></sup>)",
  "BHO"
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]