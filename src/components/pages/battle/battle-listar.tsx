import { Battle } from "../../../models/Battle";
import { useState, useEffect } from "react";
import { formatarData, formatarGuid } from "../../../util/formata";
import axios from "axios";

function BattleListar() {
  const [batalhas, setBatalhas] = useState<Battle[]>([]);

  useEffect(() => {
    carregarBatalhas();
  }, []);

  function carregarBatalhas() {
    axios
      .get<Battle[]>("http://localhost:5154/batalhas/listar")
      .then((resposta) => {
        setBatalhas(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
      });
  }

  return (
    <div>
      <h1>Lista de batalhas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Torneio</th>
            <th>Jogada</th>
            <th>Maquina</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {batalhas.map((batalha) => (
            <tr key={batalha.battleId}>
              <td data-tip={batalha.battleId}>{formatarGuid(batalha.battleId)}</td>
              <td data-tip={batalha.user?.nome}>{batalha.user?.nome}</td>
              <td data-tip={batalha.torneio?.nome}>{batalha.torneio?.nome}</td>
              <td>{batalha.jogada}</td>
              <td>{batalha.jogadaMaquina}</td>
              <td>{formatarData(batalha.criadoEm)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BattleListar;