import { User } from '../../../models/User';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserCadastrar(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idade, setIdade] = useState('');

    function cadastrarUser(e : any){
        e.preventDefault();
        const user : User = {
            nome: nome,
            email: email,
            telefone: telefone,
            idade: parseInt(idade)
        };
        axios.post('http://localhost:5154/users/cadastrar', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
        }).then((user) => {
            console.log(user);
        });
    }
    
    return (
        <div>
            <h1>Cadastrar Usuário</h1>
            <form onSubmit={cadastrarUser}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Telefone:</label>
                    <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} required/>
                </div>
                <div>
                    <label>Idade:</label>
                    <input type="number" value={idade} onChange={e => setIdade(e.target.value)} required/>
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
export default UserCadastrar;