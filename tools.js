// saving and other tools

function isEncodedExpantaNum(thing) {
  return thing.hasOwnProperty("sign") && thing.hasOwnProperty("array") && thing.hasOwnProperty("layer")
}

function expantaIze(thing) {
  let expanta = D(0)
  expanta.layer= thing.layer
  expanta.sign = thing.sign
  expanta.array = thing.array
  return expanta
}

function decodeObject(thing) {
  let clone = {...thing}
  for(let i in clone) {
    if(isEncodedExpantaNum(thing[i])) clone[i] = expantaIze(thing[i])
    else if(typeof thing[i]=="object" && thing[i].constructor.name != "Array") clone[i] = decodeObject(thing[i])
  }
  return clone
}

function save() {
  localStorage.gamesave = JSON.stringify(game)
}

async function load() {
  if(localStorage.gamesave) game = await mergeDeep(game,decodeObject(JSON.parse(localStorage.gamesave)))
} 

window.onload = async () => {
  await load()
  //setInterval(loop,20) // 50 ticks per second, 20ms delay
  setInterval(save,10000) // 0.1 tick per second, 10000ms/10s delay
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
// woah thankeres\
// u made a lot of this for one of my games!
// will need a bit of refining for vue2 but should work
// pog
// :)
// lemme get expanta
// actually
// we can just do JSON.stringify for saving
// yeah ik but idk what to json.stringify yet
