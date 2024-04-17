import React from 'react';
import './tablaUsuario.css';

function tablaUsuario({ users, onDeleteUser }) {
    const handleDelete = (id) => {
        // Llama a la función onDeleteUser con el ID del usuario a eliminar
        onDeleteUser(id);
    };

    return (
        <table>
            <thead>
                <tr>
                    {/* <th>ID</th> */}
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Ubicacion</th>
                    <th>Acciones</th> {/* Agrega una columna para las acciones */}
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        {/* <td>{user._id}</td> */}
                        <td>{user.nombre}</td>
                        <td>{user.apellidoP}</td>
                        <td>{user.ubicacionM}</td>
                        <td>
                            <button onClick={() => handleDelete(user._id)}>Eliminar</button> {/* Botón para eliminar usuario */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default tablaUsuario;
