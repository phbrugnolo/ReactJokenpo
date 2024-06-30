import { Torneio } from "../../../models/Torneio";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { formatarData } from "../../../util/formata";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function TorneioListar() {
  const [torneios, setTorneios] = useState<Torneio[]>([]);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    carregarTorneios();

    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setOpenSnackbar(true);
    }
  }, [location.state]);

  function carregarTorneios() {
    axios
      .get<Torneio[]>("http://localhost:5154/tournament/listar")
      .then((resposta) => {
        setTorneios(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
      });
  }

  function remover(torneioId: any) {
    axios
      .delete(`http://localhost:5154/tournament/remover/${torneioId}`)
      .then((resposta) => {
        setTorneios(resposta.data);
        setMessage("Torneio removido com sucesso");
        setOpenSnackbar(true);
      });
  }

  return (
    <div>
      <Typography variant="h3">Lista de torneios</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Premiação</TableCell>
            <TableCell>Criado Em</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Remover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {torneios.map((torneio) => (
            <TableRow key={torneio.torneioId}>
              <TableCell>{torneio.torneioId}</TableCell>
              <TableCell>{torneio.nome}</TableCell>
              <TableCell>{torneio.descricao}</TableCell>
              <TableCell>{torneio.premiacao.toFixed(2)}</TableCell>
              <TableCell>{formatarData(torneio.criadoEm)}</TableCell>
              <TableCell>
                <Tooltip title="Editar Torneio">
                  <IconButton
                    component={Link}
                    to={`/torneios/edit/${torneio.torneioId}`}
                    style={{ color: "#4d79ff" }}
                  >
                    <ModeEditOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Remover Torneio">
                  <IconButton
                    onClick={() => remover(torneio.torneioId)}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  );
}
export default TorneioListar;
