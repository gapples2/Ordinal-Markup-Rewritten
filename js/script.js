const D = ExpantaNum // switched to let so that loading can work
const app = new Vue({
  el: "#app",
  data: {
    tab: 1,
    markupSubTab: 1,
    optionSubTab: 1,
    boosterSubTab: 1,
    style: 1,
    game,
    displayOrd,
    displayPsiOrd,
    ordinalDisplay,
    calcOrdPoints,
    calculateHardy,
    theme,
    getAutoCost,
    factorCost,
    factorMult,
    factorEffect,
    buyFactor,
    factorUnlocked,
    factorShiftCosts,
    beautify,
    formatNumber,
    canMarkup,
    markupButtonText,
    displayOp,
    displayAutoclickerThing,
    displayAutoclickerProduction,
    hotkeyPresets,
    removePreset,
    factorShiftText
  }
}) 

theme.updateTheme()

