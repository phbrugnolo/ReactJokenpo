import { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from "react-router-dom";

function TorneioCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [premiacao, setPremiacao] = useState("");
  const navigate = useNavigate();

  function cadastrarTorneio(e: any) {
    e.preventDefault();
    const user = {
      nome: nome,
      descricao: descricao,
      premiacao: parseFloat(premiacao).toFixed(2),
    };

    axios
      .post("http://localhost:5154/tournament/cadastrar", user, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        navigate("/torneios/listar", {
          state: { message: "Torneio cadastrado com sucesso" },
        });
      })
      .catch((error) => {
        console.error("Erro ao cadastrar torneio:", error);
      });
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Torneio
      </Typography>
      <Box
        component="form"
        onSubmit={cadastrarTorneio}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setDescricao(e.target.value)}
        />
        <TextField
          label="Premiação"
          type="number"
          variant="outlined"
          fullWidth
          required
          value={premiacao}
          onChange={(e) => setPremiacao(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}

export default TorneioCadastrar;
