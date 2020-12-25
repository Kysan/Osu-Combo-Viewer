import parser from "osu-parser";

// je veux que ça me retourne une liste à 2 dimensions
// [[..combo1], [...combo2], [combo3], ...]
// ou un combo = [{x: ?, y: ?}, {x: ?, y: ?}]
function MapToApp(osuFileData) {
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
  return combos.filter((combo) => combo.length !== 0);
}
export default MapToApp;
