import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TorneioEditar() {
  const { torneioId } = useParams<{ torneioId: string }>();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [premiacao, setPremiacao] = useState("");

  useEffect(() => {
    if (torneioId) {
      axios
        .get(`http://localhost:5154/tournament/buscar/${torneioId}`)
        .then((response) => {
          const torneio = response.data;
          setNome(torneio.nome);
          setDescricao(torneio.descricao);
          setPremiacao(torneio.premiacao.toString());
        });
    }
  }, []);

  function editarTorneio(e: any) {
    e.preventDefault();
    const torneio = {
      nome: nome,
      descricao: descricao,
      premiacao: premiacao,
    };
    axios.put(`http://localhost:5154/tournament/edit/${torneioId}`, torneio);
  }

  return (
    <div>
      <h1>Editar Usuário</h1>

      <form onSubmit={editarTorneio}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descricao:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Premiacao:</label>
          <input
            type="number"
            value={premiacao}
            onChange={(e) => setPremiacao(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}
export default TorneioEditar;
