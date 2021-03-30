function displayOrd(ord,over,base,trim = game.trim, first = false) {
  if(game.isPsi) return displayPsiOrd(ord, trim)
  
  if(trim <= 0) return `...`
  if(ord < base) return ord+over
  const magnitude = Math.floor(Math.log(ord)/Math.log(base))
  const magnitudeAmount = base**magnitude
  const amount = Math.floor(ord/magnitudeAmount)
  let finalOutput = "&omega;"
  if (magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
  if (amount > 1) finalOutput += amount
  const firstAmount = amount*magnitudeAmount
  if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base, trim - 1)
  return finalOutput
}

function displayPsiOrd(ord, trim = game.trim) {
  if(ord == 0) return ""
  if(trim <= 0) return "..."
  if(ord < 4) return extraOrdMarks[ord]
  const main = Math.floor(ord/4)
  const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
  const magnitudeAmount = 4*3**magnitude
  const finalOutput = ordMarks[magnitude]
    .replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    .replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
  return `${finalOutput}`
}

function calculateHardy(ord = game.ordinal, over = game.over, base = game.base) {
  if (ord >= base**3) return Infinity
  let f2 = Math.floor(ord/base**2)
  const f1 = Math.floor((ord-(f2*base**2))/base)
  const f0 = Math.floor((ord-(f2*base**2)-(f1*base)))+over
  let value = base+f0
  value *= 2**f1
  while(f2 > 0) {
    value = (2**value)*value
    f2--
  }
  return value
}

function beautify(x){
  if(typeof x=="number"){
    if(x>=1&&x<10) return x.toFixed(3)
    var exponent = Math.floor(Math.log10(x))
    return (x/10**exponent).toFixed(3)+"e"+exponent
  }
  else{
    x = D(x)
  }
  return ""
}

function ordinalDisplay() {
  return (
    `H<sub>${displayOrd(game.ordinal, game.over, game.base)}</sub>`
  )
}

function succ(amount = 1) {
  if(game.isPsi) return
  while (game.over == 0 && amount > 0) {
    if((game.ordinal + 1) % game.base == 0) game.over++
    else game.ordinal++
    amount -= 1
  }
  game.over += amount
}

function maximize(amount = 1) {
  if(game.isPsi) return
  if(((game.ordinal + 1) % game.base == 0) && game.over > 0) {
    game.ordinal += Math.max(Math.min(Math.floor(game.over/game.base), amount), 1)
    game.over = 0
  }
}
