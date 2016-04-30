function getIndexOfFirstElementThatSatisfies(array, criteria) {
  for (let index = 0; index < array.length; index++) {
    if (criteria(array[index])) {
      return index;
    }
  }
  return -1;
}

function insertElementIntoArrayAtIndex(element, array, index) {
  array.splice(index, 0, element);
}

export {
  getIndexOfFirstElementThatSatisfies,
  insertElementIntoArrayAtIndex,
};
