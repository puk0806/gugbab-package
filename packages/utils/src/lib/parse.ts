export const pxToRem = (px: `${number}px`, baseFont: number = 16) => {
  const [_px] = px.split('px');
  return `${Number(_px) / baseFont}rem`;
};
