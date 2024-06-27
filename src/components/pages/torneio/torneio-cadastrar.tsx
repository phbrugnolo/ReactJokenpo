import { useState } from "react";
import axios from "axios";

function TorneioCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [premiacao, setPremiacao] = useState("");

  function cadastrarTorneio(e: any) {
    e.preventDefault();
    const user = {
      nome: nome,
      descricao: descricao,
      premiacao: premiacao,
    };

    axios
      .post("http://localhost:5154/tournament/cadastrar", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.error("Erro ao cadastrar torneio:", error);
      });
  }

  return (
    <div>
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={cadastrarTorneio}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            placeholder="Digite a descrição"
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Premiação:</label>
          <input
            type="number"
            placeholder="Digite a premiação"
            onChange={(e) => setPremiacao(e.target.value)}
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

export default TorneioCadastrar;
