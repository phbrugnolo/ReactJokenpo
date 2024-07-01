import { User } from "../../../models/User";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatarData } from "../../../util/formata";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

function UserListarUm() {
  const { userId } = useParams<{ userId: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [criadoEm, setCriadoEm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarUser();
  }, []);

  function carregarUser() {
    axios
      .get<User>(`http://localhost:5154/users/buscar/${userId}`)
      .then((resposta) => {
        const user = resposta.data;
        setNome(user.nome);
        setEmail(user.email);
        setTelefone(user.telefone);
        setIdade(user.idade.toString());
        setCriadoEm(formatarData(user.criadoEm));
      })
  }

  function remover(userId: any) {
    axios
      .delete(`http://localhost:5154/users/remover/${userId}`)
      .then((resposta) => {
        setUsers(resposta.data);
        navigate('/users/listar', { state: { message: "Usuário removido com sucesso" } });
      });
  }

  return (
    <div>
      <Typography variant="h4" textAlign="center">
        Visualização do {nome}
      </Typography>
      <br />
      <br />
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={6} md={4} key={userId}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Telefone: {telefone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Idade: {idade}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Criado em: {criadoEm}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Ver Batalhas do Usuário">
                <IconButton
                  component={Link}
                  to={`/users/batalhas/${userId}`}
                  style={{ color: "#4d79ff" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar Usuário">
                <IconButton
                  component={Link}
                  to={`/users/edit/${userId}`}
                  style={{ color: "#4d79ff" }}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remover Usuário">
                <IconButton
                  onClick={() => remover(userId)}
                  style={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserListarUm;
