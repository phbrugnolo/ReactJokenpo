export const formatarData = (data: string | undefined): string => {
  if (!data) return "";
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString("pt-BR");
};

export const formatarGuid = (guid: string | undefined): string => {
  if (!guid) return "";
  return guid.slice(-12);
};