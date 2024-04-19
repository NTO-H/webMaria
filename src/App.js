import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablaUsuario from './components/tablaUsuario';

function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/obtenerUsuarios/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/eliminarUsarioById/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const createUser = async (userData) => {
    try {
      await axios.post('http://localhost:4000/api/crearUsuario', userData);
      fetchData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {console.log('Valor de createUser:', createUser)}
      <TablaUsuario users={users} onDeleteUser={deleteUser} createUser={createUser} />

    </div>
  );

}

export default App;
