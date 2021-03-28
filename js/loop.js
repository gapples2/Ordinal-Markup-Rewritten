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
  game.automation.maximize.loop += diff*game.automation.maximize.amount
  succ(Math.floor(game.automation.successor.loop/1000))
  game.automation.successor.loop -= Math.floor(game.automation.successor.loop/1000)*1000
  maximize(Math.floor(game.automation.maximize.loop/1000))
  game.automation.maximize.loop -= Math.floor(game.automation.maximize.loop/1000)*1000
} 