import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

function UserCadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");

  function cadastrarUser(e: React.FormEvent<HTMLFormElement>) {
    const user = {
      nome: nome,
      email: email,
      telefone: telefone,
      idade: parseInt(idade),
    };

    axios.post('http://localhost:5154/users/cadastrar', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error);
    });
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Usuário
      </Typography>
      <Box component="form" onSubmit={cadastrarUser} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setTelefone(e.target.value)}
        />
        <TextField
          label="Idade"
          type="number"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setIdade(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}

export default UserCadastrar;
