import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente: bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação;
// Propriedade: informações que um componente PAI passa para o componente filho;
// Estado: informações mantidas pelo componente (lembrar: imutabilidade);

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])


  async function handleDestroyDev(id) {
    let response = await api.delete(`/devs/${id}`);
    response = await api.get('/devs');
    setDevs(response.data);
  }

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Sign Up</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} handleDestroyDev={handleDestroyDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
