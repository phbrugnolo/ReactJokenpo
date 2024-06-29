import { User } from "../../../models/User";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatarData } from "../../../util/formata";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

function UserListar() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    carregarUsers();
  }, []);

  function carregarUsers() {
    axios
      .get<User[]>("http://localhost:5154/users/listar")
      .then((resposta) => {
        setUsers(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
      });
  }

  function remover(userId: any) {
    axios
      .delete<User[]>(`http://localhost:5154/users/remover/${userId}`)
      .then((resposta) => {
        setUsers(resposta.data);
      });
  }

  return (
    <div>
      <Typography variant="h3">Lista de usuários</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Criado Em</TableCell>
            <TableCell>Batalhas</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Remover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.telefone}</TableCell>
              <TableCell>{user.idade}</TableCell>
              <TableCell>{formatarData(user.criadoEm)}</TableCell>
              <TableCell>
                <Tooltip title="Visualizar batalhas">
                  <IconButton
                    component={Link}
                    to={`/users/batalhas/${user.userId}`}
                    style={{ color: " #3333cc" }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Editar Usuário">
                  <IconButton
                    component={Link}
                    to={`/users/edit/${user.userId}`}
                    style={{ color: "#4d79ff" }}
                  >
                    <ModeEditOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Remover Usuário">
                  <IconButton
                    onClick={() => remover(user.userId)}
                    style={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default UserListar;
