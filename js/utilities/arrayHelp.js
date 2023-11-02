export function makeCopies(array, n) {
  return Array.from({ length: n }, () => [...array]).flat();
}
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function mapValue(arr1, arr2, searchKey) {
  return arr2[arr1.indexOf(searchKey)];
}
