function displayOrd(ord,over,base,trim) {
  if(ord < base) return ord+over
  let magnitude = Math.floor(Math.log(ord)/Math.log(base))
  let magnitudeAmount = base**magnitude
  let amount = Math.floor(ord/magnitudeAmount)
  let finalOutput = "ω"
  if(magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
  if(amount > 1) finalOutput += amount
  let firstAmount = amount*magnitudeAmount
  if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base)
  return finalOutput 
}
function ordinalDisplay() {
  return (
    `H<sub>${displayOrd(game.ordinal, game.over, game.base)}</sub> (${game.base})`
  )
}
function succ() {
  if((game.ordinal + 1) % game.base == 0) game.over++
  else game.ordinal++
}
function maximize() {
  if(((game.ordinal + 1) % game.base == 0) && game.over > 0) {
    game.over = 0
    game.ordinal++
  }
}
