const themeData = [
  {
    textColor: "#000000",
    bgColor: "#ffffff",
  },
  {
    textColor: "#ffffff",
    bgColor: "#000000",
  },
]
// THEME IDS: 0 = light, 1 = dark, 2 = custom

function updateTheme() {
	const vars = game.themeId == 2 ? {textColor: game.customTheme.textColor, bgColor: game.customTheme.bgColor} : themeData[game.themeId]
	const root = document.documentElement
	for (const i in vars) root.style.setProperty(`--${i}`, vars[i])
}

function toggleTheme() {
	game.themeId = (game.themeId + 1) % 3
	updateTheme()
}

var theme = { toggleTheme, updateTheme }
