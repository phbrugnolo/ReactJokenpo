import { useState, useEffect } from "react";
import { User } from "../../../models/User";
import axios from "axios";

function UserListar() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    carregarUsers();
  }, []);

  function carregarUsers() {
    axios.get<User[]>("http://localhost:5154/users/listar").then((resposta) => {
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
            <th>Criado Em</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.telefone}</td>
              <td>{user.idade}</td>
              <td>{user.criadoEm}</td>
              {/* <td>
                      <button type="button" onClick={() => { remover(user.id!) }}>Remover</button>
                    </td>
                    <td>
                      <button type="button"><Link to={/user/editar/${user.id!}}>Alterar</Link></button>
                    </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserListar;
