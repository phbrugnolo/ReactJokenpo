import { Battle } from "../../../models/Battle";
import { useState, useEffect } from "react";
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
        console.log(resposta.data);
        setBatalhas([resposta.data[0], resposta.data[1], resposta.data[2]]);
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
            <th>Nome</th>
            <th>UserId</th>
            <th>TorneioId</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {batalhas.map((batalhas) => (
            <tr key={batalhas.battleId}>
              <td>{batalhas.battleId}</td>
              <td>{batalhas.userId}</td>
              <td>{batalhas.torneioId}</td>
              <td>{batalhas.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BattleListar;