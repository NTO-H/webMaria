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
      const response = await axios.get('http://localhost:4000/api/obtenerUsuarios/'); // Ajusta la URL según tu configuración del backend
      console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };





  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/eliminarUsarioById/${id}`); // Ajusta la URL según tu configuración del backend
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <TablaUsuario users={users} onDeleteUser={deleteUser} />
    </div>
  );



  
}

export default App;
