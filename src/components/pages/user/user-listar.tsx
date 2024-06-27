import { User } from "../../../models/User";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";	
import axios from "axios";
import { formatarData } from "../../../util/formata";

function UserListar() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    carregarUsers();
  }, []);

  function carregarUsers() {
    axios.get<User[]>("http://localhost:5154/users/listar").then((resposta) => {
      setUsers(resposta.data);
    }).catch((erro) => {
      console.log("Erro: " + erro);
    });
  }

  function remover(userId : any) {
    axios
      .delete<User[]>(`http://localhost:5154/users/remover/${userId}`)
      .then((resposta) => {
        setUsers(resposta.data);
      });
  }

  return (
    <div>
      <h1>Lista de users</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Idade</th>
            <th>Vitorias</th>
            <th>Derrotas</th>
            <th>Empates</th>
            <th>Criado Em</th>
            <th>Remover</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.telefone}</td>
              <td>{user.idade}</td>
              <td>{user.vitoria}</td>
              <td>{user.derrota}</td>
              <td>{user.empate}</td>
              <td>{formatarData(user.criadoEm)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    remover(user.userId!);
                  }}
                >
                  Remover
                </button>
              </td>
              <td>
                <button type="button"><Link to={`/users/edit/${user.userId!}`}>Editar</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserListar;
