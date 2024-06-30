import React from "react"
import InputMask from "react-input-mask";

export const formatarData = (data: string | undefined): string => {
  if (!data) return "";
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString("pt-BR");
};

export const formatarGuid = (guid: string | undefined): string => {
  if (!guid) return "";
  return guid.slice(-12);
};

export function formatarJogadaIcon(jogada: string) {
  switch (jogada) {
    case 'pedra':
      return '🪨';
    case 'papel':
      return '📄';
    case 'tesoura':
      return '✂️';
    default:
      return jogada;
  }
}


// function PhoneInput(props) {
//   return <InputMask mask="(XX) XXXXX-XXXX" maskPlaceholder="(XX) XXXXX-XXXX" onChange={props.onChange} value={props.value} />;
// }
