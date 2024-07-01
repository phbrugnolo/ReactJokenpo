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
import { Link, useLocation } from "react-router-dom";

function BattleListar() {
  const [batalhas, setBatalhas] = useState<Battle[]>([]);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [focusedLink, setFocusedLink] = useState<string | null>(null);

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
              <TableCell>
                <Tooltip title="Ver Usuário">
                  <Typography
                    component={Link}
                    to={`/users/buscar/${batalha.userId}`}
                    style={{
                      textDecoration: "none",
                      color:
                        focusedLink === `user-${batalha.userId}` ? "blue" : "inherit",
                    }}
                    onMouseEnter={() => setFocusedLink(`user-${batalha.userId}`)}
                    onMouseLeave={() => setFocusedLink(null)}
                    onFocus={() => setFocusedLink(`user-${batalha.userId}`)}
                    onBlur={() => setFocusedLink(null)}
                  >
                    {batalha.user?.nome}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Ver Torneio">
                  <Typography
                    component={Link}
                    to={`/torneios/buscar/${batalha.torneioId}`}
                    style={{
                      textDecoration: "none",
                      color:
                        focusedLink === `torneio-${batalha.torneioId}` ? "blue" : "inherit",
                    }}
                    onMouseEnter={() => setFocusedLink(`torneio-${batalha.torneioId}`)}
                    onMouseLeave={() => setFocusedLink(null)}
                    onFocus={() => setFocusedLink(`torneio-${batalha.torneioId}`)}
                    onBlur={() => setFocusedLink(null)}
                  >
                    {batalha.torneio?.nome}
                  </Typography>
                </Tooltip>
              </TableCell>
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
