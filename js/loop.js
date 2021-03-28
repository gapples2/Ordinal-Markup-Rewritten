window.onload = () => {
   // 50 ticks per second, 20ms delay
}
function loop() {
  tick(Math.max(0,Date.now() - game.lastTick))
  game.lastTick = Date.now() 
}

function tick(diff) {
  // TIER 1 AUTOMATION
  game.automation.successor.loop += diff*game.automation.successor.amount
  if(game.automation.successor.loop > 1000/game.automation.successor.amount) {
    succ()
    game.automation.successor.loop -= 1000/game.automation.successor.amount
  }
  game.automation.maximize.loop += diff*game.automation.maximize.amount
  if(game.automation.maximize.loop > 1000/game.automation.maximize.amount) {
    maximize()
    game.automation.maximize.loop -= 1000/game.automation.maximize.amount
  }
  let buyableSuccessors = Math.floor(game.automation.successor.loop/(1000/game.automation.successor.amount))
  let buyableMaximizes = Math.floor(game.automation.maximize.loop/(1000/game.automation.maximize.amount))
  if(game.automation.successor.loop > (1000/game.automation.successor.amount)) {
    if(game.automation.maximize.loop > (1000/game.automation.maximize.amount)) { 
      game.over = 0
      game.ordinal += Math.min(buyableSuccessors, game.base*buyableMaximizes)
    } else {
      if(buyableSuccessors >= game.base - (game.ordinal % game.base)) {
        game.ordinal += game.base-(game.ordinal % game.base)-1
        game.over = buyableSuccessors - (game.base - (game.ordinal % game.base) - 1)
      } else {
        game.ordinal += buyableSuccessors
      } 
    }
  }
  game.automation.successor.loop %= (1000/game.automation.successor.amount)
  game.automation.maximize.loop %= (1000/game.automation.maximize.amount)
} // ok it works, but for some reason maximize autos now also do succ auto job
// we need to find out why
// oh right i missed the other part
// WORKS