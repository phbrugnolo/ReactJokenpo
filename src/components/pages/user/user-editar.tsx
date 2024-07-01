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
  const [errors, setErrors] = useState<{ field: string | null, message: string }[]>([]);

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

  function editarUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      nome: nome,
      email: email,
      telefone: telefone,
      idade: parseInt(idade),
    };
    axios.put(`http://localhost:5154/users/edit/${userId}`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate('/users/listar', { state: { message: "Usuário alterado com sucesso" } });
    }).catch((error) => {
      console.log(error.response.data.Errors); // Adicionado para depuração
      console.log(error.response); // Adicionado para depuração
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ field: "", message: "Erro ao editar usuário" }]);
      }
    });
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Usuário
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
        <form onSubmit={editarUser}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            margin="normal"
            value={nome}
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
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
            type="number"
            error={errors.some((e) => e.field === "Idade")}
            helperText={errors.find((e) => e.field === "Idade")?.message}
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
