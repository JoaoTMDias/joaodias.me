export const remCalc = ({ fontSize = 16, baseFontValue = 16 }) => ({
  fontSize: `${(fontSize / baseFontValue) * 1}rem`,
});


export const responsiveTypography = ({
  minFont, maxFont, minScreen, maxScreen, units,
}) => {
  if (!minScreen) minScreen = 100;
  if (!maxScreen) maxScreen = 1440;
  if (!units) units = 'px';
  return {
    fontSize: `calc(${minFont}${units} + ${maxFont - minFont} * (100vw - ${minScreen}${units}) / ${maxScreen - minScreen})`,
  };
};
