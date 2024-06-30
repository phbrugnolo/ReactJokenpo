import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

function UserEditar() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
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
    axios.put(`http://localhost:5154/users/edit/${userId}`, user).then(() => {
      navigate('/users/listar', { state: { message: "Usuário alterado com sucesso" } });
    });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Usuário
        </Typography>
        <form onSubmit={editarUser}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Telefone"
            variant="outlined"
            margin="normal"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Idade"
            variant="outlined"
            margin="normal"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
            type="number"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default UserEditar;
