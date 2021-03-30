// MARKUP
function calcOrdPoints(ord = game.ordinal, base = game.base, over = game.over,) {
  if (ord < base) return ord + over
  else {
    const magnitude = Math.floor(Math.log(ord+0.1)/Math.log(base))
    const magAmount = Math.pow(base,magnitude)
    const amount = Math.floor((ord+0.1)/magAmount)
    return 10**calcOrdPoints(magnitude,base,0)*amount+calcOrdPoints(ord-magAmount*amount,base,over)
  } 
}

function canMarkup() {
  return game.ordinal >= game.base ** 2 || game.isPsi
}

function markup() {
  if(game.isPsi) {
    game.opIsPsi = true
    game.ordinalPoints = game.ordinal + 1
    if (!game.automation.psiAutoclicker) {
      game.ordinal = 0;
      game.over = 0;
      game.isPsi = false;
    }
    game.unlocks.markup = true;
  } else if (canMarkup()) {
    if (!game.opIsPsi) game.ordinalPoints = Math.min(calcOrdPoints() + game.ordinalPoints, 1e257)
    game.ordinal = 0;
    game.over = 0;
    game.isPsi = false;
    game.unlocks.markup = true;
  }
}
function markupButtonText() {
  if (game.isPsi) return `Markup to gain ${displayOp(game.ordinal + 1, true)} Ordinal Points ${hotkeyPresets[game.preset].markup != "" ? `(${hotkeyPresets[game.preset].markup})` : ""}` // `Markup to gain g<sub>${displayPsiOrd(game.ordinal, game.trim)}</sub>(10) Ordinal Points`
  if (canMarkup()) return `Markup to gain ${displayOp(calcOrdPoints(game.ordinal, game.base, game.over), false)} Ordinal Points ${hotkeyPresets[game.preset].markup != "" ? `(${hotkeyPresets[game.preset].markup})` : ""}` // `Markup to gain ${formatNumber(calcOrdPoints(game.ordinal,game.base,game.over))} Ordinal Points`
  return `Reach &omega;<sup>2</sup> to Markup ${hotkeyPresets[game.preset].markup != "" ? `(${hotkeyPresets[game.preset].markup})` : ""}`
}

function displayOp(amount = game.ordinalPoints, isPsi = game.opIsPsi) {
  if (isPsi) return `g<sub>${displayPsiOrd(amount, game.trim)}</sub>(10)`
  return formatNumber(amount)
}



// TIER 1 AUTOMATION
function getAutoCost(a) {
  if (game.automation.psiAutoclicker) return game.automation.psiAutoclicker
  return 100*2**game.automation[a].amount
}
function buySuccessorAuto() {
  if (game.opIsPsi) return
  if (game.ordinalPoints >= getAutoCost("successor")) {
    game.ordinalPoints -= getAutoCost("successor")
    game.automation.successor.amount++
  }
}
function buyMaximizeAuto() {
  if (game.opIsPsi) return
  if (game.ordinalPoints >= getAutoCost("maximize")) {
    game.ordinalPoints -= getAutoCost("maximize")
    game.automation.maximize.amount++
  }
}
function maxAllAutobuyers() {
  if(!game.opIsPsi) {
    const bulkSucc = Math.floor(Math.log2(game.ordinalPoints/100))
    const bulkBuySucc = Math.max(bulkSucc - game.automation.successor.amount, 0)
    game.automation.successor.amount += bulkBuySucc
    if (bulkBuySucc > 0) game.ordinalPoints -= 100*(2**(game.automation.successor.amount-1))
    for (const i in [1,2,3,4,5,6,7,8,9]) if(bulkBuySucc > i+1) game.ordinalPoints -= 100*(2**(game.automation.successor.amount-(i+2)))

    const bulkMax = Math.floor(Math.log2(game.ordinalPoints/100))
    const bulkBuyMax = Math.max(bulkMax - game.automation.maximize.amount, 0)
    game.automation.maximize.amount += bulkBuyMax
    if (bulkBuyMax > 0) game.ordinalPoints -= 100*(2**(game.automation.maximize.amount-1))
    for (const i in [1,2,3,4,5,6,7,8,9]) if(bulkBuyMax > i+1) game.ordinalPoints -= 100*(2**(game.automation.maximize.amount-(i+2)))
    buySuccessorAuto()
    buyMaximizeAuto()

    for (let i in new Array(7).fill(0)) {
      i = Number(i)
      // console.log(i)
      // console.log(factorCost(i))
      while ((game.ordinalPoints >= factorCost(i)||game.opIsPsi) && factorCost(i) != Infinity) buyFactor(i)
    }
  } else game.automation.psiAutoclicker = game.ordinalPoints
} 
// ok so maybe do psi now because idk how?
function displayAutoclickerThing(stuff) {
  return displayOp(game.automation.psiAutoclicker || stuff, game.automation.psiAutoclicker)
}

function displayAutoclickerProduction(name) {
  if (!game.automation.psiAutoclicker) return formatNumber(game.automation[name].amount*factorMult())
  return displayOp(game.automation.psiAutoclicker, true)
}
// FACTORS & FACTOR SHIFTS
function buyFactor(n) { 
  if(game.ordinalPoints >= factorCost(n)) {
    game.ordinalPoints -= factorCost(n)
    game.factors[n]++
  } else if (game.opIsPsi && isFinite(factorCost(n))) game.factors[n]++
} 
function factorCost(n) {
  return (10**(n+1))**(2**game.factors[n])
}
function factorMult() {
  let multiplier = 1
  for(const i in game.factors)  multiplier *= factorEffect(i)
  return multiplier
} // fucking use factorEffect it's there for a reason

function factorEffect(i) {
  return (game.factors[i] + 1) * (Math.max(1 + (game.factorShifts - i - 1)/10, 1)**[1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][game.factorShifts])
}

function factorUnlocked(n) {
  return game.factorShifts > n
}

function factorShift() {
  if(game.factorShifts == 7 && game.opIsPsi && !game.unlocks.boosters && game.ordinalPoints >= factorShiftCosts[7]) {
    factorBoost()
    return
  }
  else if (game.ordinalPoints >= factorShiftCosts[game.factorShifts] && (game.factorShifts < 7 || game.opIsPsi)) {
    game.ordinal = 0;
    game.base -= 1;
    game.over = 0;
    game.ordinalPoints = 0;
    for (let i in Object.keys(game.factors)) {
      game.factors[i] = 0;
    }
    game.factorShifts += 1;
    game.automation.maximize.amount = 0;
    game.automation.maximize.loop = 0;
    game.automation.successor.amount = 0;
    game.automation.successor.loop = 0;
  }
}
function factorShiftText() {
  return [
    "200", "800", "3000", "50000", "2e11", "3e20", "1e100", (game.unlocks.boosters) ? "Infinity" : "Graham's Number (g<sub>&psi;(&Omega;<sup>&Omega;</sup>&omega;)</sub>)"
  ][game.factorShifts]
}