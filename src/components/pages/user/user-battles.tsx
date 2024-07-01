import { Battle } from "../../../models/Battle";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatarData, formatarGuid, formatarJogadaIcon } from "../../../util/formata";
import axios from "axios";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function UserBattles() {
  const [batalhas, setBatalhas] = useState<Battle[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    carregarBatalhas();
  }, []);

  function carregarBatalhas() {
    if (userId) {
      axios
        .get<Battle[]>(`http://localhost:5154/users/batalhas/${userId}`)
        .then((resposta) => {
          setBatalhas(resposta.data);
        })
    }
  }

  return (
    <div>
      <Typography variant="h3">Lista de batalhas</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Torneio</TableCell>
            <TableCell>Jogada</TableCell>
            <TableCell>Máquina</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batalhas.map((batalha) => (
            <TableRow key={batalha.battleId}>
              <TableCell>{formatarGuid(batalha.battleId)}</TableCell>
              <TableCell>{batalha.torneio?.nome}</TableCell>
              <TableCell>{formatarJogadaIcon(batalha.jogada)}</TableCell>
              <TableCell>{formatarJogadaIcon(batalha.jogadaMaquina)}</TableCell>
              <TableCell>{batalha.resultado}</TableCell>
              <TableCell>{formatarData(batalha.criadoEm)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default UserBattles;
