export function hp(percentage: number) {
  const deviceHeight = window.innerHeight;
  const value = (percentage * deviceHeight) / 100;
  return Math.round(value);
}