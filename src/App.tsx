import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import UserCadastrar from "./components/pages/user/user-cadastrar";
import UserListar from "./components/pages/user/user-listar";
import UserEditar from "./components/pages/user/user-editar";
import TorneioCadastrar from "./components/pages/torneio/torneio-cadastrar";
import TorneioListar from "./components/pages/torneio/torneio-listar";
import TorneioEditar from "./components/pages/torneio/torneio-editar";
import BattleCadastrar from "./components/pages/battle/battle-cadastrar";
import BattleListar from "./components/pages/battle/battle-listar";
import UltimaBatalha from "./components/pages/battle/battle-ultima";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/cadastrar">Cadastrar Usuário</Link>
            </li>
            <li>
              <Link to="/users/listar">Listar Usuários</Link>
            </li>
            <li>
              <Link to="/torneio/cadastrar">Cadastrar Torneio</Link>
            </li>
            <li>
              <Link to="/torneio/listar">Listar Torneio</Link>
            </li>
            <li>
              <Link to="/batalhas/cadastrar">Cadastrar Batalha</Link>
            </li>
            <li>
              <Link to="/batalhas/listar">Listar Batalhas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<BattleListar />} />
          <Route path="/users/cadastrar" element={<UserCadastrar />} />
          <Route path="/users/listar" element={<UserListar />} />
          <Route path={"/users/edit/:userId"} element={<UserEditar />} />
          <Route path="/torneio/cadastrar" element={<TorneioCadastrar />} />
          <Route path="/torneio/listar" element={<TorneioListar />} />
          <Route path={"/torneio/edit/:torneioId"} element={<TorneioEditar />} />
          <Route path="/batalhas/cadastrar" element={<BattleCadastrar />} />
          <Route path="/batalhas/listar" element={<BattleListar />} />
          <Route path="/batalhas/ultima" element={<UltimaBatalha />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <p>Projeto Jokenpo &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
