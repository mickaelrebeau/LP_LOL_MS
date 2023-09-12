export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10000);

  const formattedNumber = randomNumber.toString().padEnd(4, '0');
  //   console.log(randomNumber);
  //   console.log(formattedNumber);
  return formattedNumber;
};
