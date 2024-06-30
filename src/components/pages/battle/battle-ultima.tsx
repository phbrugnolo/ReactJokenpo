import { Battle } from "../../../models/Battle";
import { useState, useEffect } from "react";
import axios from "axios";
import { Torneio } from "../../../models/Torneio";
import { User } from "../../../models/User";
import { formatarData, formatarGuid, formatarJogadaIcon } from "../../../util/formata";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function UltimaBatalha() {
  const [battleId, setBattleId] = useState("");
  const [torneioId, setTorneioId] = useState("");
  const [userId, setUserId] = useState("");
  const [jogada, setJogada] = useState("");
  const [jogadaMaquina, setJogadaMaquina] = useState("");
  const [torneio, setTorneio] = useState<Torneio>();
  const [user, setUser] = useState<User>();
  const [criadoEm, setCriadoEm] = useState("");

  useEffect(() => {
    carregarBatalha();
  }, []);

  function carregarBatalha() {
    axios
      .get("http://localhost:5154/batalhas/last")
      .then((resposta) => {
        const batalha = resposta.data;
        setBattleId(batalha.battleId);
        setTorneioId(batalha.torneioId);
        setUserId(batalha.userId);
        setJogada(batalha.jogada);
        setJogadaMaquina(batalha.jogadaMaquina);
        setTorneio(batalha.torneio);
        setUser(batalha.user);
        setCriadoEm(batalha.criadoEm);
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
          <TableRow key={battleId}>
            <TableCell>{formatarGuid(battleId)}</TableCell>
            <TableCell>{user?.nome}</TableCell>
            <TableCell>{torneio?.nome}</TableCell>
            <TableCell>{formatarJogadaIcon(jogada)}</TableCell>
            <TableCell>{formatarJogadaIcon(jogadaMaquina)}</TableCell>
            <TableCell>{formatarData(criadoEm)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default UltimaBatalha;
