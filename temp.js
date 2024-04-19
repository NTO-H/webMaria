import React, { useState } from 'react';
import './tablaUsuario.css';
import Swal from 'sweetalert2';

function TablaUsuario({ users, onDeleteUser, addUser }) {
    const [ showModal, setShowModal ] = useState(false);
    const [ newUserData, setNewUserData ] = useState({
        nombre: '',
        correo: '',
        telefono: ''
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteUser(id);
                Swal.fire(
                    "¡Eliminado!",
                    "El usuario ha sido eliminado.",
                    "success"
                );
            }
        });
    };

    const handleInputChange = (e) => {
        setNewUserData({
            ...newUserData,
            [ e.target.name ]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(newUserData);
            setShowModal(false);
            Swal.fire(
                "¡Éxito!",
                "El usuario ha sido agregado correctamente.",
                "success"
            );
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            Swal.fire(
                "¡Error!",
                "Hubo un problema al agregar el usuario. Por favor, inténtalo de nuevo.",
                "error"
            );
        }
    };

    return (
        <div>
            {/* Código de la tabla de usuarios */}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.nombre}</td>
                            <td>{user.correo}</td>
                            <td>{user.telefono}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botón para abrir el modal */}
            <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar Usuario</button>

            {/* Modal de Bootstrap para agregar usuarios */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Agregar Usuario</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" value={newUserData.nombre} onChange={handleInputChange} />

                            <label htmlFor="correo">Correo:</label>
                            <input type="email" id="correo" name="correo" value={newUserData.correo} onChange={handleInputChange} />

                            <label htmlFor="telefono">Teléfono:</label>
                            <input type="tel" id="telefono" name="telefono" value={newUserData.telefono} onChange={handleInputChange} />

                            <button type="submit">Agregar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TablaUsuario;
