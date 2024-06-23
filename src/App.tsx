import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import UserCadastrar from "./components/pages/user/user-cadastrar";
import UserListar from "./components/pages/user/user-listar";
import UserEditar from "./components/pages/user/user-editar";

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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<UserListar />} />
          <Route path="/users/cadastrar" element={<UserCadastrar />} />
          <Route path="/users/listar" element={<UserListar />} />
          <Route path="/users/edit/:id" element={<UserEditar />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <p>Projeto Jokenpo &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
