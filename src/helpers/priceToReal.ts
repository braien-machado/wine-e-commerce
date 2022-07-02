const priceToReal = (number: number) => number
  .toLocaleString('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
    style: 'currency',
  });

export default priceToReal;
