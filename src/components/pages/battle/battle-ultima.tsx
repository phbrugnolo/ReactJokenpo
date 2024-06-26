import { Battle } from "../../../models/Battle";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatarData, formatarGuid, formatarJogadaIcon } from "../../../util/formata";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";

function UltimaBatalha() {
  const [battles, setBattles] = useState<Battle[]>([]);

  useEffect(() => {
    carregarBatalha();
  }, []);

  function carregarBatalha() {
    axios
      .get<Battle[]>("http://localhost:5154/batalhas/last")
      .then((resposta) => {
        setBattles(resposta.data);
      })
  }

  return (
    <div>
      <Typography variant="h3">Batalhas mais recentes</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>Torneio</TableCell>
            <TableCell>Jogada</TableCell>
            <TableCell>Máquina</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Criado Em</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {battles.map((battle) => (
            <TableRow key={battle.battleId}>
              <TableCell>{formatarGuid(battle.battleId)}</TableCell>
              <TableCell>{battle.user?.nome}</TableCell>
              <TableCell>{battle.torneio?.nome}</TableCell>
              <TableCell>{formatarJogadaIcon(battle.jogada)}</TableCell>
              <TableCell>{formatarJogadaIcon(battle.jogadaMaquina)}</TableCell>
              <TableCell>{battle.resultado}</TableCell>
              <TableCell>{formatarData(battle.criadoEm)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UltimaBatalha;
