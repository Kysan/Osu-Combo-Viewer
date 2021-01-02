vectorBetween2Points = (A, B) => {
  let Z = { x: B.x - A.x, y: B.y - A.y };
  console.log("Vecteur entre les des points: ", Z);
  return Z;
};

angleBetween2Points = (A, B) => {
  let V = vectorBetween2Points(A, B);
  let result = degFromRad(Math.atan2(V.y, V.x));
  return result;
};
// console.log(angleBetween2Points({ x: 0, y: 0 }, { x: 0, y: 1 }));    // 90
// console.log(angleBetween2Points({ x: 0, y: 0 }, { x: 0, y: -1 }));   // - 90
// console.log(angleBetween2Points({ x: 0, y: 0 }, { x: 1, y: 0 }));    // 0
// console.log(angleBetween2Points({ x: 0, y: 0 }, { x: -1, y: 0 }));   // 180

addDegreeToAngle = (degree1, degree2) => {
  let degree = (degree1 + degree2) % 360;

  return degree;
};

radFromDeg = (deg) => {
  let rad = (deg / Math.PI) * 180;
  return rad;
};

degFromRad = (rad) => {
  let deg = (rad * 180) / Math.PI;
  return deg;
};

angleToVector = (degree) => {
  let rad = radFromDeg(degree);
  return { x: Math.cos(rad), y: Math.sin(rad) };
};

vectorTranslation = (V1, V2) => {
  return { x: V1.x + V2.x, y: V1.y + V2.y };
};

scaleVector = (v, scale) => {
  return { x: v.x * scale, y: v.y * scale };
};

rectangleFromTwoCircle = (C1, C2) => {
  let mesureAngle = angleBetween2Points(C1.pos, C2.pos);
  console.log("angle entre C1 et C2", mesureAngle);

  let angle1 = addDegreeToAngle(mesureAngle, 90);
  console.log("angle coté haut", angle1);
  let angle2 = addDegreeToAngle(mesureAngle, -90);
  console.log("angle coté bas", angle2);

  // * vers la gauche
  let V1 = angleToVector(angle1);
  console.log("V1:", V1);
  V1 = scaleVector(V1, C1.radius);
  console.log("V1 scaled:", V1);
  let P1 = vectorTranslation(C1.pos, V1);
  console.log("V1 + P1 = ", P1);
  return [P1];
};

let c1 = { pos: { x: 0, y: 0 }, radius: 2 };
let c2 = { pos: { x: 2, y: 0 }, radius: 2 };
console.log(rectangleFromTwoCircle(c1, c2));
