import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import UserCadastrar from "./components/pages/user/user-cadastrar";
import UserListar from "./components/pages/user/user-listar";
import UserEditar from "./components/pages/user/user-editar";
import UserBattles from "./components/pages/user/user-battles";
import UserListarUm from "./components/pages/user/user-listar-um";
import TorneioCadastrar from "./components/pages/torneio/torneio-cadastrar";
import TorneioListar from "./components/pages/torneio/torneio-listar";
import TorneioEditar from "./components/pages/torneio/torneio-editar";
import BattleCadastrar from "./components/pages/battle/battle-cadastrar";
import BattleListar from "./components/pages/battle/battle-listar";
import UltimaBatalha from "./components/pages/battle/battle-ultima";
import TorneioListarUm from "./components/pages/torneio/torneio-listar-um";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App: React.FC = () => {
  const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
  const [torneioAnchorEl, setTorneioAnchorEl] = React.useState<null | HTMLElement>(null);
  const [battleAnchorEl, setBattleAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleTorneioMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTorneioAnchorEl(event.currentTarget);
  };

  const handleTorneioMenuClose = () => {
    setTorneioAnchorEl(null);
  };

  const handleBattleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBattleAnchorEl(event.currentTarget);
  };

  const handleBattleMenuClose = () => {
    setBattleAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <BrowserRouter>
          <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Projeto Jokenpo
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button
                color="inherit"
                onClick={handleUserMenuOpen}
              >
                Usuários
              </Button>
              <Menu
                anchorEl={userAnchorEl}
                open={Boolean(userAnchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose} component={Link} to="/users/cadastrar">
                  Cadastrar Usuário
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose} component={Link} to="/users/listar">
                  Listar Usuários
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                onClick={handleTorneioMenuOpen}
              >
                Torneio
              </Button>
              <Menu
                anchorEl={torneioAnchorEl}
                open={Boolean(torneioAnchorEl)}
                onClose={handleTorneioMenuClose}
              >
                <MenuItem onClick={handleTorneioMenuClose} component={Link} to="/torneios/cadastrar">
                  Cadastrar Torneio
                </MenuItem>
                <MenuItem onClick={handleTorneioMenuClose} component={Link} to="/torneios/listar">
                  Listar Torneios
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                onClick={handleBattleMenuOpen}
              >
                Batalhas
              </Button>
              <Menu
                anchorEl={battleAnchorEl}
                open={Boolean(battleAnchorEl)}
                onClose={handleBattleMenuClose}
              >
                <MenuItem onClick={handleBattleMenuClose} component={Link} to="/batalhas/cadastrar">
                  Cadastrar Batalha
                </MenuItem>
                <MenuItem onClick={handleBattleMenuClose} component={Link} to="/batalhas/listar">
                  Listar Batalhas
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<UltimaBatalha />} />
              <Route path="/users/cadastrar" element={<UserCadastrar />} />
              <Route path="/users/listar" element={<UserListar />} />
              <Route path={"/users/edit/:userId"} element={<UserEditar />} />
              <Route path={"/users/buscar/:userId"} element={<UserListarUm />} />
              <Route path={"/users/batalhas/:userId"} element={<UserBattles />} />
              <Route path="/torneios/cadastrar" element={<TorneioCadastrar />} />
              <Route path="/torneios/listar" element={<TorneioListar />} />
              <Route path={"/torneios/edit/:torneioId"} element={<TorneioEditar />} />
              <Route path={"/torneios/buscar/:torneioId"} element={<TorneioListarUm />} />
              <Route path="/batalhas/cadastrar" element={<BattleCadastrar />} />
              <Route path="/batalhas/listar" element={<BattleListar />} />
              <Route path="/batalhas/ultima" element={<UltimaBatalha />} />
            </Routes>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: 'primary.main', textAlign: 'center', mt: 'auto', width: '100%' }}>
            <Typography variant="body1" color="whitesmoke">Projeto Jokenpo &copy; 2024</Typography>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
