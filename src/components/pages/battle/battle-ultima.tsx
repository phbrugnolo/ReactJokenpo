import { Battle } from "../../../models/Battle";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatarData, formatarGuid } from "../../../util/formata";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function UltimaBatalha() {
  const [batalhas, setBatalhas] = useState<Battle[]>([]);

  useEffect(() => {
    carregarBatalhas();
  }, []);

  function carregarBatalhas() {
    axios
      .get<Battle[]>("http://localhost:5154/batalhas/last")
      .then((resposta) => {
        setBatalhas(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
      });
  }

  return (
    <div>
      <Typography variant="h3">Lista de batalhas</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>Torneio</TableCell>
            <TableCell>Jogada</TableCell>
            <TableCell>Máquina</TableCell>
            <TableCell>Criado Em</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batalhas.map((batalha) => (
            <TableRow key={batalha.battleId}>
              <TableCell>{formatarGuid(batalha.battleId)}</TableCell>
              <TableCell>{batalha.user?.nome}</TableCell>
              <TableCell>{batalha.torneio?.nome}</TableCell>
              <TableCell>{batalha.jogada}</TableCell>
              <TableCell>{batalha.jogadaMaquina}</TableCell>
              <TableCell>{formatarData(batalha.criadoEm)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default UltimaBatalha;
