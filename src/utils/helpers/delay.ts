export const delay = (baseTime: number, withRandom: boolean) => {
  const randomTime = withRandom ? Math.random() * 500 : 0;
  return new Promise(resolve => setTimeout(resolve, baseTime + randomTime));
};
