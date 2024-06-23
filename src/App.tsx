import React from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import UserCadastrar from './components/pages/user/user-cadastrar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/users/cadastrar">Cadastrar Usuário</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/users/cadastrar" element={<UserCadastrar />} />
        </Routes>
      </BrowserRouter>
      <footer>
          <p>Projeto Jokenpo &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
