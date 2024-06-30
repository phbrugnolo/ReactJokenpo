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


export const formataSaldo = (vitorias: number, derrotas: number): string => {
  const saldo = vitorias - derrotas;
  if (saldo === 1) {
    return `Seu saldo é de ${saldo} vitória.`;
  } else if (saldo === -1) {
    return `Seu saldo é de ${Math.abs(saldo)} derrota.`;
  } else if (saldo > 0) {
    return `Seu saldo é de ${saldo} vitórias.`;
  } else if (saldo < 0) {
    return `Seu saldo esta negativo em ${Math.abs(saldo)} derrotas.`;
  } else {
    return "Seu saldo está equilibrado.";
  }
};
