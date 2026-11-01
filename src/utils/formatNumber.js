const formatNumber = (value) => {
  const number = value.replace(/,/g, "").replace(/\D/g, "");

  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default formatNumber;
