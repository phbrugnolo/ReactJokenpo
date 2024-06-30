import { Torneio } from "../../../models/Torneio";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatarData } from "../../../util/formata";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function TorneioListarUm() {
  const { torneioId } = useParams<{ torneioId: string }>();
  const [torneios, setTorneios] = useState<Torneio[]>([]);
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [premiacao, setPremiacao] = useState(0);
  const [criadoEm, setCriadoEm] = useState("");


  useEffect(() => {
    carregarTorneio(torneioId);
  }, [torneioId]);

  function carregarTorneio(torneioId: any) {
    axios
      .get(`http://localhost:5154/tournament/buscar/${torneioId}`)
      .then((resposta) => {
        console.log(resposta.data);
        setNome(resposta.data.nome);
        setDescricao(resposta.data.descricao);
        setPremiacao(parseFloat(resposta.data.premiacao));
        setCriadoEm(resposta.data.criadoEm);
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
        navigate('/torneios/listar', { state: { message: "Torneio removido com sucesso" } });
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
        <Grid item xs={12} sm={6} md={4} key={torneioId}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descrição: {descricao}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Premiação: R$ {premiacao.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Criado em: {formatarData(criadoEm)}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Editar Torneio">
                <IconButton
                  component={Link}
                  to={`/torneios/edit/${torneioId}`}
                  style={{ color: "#4d79ff" }}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remover Torneio">
                <IconButton
                  onClick={() => remover(torneioId)}
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

export default TorneioListarUm;
