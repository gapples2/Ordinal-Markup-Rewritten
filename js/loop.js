setTimeout(()=>{setInterval(loop,20)},20)
function loop() {
  tick(Math.max(0,Date.now() - game.lastTick))
  game.lastTick = Date.now() 
}

function tick(diff) {
  // TIER 1 AUTOMATION
  if(game.automation.successor.amount > 20) {
    
  }
  game.automation.successor.loop += diff*game.automation.successor.amount
  game.automation.maximize.loop += diff*game.automation.maximize.amount
  if (Math.floor(game.automation.successor.loop/1000) >= 1) {
    succ(Math.floor(game.automation.successor.loop/1000))
    game.automation.successor.loop -= Math.floor(game.automation.successor.loop/1000)*1000
  }
  if (Math.floor(game.automation.maximize.loop/1000) >= 1) {
    maximize(Math.floor(game.automation.maximize.loop/1000))
    game.automation.maximize.loop -= Math.floor(game.automation.maximize.loop/1000)*1000
  }
  
  
} 