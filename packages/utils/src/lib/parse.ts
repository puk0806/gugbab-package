export const pxToRem = (px: `${number}px`, baseFont = 16) => {
  const [_px] = px.split('px');
  return `${Number(_px) / baseFont}rem`;
};
