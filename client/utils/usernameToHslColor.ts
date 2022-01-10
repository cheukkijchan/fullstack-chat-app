export const usernameToHslColor = (
  username: string,
  saturation: number,
  lightness: number
) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return 'hsl(' + h + ', ' + saturation + '%, ' + lightness + '%)';
};
