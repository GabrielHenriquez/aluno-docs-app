export const formatDateISOToBR = (dataISO: string) => {
  const date = new Date(dataISO);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateToBR = (date: string) => {
  const partes = date.split("-");
  const dataBR = `${partes[2]}/${partes[1]}/${partes[0]}`;
  return dataBR;
};
