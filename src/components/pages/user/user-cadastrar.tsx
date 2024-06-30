import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserCadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const navigate = useNavigate();

  function cadastrarUser(e: React.FormEvent<HTMLFormElement>) {
    const user = {
      nome: nome,
      email: email,
      telefone: telefone,
      idade: parseInt(idade),
    };

    axios.post("http://localhost:5154/users/cadastrar", user, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        navigate('/users/listar', { state: { message: "Usuário cadastrado com sucesso" } })
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
      });

    e.preventDefault();
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Usuário
        </Typography>
        <form onSubmit={cadastrarUser}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            placeholder="Digite seu nome"
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Telefone"
            variant="outlined"
            margin="normal"
            placeholder="Digite seu telefone"
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Idade"
            variant="outlined"
            margin="normal"
            placeholder="Digite sua idade"
            onChange={(e) => setIdade(e.target.value)}
            required
            type="number"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default UserCadastrar;
