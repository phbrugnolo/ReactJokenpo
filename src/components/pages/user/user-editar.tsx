import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Snackbar } from "@mui/material";


function UserEditar() {
  const { userId } = useParams<{ userId: string }>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5154/users/buscar/${userId}`)
        .then((response) => {
          const user = response.data;
          setNome(user.nome);
          setEmail(user.email);
          setTelefone(user.telefone);
          setIdade(user.idade.toString());
        });
    }
  }, [userId]);

  function editarUser(e: any) {
    e.preventDefault();
    const user = {
      nome: nome,
      email: email,
      telefone: telefone,
      idade: parseInt(idade),
    };
    axios.put(`http://localhost:5154/users/edit/${userId}`, user);
  }

  return (
    <div>
      <h1>Editar Usuário</h1>

      <form onSubmit={editarUser}>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
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

export default UserEditar;
