export function trimArr(arr) {
  if (arr.length > 10) {
    const res = arr.slice(0, 10);
    return res;
  } else {
    return arr;
  }
}
