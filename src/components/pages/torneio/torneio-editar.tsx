import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Snackbar, InputAdornment } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function TorneioEditar() {
  const { torneioId } = useParams<{ torneioId: string }>();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [premiacao, setPremiacao] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

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
  }, [torneioId]);

  function editarTorneio(e: any) {
    e.preventDefault();
    const torneio = {
      nome: nome,
      descricao: descricao,
      premiacao: premiacao,
    };
    axios.put(`http://localhost:5154/tournament/edit/${torneioId}`, torneio)
      .then(() => {
        navigate('/torneios/listar', { state: { message: "Torneio alterado com sucesso" } });
      });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Torneio
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Salvar
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Torneio alterado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default TorneioEditar;
