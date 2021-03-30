// BOOSTERS
function factorBoost() {
  if(game.ordinalPoints > factorBoostRequirement(game.factorBoosts+1) && game.opIsPsi) {
    game.factorBoosts++
    game.boosters += game.factorBoosts+1
    game.ordinalPoints = 0
    game.isPsi = false
    game.opIsPsi = false
    game.base = 10
    game.factorShifts = 0
    game.automation.successor.amount = 0
    game.automation.maximize.amount = 0    
    game.automation.psiAutoclicker = false
    game.factors = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    }
    game.ordinal = 0
    game.unlocks.boosters = true
  }
}
function factorBoostRequirement(n) {
  if(n > 25) return factorBoostRequirement(25)
  let gamma0 = 36*3
  let reqs = [gamma0+1]
  let reqsButImLazy = [1,2,4,5,6,9,10,11,13,14,15,17,18,19,22,23,24,26,27,28,30,31,32,37]
  reqs = reqs.concat(reqsButImLazy.map(a => gamma0*(3**a)))
  return reqs[n-1]
}
