const fs = require("fs")
const util = require("node:util")


function main() {
  const r = {
    name: "amigurumi",
    steps: []
  }
  recipe.steps.forEach((s, i) => {
    if (!r.steps[i]) {
      r.steps[i] = { id: i + 1, completed: false, subSteps: [] }
    }

    let id = 0
    const instructions = recipe.steps[i].split(" ")
    instructions.forEach((instruction, j) => {
      let si = instruction.split("-")
      let times = si[0]
      let description = si[1]
      if (typeof description == "string") {
        description.replace(".", " ")
      }

      for (let h = 0; h < times; h++) {
        id++
        r.steps[i].subSteps.push({ id, completed: false, description })
      }
    })

  })

  fs.writeFileSync("recipe.js", "const recipe = " + JSON.stringify(r))
  // console.log(util.inspect(r, { showHidden: false, depth: null, colors: true }))
}

var recipe = {
  name: "amigurumi",
  steps: [
    "1-anelmagico 6-pb",
    "6-aum",
    "1-pb 1-aum",
    "2-pb 1-aum",
    "3-pb 1-aum",
    "4-pb 1-aum",
    "5-pb 1-aum",
    "6-pb 1-aum",
    "7-pb 1-aum",
    "8-pb 1-aum",
    "9-pb 1aum",
    "10-pb 1-aum",
    "11-pb 1-aum",
    "12-pb 1-aum",
    "84-pb",
    "84-pb",
    "84-pb",
    "84-pb",
    "84-pb",
    "84-pb",
    "1-pb 1-dim 1-pb 1-dim 1-pb 1-dim 33-pb",
    "3-dim 33-pb",
    "72-pb",
    "72-pb",
    "72-pb",
    "72-pb",
    "72-pb",
    "72-pb",
    "72-pb",
    "10-pb 1-dim",
    "9-pb 1-dim",
    "8-pb 1-dim",
    "7-pb 1-dim",
    "6-pb 1-dim",
    "5-pb 1-dim",
    "4-pb 1-dim",
    "3-pb 1-dim",
    "2-pb 1-dim",
    "1-encher",
    "1-pb 1-dim",
    "6-dim",
    "1-fechar.anel.magico.invertido",
    "1-bordar.os.olhos.na.carreira.22.deixando.os.centralizados.entre.as.diminuicoes.fitas.nas.carreiras.21.e.22",
    "1-trocar.para.off.white",
    "1-anel.magico 5-pb",
    "5-aum",
    "1-pb 1-aum",
    "1-aum 2-pb",
    "1-arrematar.costurar.entre.as.carreiras.16.e.21.da.cabeca",
    "1-bordar.o.nariz.com.amigurmi.preto",
    "1-trocar.para.pelucia.neo.mint",
    "1-anel.magico 6-pb",
    "6-aum",
    "1-pb 1-aum",
    "18-pb",
    "18-pb",
    "18-pb",
    "1-arrematar.e.costurar.entre.as.carreiras.28.e.35.da.cabeca",
    "1-trocar.para.off.white",
    "1-anel.magico 6-pb",
    "1-corr 1-virar.o.trabalho 1-pb 4-aum 1-pb",
    "1-arrematar.e.costurar.nas.orelhas",
  ]
}


main()