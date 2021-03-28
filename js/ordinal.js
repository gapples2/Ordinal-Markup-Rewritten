function displayOrd(ord,over,base,trim) {
  if(ord < base) return ord+over
  const magnitude = Math.floor(Math.log(ord)/Math.log(base))
  const magnitudeAmount = base**magnitude
  const amount = Math.floor(ord/magnitudeAmount)
  let finalOutput = "&omega;"
  if (magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
  if (amount > 1) finalOutput += amount
  const firstAmount = amount*magnitudeAmount
  if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base)
  return finalOutput 
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
