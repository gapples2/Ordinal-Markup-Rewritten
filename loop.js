function loop() {
  tick(Math.max(0,Date.now() - game.lastTick))
  game.lastTick = Date.now() 
}

function tick(diff) {
  // your tick things here (make sure to multiply by diff/1000)
}