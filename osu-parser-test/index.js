var parser = require("osu-parser");
var fs = require("fs");

function mapToApp(osuFileData) {
  let beatmap = parser.parseContent(osuFileData);

  // * pas le meilleur algo mais plus simple à lire
  let combos = [];
  let currentCombo = [];

  beatmap.hitObjects.forEach((hitObject) => {
    let {
      objectName,
      newCombo,
      position: [x, y],
    } = hitObject;
    if (newCombo) {
      combos.push([...currentCombo]);
      currentCombo = [];
    }

    let object = {
      x,
      y,
      type: objectName,
    };

    currentCombo.push(object);
  });

  // * ne pas oublié le dernier combo qui à été push
  combos.push([...currentCombo]);
  return combos;
}

let map = fs.readFileSync("./map.osu");
console.log(mapToApp(map));
