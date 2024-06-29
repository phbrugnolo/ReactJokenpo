import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

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
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Usuário
        </Typography>
        <form onSubmit={editarTorneio}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            margin="normal"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <TextField
            label="Premiação"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={premiacao}
            onChange={(e) => setPremiacao(e.target.value)}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Salvar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
export default TorneioEditar;
