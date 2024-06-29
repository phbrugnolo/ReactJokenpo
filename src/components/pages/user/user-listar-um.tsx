import { User } from "../../../models/User";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatarData } from "../../../util/formata";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";


function UserListarUm() {
  const { userId } = useParams<{ userId: string }>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [criadoEm, setCriadoEm] = useState("");

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
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
      });
  }

  return (
    <div>
      <Typography variant="h3">Usuário {nome}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Criado Em</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={userId}>
            <TableCell>{userId}</TableCell>
            <TableCell>{nome}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{telefone}</TableCell>
            <TableCell>{idade}</TableCell>
            <TableCell>{formatarData(criadoEm)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default UserListarUm;
