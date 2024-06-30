import { useState } from "react";
import React from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserCadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [errors, setErrors] = useState<{ field: string | null, message: string }[]>([]);
  const navigate = useNavigate();

  function cadastrarUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      nome: nome,
      email: email,
      telefone: telefone,
      idade: parseInt(idade),
    };

    axios
      .post("http://localhost:5154/users/cadastrar", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/users/listar", {
          state: { message: "Usuário cadastrado com sucesso" },
        });
      })
      .catch((error) => {
        console.log(error.response.data.Errors); // Adicionado para depuração
        console.log(error.response); // Adicionado para depuração
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors([{ field: "", message: "Erro ao cadastrar usuário" }]);
        }
      });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastrar Usuário
        </Typography>
        {errors.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {errors.map((error, index) => (
              <Typography key={index} variant="body1" color="error">
                {error.field ? `${error.field}: ${error.message}` : error.message}
              </Typography>
            ))}
          </Box>
        )}
        <form onSubmit={cadastrarUser}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            value={nome}
            placeholder="Digite seu nome"
            onChange={(e) => setNome(e.target.value)}
            required
            error={errors.some((e) => e.field === "Nome")}
            helperText={errors.find((e) => e.field === "Nome")?.message}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            error={errors.some((e) => e.field === "Email")}
            helperText={errors.find((e) => e.field === "Email")?.message}
          />
          <TextField
            fullWidth
            label="Telefone"
            variant="outlined"
            margin="normal"
            value={telefone}
            placeholder="(XXX) XXXXX-XXXX"
            onChange={(e) => setTelefone(e.target.value)}
            required
            type="tel"
            error={errors.some((e) => e.field === "Telefone")}
            helperText={errors.find((e) => e.field === "Telefone")?.message}
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
            error={errors.some((e) => e.field === "Idade")}
            helperText={errors.find((e) => e.field === "Idade")?.message}
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
