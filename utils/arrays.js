export const compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  const neww = (object) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );

  array1 = new Set(array1.map(neww));

  return array2.every((object) => array1.has(neww(object)));
};

// Filter Product details -> get value of "Style"
export const filterArray = (array, property) => {
  return array
    .filter((item) => item.name == property)
    .map((s) => {
      return s.value;
    });
};

// remove duplicate
export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

// Shuffle array
export const randomize = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};
