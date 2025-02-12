const divideNumberIntoArrays = (number) => {
  const result = [];
  const sections = {};
  let sectionNum = 1;

  for (let i = 0; i < number; i += 5) {
    // to add arrays to an object
    sections[`section ${[sectionNum]}`] = Array.from(
      { length: Math.min(5, number - i) },
      (_, index) => i + index
    );
    sectionNum += 1;

    // to get an array of arrays use the fun below
    // result.push(
    //   Array.from({ length: Math.min(5, number - i) }, (_, index) => i + index)
    // );
  }

  //   return result;
  return sections;
};

// Example usage:
// const number = 12;
// const dividedArrays = divideNumberIntoArrays(number);
// console.log(dividedArrays);
