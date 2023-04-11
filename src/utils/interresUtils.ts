export const payments = (time: number, amount: number, interest: number) => {
  const pagos = Array(time).fill(0);

  for (let i = 0; i < pagos.length; i++) {
    pagos[i] = (amount * interest) / time;
  }

  return pagos;
};

export const profits = (amount: number, interest: number) =>
  amount * interest - amount;
