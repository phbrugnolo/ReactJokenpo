import { useState } from "react";
import axios from "axios";

function BattleCadastrar() {
  const [userId, setUserId] = useState("");
  const [torneioId, setTorneioId] = useState("");
  const [jogadas, setJogadas] = useState("");

  function cadastrarBatalha(e: any) {
    e.preventDefault();
    const battle = {
      userId: userId,
      torneioId: torneioId,
      jogadas: jogadas,
    };

    axios
      .post("http://localhost:5154/batalhar", battle, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.error("Erro ao realizar batalha", error);
      });
  }

  return (
    <div>
      <h1>Criar Batalha</h1>
      <form onSubmit={cadastrarBatalha}>
        <div>
          <label>Id do Usuário:</label>
          <input
            type="text"
            placeholder="Digite o id do usuário"
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Id do Torneio:</label>
          <input
            type="text"
            placeholder="Digite o id do torneio"
            onChange={(e) => setTorneioId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Jogadas:</label>
          <input
            type="text"
            placeholder="Digite as jogadas"
            onChange={(e) => setJogadas(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default BattleCadastrar;
