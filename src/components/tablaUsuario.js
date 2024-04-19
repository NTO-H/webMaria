import React, { useState } from 'react';
import './tablaUsuario.css';
import Swal from 'sweetalert2';

function TablaUsuario({ users, onDeleteUser, createUser }) {
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

        // Validar campos de entrada
        if (!newUserData.nombre.trim() || !newUserData.correo.trim() || !newUserData.telefono.trim()) {
            let errorMessage = "Por favor, completa todos los campos del formulario:";
            if (!newUserData.nombre.trim()) {
                errorMessage += "\n- Nombre";
            }
            if (!newUserData.correo.trim()) {
                errorMessage += "\n- Correo";
            }
            if (!newUserData.telefono.trim()) {
                errorMessage += "\n- Teléfono";
            }

            Swal.fire(
                "¡Error!",
                errorMessage,
                "error"
            );
            return; // Detener la ejecución de la función si hay campos vacíos
        }

        try {
            console.log('Valor de createUser:', createUser);
            await createUser(newUserData);
            setShowModal(false); // Cerrar el modal después de agregar el usuario

            // Vaciar el formulario
            setNewUserData({
                nombre: '',
                correo: '',
                telefono: ''
            });

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
            {/* Botón para abrir el modal */}
            <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar Usuario</button>

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

        
            {/* Modal de Bootstrap para agregar usuarios */}
            <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Agregar Usuario</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario para agregar un nuevo usuario */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" name="nombre" value={newUserData.nombre} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="correo">Correo</label>
                                    <input type="email" className="form-control" id="correo" name="correo" value={newUserData.correo} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input type="text" className="form-control" id="telefono" name="telefono" value={newUserData.telefono} onChange={handleInputChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TablaUsuario;
