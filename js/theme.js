const themeData = [
  {
    textColor: "#000000",
    bgColor: "#ffffff",
    markupTextColor: "#ffffff",
    markupBgColor: "#000000",
    markupBorderColor: "#B67F33",
    tabButtonTextColor: "#000000",
    tabButtonBgColor: "#ffffff",
    tabButtonBorderColor: "#000000",
    tabButtonHover: "#dfdfdf",
    buttonTextColor: "#000000",
    buttonBgColor: "#ffffff",
    buttonBorderColor: "#000000",
    buttonHoverColor: "#EFEFEF",
    boosterTextColor: "#3838ff",
    boosterBgColor: "#000000",
    boosterBorderColor: "#3838ff",
  },
  {
    textColor: "#ffffff",
    bgColor: "#000000",
    markupTextColor: "#ffffff",
    markupBgColor: "#000000",
    markupBorderColor: "#B67F33",
    tabButtonTextColor: "#000000",
    tabButtonBgColor: "#ffffff",
    tabButtonBorderColor: "#000000",
    tabButtonHover: "#dfdfdf",
    buttonTextColor: "#000000",
    buttonBgColor: "#ffffff",
    buttonBorderColor: "#000000",
    buttonHoverColor: "#EFEFEF",
    boosterTextColor: "#3838ff",
    boosterBgColor: "#000000",
    boosterBorderColor: "#3838ff",
  },
]
// THEME IDS: 0 = light, 1 = dark, 2 = custom

function updateTheme() {
	const vars = game.themeId == 2 ? game.customTheme : themeData[game.themeId];
	const root = document.documentElement
	for (const i in vars) root.style.setProperty(`--${i}`, vars[i])
}

function toggleTheme() {
	game.themeId = (game.themeId + 1) % 3
	updateTheme()
}

function exportTheme() {
  navigator.clipboard.writeText(JSON.stringify(game.customTheme))
}

function importTheme() {
  const x = window.prompt("Please enter your save in the text box below.");
  if (x === "") {
    if (window.confirm('Are you sure you want to reset your theme?')) {
      game.customTheme = {};
      save()
      location.reload()
    }; 
    return
  };
  game.customTheme = mergeDeep(game.customTheme,decodeObject(JSON.parse(x)))
  updateTheme()
}

const theme = { toggleTheme, updateTheme }
