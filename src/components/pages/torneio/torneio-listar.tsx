import { Torneio } from "../../../models/Torneio";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";	
import axios from "axios";

function TorneioListar() {
  const [torneio, setTorneios] = useState<Torneio[]>([]);

  useEffect(() => {
    carregarTorneios();
  }, []);

  function carregarTorneios() {
    axios.get<Torneio[]>("http://localhost:5154/tournament/listar").then((resposta) => {
      setTorneios(resposta.data);
    }).catch((erro) => {
      console.log("Erro: " + erro);
    });
  }

  function remover(torneioId : any) {
    axios
      .delete<Torneio[]>(`http://localhost:5154/tournament/remover/${torneioId}`)
      .then((resposta) => {
        setTorneios(resposta.data);
      });
  }

  return (
    <div>
      <h1>Lista de torneio</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descricao</th>
            <th>Premiacao</th>
            <th>Criado Em</th>
            <th>Remover</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {torneio.map((torneio) => (
            <tr key={torneio.torneioId}>
              <td>{torneio.torneioId}</td>
              <td>{torneio.nome}</td>
              <td>{torneio.descricao}</td>
              <td>{torneio.premiacao}</td>
              <td>{torneio.criadoEm}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    remover(torneio.torneioId!);
                  }}
                >
                  Remover
                </button>
              </td>
              <td>
                <button type="button"><Link to={`/torneio/edit/${torneio.torneioId!}`}>Editar</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TorneioListar;
