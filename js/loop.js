const start = setInterval(()=>{if(typeof game=="object"&&typeof loop=="function"){setInterval(loop,20);clearInterval(start)}},20)
function loop() {
  tick(Math.max(0,Date.now() - game.lastTick))
  game.lastTick = Date.now() 
}

function tick(diff) {
  if (!hotkeyPresets[game.preset]) game.preset = 'main'
  // TIER 1 AUTOMATION
  if(!game.isPsi) {
  game.automation.successor.loop += diff*game.automation.successor.amount*factorMult()
  game.automation.maximize.loop += diff*game.automation.maximize.amount*factorMult()
  if (Math.floor(game.automation.successor.loop/1000) >= 1) {
    succ(Math.floor(game.automation.successor.loop/1000))
    game.automation.successor.loop -= Math.floor(game.automation.successor.loop/1000)*1000
  }
  if (Math.floor(game.automation.maximize.loop/1000) >= 1) {
    maximize(Math.floor(game.automation.maximize.loop/1000))
    game.automation.maximize.loop -= Math.floor(game.automation.maximize.loop/1000)*1000
  }
  }
  // Psi Switch
  if(!game.isPsi && game.ordinal >= 7625597484987 && game.base == 3) {
    game.isPsi = true
    game.ordinal = 4
  }

  if (game.automation.psiAutoclicker) {
    game.ordinal = game.automation.psiAutoclicker
    game.isPsi = true
  }
} 