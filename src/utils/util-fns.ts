export const round = (val: number, dec: number): number => {
  const factor = Math.pow(10, dec);
  return Math.round(val * factor) / factor;
};
