// MARKUP
function calcOrdPoints(ord = game.ordinal, base = game.base, over = game.over) {
  if (ord < base) return ord + over
  else {
    const magnitude = Math.floor(Math.log(ord+0.1)/Math.log(base))
    const magAmount = Math.pow(base,magnitude)
    const amount = Math.floor((ord+0.1)/magAmount)
    return 10**calcOrdPoints(magnitude,base,0)*amount+calcOrdPoints(ord-magAmount*amount,base,over)
  } 
}

function markup() {
  if (calculateHardy(game.ordinal, game.over, game.base) >= 10240) {
    game.ordinalPoints = Math.min(calcOrdPoints() + game.ordinalPoints, 1e257)
    game.ordinal = 0;
    game.over = 0;
  }
}
// TIER 1 AUTOMATION
function getAutoCost(a) {
  return 100*2**game.automation[a].amount
}
function buySuccessorAuto() {
  if(game.ordinalPoints >= getAutoCost("successor")) {
    game.ordinalPoints -= getAutoCost("successor")
    game.automation.successor.amount++
  }
}
function buyMaximizeAuto() {
  if(game.ordinalPoints >= getAutoCost("maximize")) {
    game.ordinalPoints -= getAutoCost("maximize")
    game.automation.maximize.amount++
  }
}
// FACTORS & FACTOR SHIFTS
function buyFactor(n) { 
  
} 
function factorCost(n) {
  game.factors[n]
}