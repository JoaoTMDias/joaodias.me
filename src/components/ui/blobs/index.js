import { asyncComponent } from '../../index';

const BlobOne = asyncComponent(() => {
  return import(`./blob-1`);
});
const BlobTwo = asyncComponent(() => {
  return import(`./blob-2`);
});
const BlobThree = asyncComponent(() => {
  return import(`./blob-3`);
});
const BlobFour = asyncComponent(() => {
  return import(`./blob-4`);
});

export { BlobOne, BlobTwo, BlobThree, BlobFour };
