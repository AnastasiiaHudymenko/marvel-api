export function truncateString(str) {
  if (str.length > 150) {
    return str.substring(0, 150) + '...';
  } else {
    return str;
  }
}
