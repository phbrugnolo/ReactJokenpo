import { useEffect, useState } from "react";
import axios from "axios";
import { Torneio } from "../../../models/Torneio";
import { User } from "../../../models/User";
import { TextField, MenuItem, Button, Container, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Snackbar } from "@mui/material";
import { formatarJogadaIcon } from "../../../util/formata";  // Adjust the path accordingly
import { useNavigate } from "react-router-dom";

function BattleCadastrar() {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [torneioId, setTorneioId] = useState("");
  const [torneios, setTorneios] = useState<Torneio[]>([]);
  const [jogada, setJogada] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsers();
    carregarTorneios();
  }, []);

  function carregarUsers() {
    axios.get<User[]>("http://localhost:5154/users/listar").then((response) => {
      setUsers(response.data);
    });
  }

  function carregarTorneios() {
    axios.get<Torneio[]>("http://localhost:5154/tournament/listar").then((response) => {
      setTorneios(response.data);
    });
  }

  function cadastrarBatalha(e: any) {
    e.preventDefault();
    const battle = {
      userId: userId,
      torneioId: torneioId,
      jogada: jogada,
    };

    axios
      .post("http://localhost:5154/batalhar", battle, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/batalhas/listar", {
          state: { message: "Batalha concluída com sucesso\n Resultado: " + response.data.resultado},
        });
      })
      .catch((error) => {
        console.error("Erro ao realizar batalha", error);
      });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Criar Batalha
        </Typography>
        <form onSubmit={cadastrarBatalha}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              select
              label="Usuários"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              variant="outlined"
            >
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.nome}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              select
              label="Torneios"
              value={torneioId}
              onChange={(e) => setTorneioId(e.target.value)}
              variant="outlined"
            >
              {torneios.map((torneio) => (
                <MenuItem key={torneio.torneioId} value={torneio.torneioId}>
                  {torneio.nome}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Jogada</FormLabel>
              <RadioGroup
                row
                value={jogada}
                onChange={(e) => setJogada(e.target.value)}
              >
                <FormControlLabel value="pedra" control={<Radio />} label={`Pedra ${formatarJogadaIcon("pedra")}`} />
                <FormControlLabel value="papel" control={<Radio />} label={`Papel ${formatarJogadaIcon("papel")}`} />
                <FormControlLabel value="tesoura" control={<Radio />} label={`Tesoura ${formatarJogadaIcon("tesoura")}`} />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default BattleCadastrar;
