document.addEventListener("keydown", function(event) {
  Object.keys(hotkeyPresets[game.preset]).forEach(i => {
    if (event.key == hotkeyPresets[game.preset][i]) {
      if (i == "markup") markup();
      if (i == "maxall") maxAllAutobuyers();
      if (i == "factorShift") factorShift();
      if (i == "successor") succ();
      if (i == "maximize") maximize()
    }
  })
})

function addPreset(name = false) {
  if (Object.keys(hotkeyPresets).length > 3) {
    window.confirm("Please delete a preset to add another one")
    return
  }
  if (!name) name = window.prompt("Please enter a name for your new preset");
  hotkeyPresets[name] = {
    markup: "k",
    maxall: "m",
    factorShift: "s",
    successor: "",
    maximize: ""
  }
}

function removePreset(name) {
  delete hotkeyPresets[name]
  game.preset = 'main'
}