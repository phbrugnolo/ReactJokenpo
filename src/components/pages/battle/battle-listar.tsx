import { Battle } from "../../../models/Battle";
import { useState, useEffect } from "react";
import { formatarData, formatarJogadaIcon } from "../../../util/formata";
import axios from "axios";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { useLocation } from "react-router-dom";

function BattleListar() {
  const [batalhas, setBatalhas] = useState<Battle[]>([]);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    carregarBatalhas();

    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setOpenSnackbar(true);
    }
  }, [location.state]);

  function carregarBatalhas() {
    axios
      .get<Battle[]>("http://localhost:5154/batalhas/listar")
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
              <TableCell>{batalha.battleId}</TableCell>
              <Tooltip title={batalha.userId}>
                <TableCell>{batalha.user?.nome}</TableCell>
              </Tooltip>
              <Tooltip title={batalha.torneioId}>
                <TableCell>{batalha.torneio?.nome}</TableCell>
              </Tooltip>
              <TableCell>{formatarJogadaIcon(batalha.jogada)}</TableCell>
              <TableCell>{formatarJogadaIcon(batalha.jogadaMaquina)}</TableCell>
              <TableCell>{formatarData(batalha.criadoEm)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  );
}
export default BattleListar;
