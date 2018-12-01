const responsiveTypography = (params: {
  minFont: number;
  maxFont: number;
  minScreen: number;
  maxScreen: number;
  units: string;
}) => {
  const minScreen = params.minScreen ? params.minScreen : 240;
  const maxScreen = params.smaxScreen ? params.maxScreen : 1440;
  const units = params.units ? `${params.units}` : `px`;
  const result: string = `calc(${params.minFont}${units} + ${params.maxFont -
    params.minFont} * (100vw - ${minScreen}${units}) / ${maxScreen - minScreen})`;

  return result;
};

export { responsiveTypography };
