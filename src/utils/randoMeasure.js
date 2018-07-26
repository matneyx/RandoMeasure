export const randoMeasure = () => {
  let output = [];

  for(let i = 1; i <= 8; i++){
    output.push(Math.random() >= 0.5);
  }

  return output;
};
