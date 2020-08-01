// Importanto React
import React, { useState, useEffect} from "react";

// Importanto API
import api from './services/api';

// Importando CSS
import "./styles.css";

function App() {

  // Guardar os dados do repositório
  const [repositories, setRepositories] = useState([]);

  // Chamada da API dos repositórios
  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // Adicionando Repositório
  async function handleAddRepository() {
    // setRepositories([ ...repositories, `Novo repositório ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url: 'https://github.com/josethiagodev',
      techs: ["ReactJS", "NodeJS"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  // Removendo Repositório
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
        <ul data-testid="repository-list">
          {repositories.map(repository =>
            <li key={repository.id}>
              
              <ul>
                <li><h1><a href={repository.url} target="_blanck">{repository.title}</a></h1></li>
                <li><span>Likes: {repository.likes}</span></li>
                <li><button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>
              </ul>

            </li>
          )}
        </ul>

      <button onClick={handleAddRepository}>Adicionar repositório</button>
    </div>
  );
} // return

export default App;
