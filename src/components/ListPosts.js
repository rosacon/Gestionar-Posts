import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ListPosts = ({ }) => {

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const itemsPerPage = 10;
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState('');
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [operation, setOperation] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const respuesta = await axios.get(url);
            setPosts(respuesta.data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = posts.slice(startIndex, endIndex);
    const totalPaginas = Math.ceil(posts.length / itemsPerPage);

    const openModal = (op, id, title, body, userId) => {
        setOperation(op);
        setId('');
        setTitle('');
        setBody('');
        setUserId('');

        if (op === 1) {
            //setTitle('Registrar Post');
        }
        else if (op === 2) {
            //setTitle('Editar Post');
            setId(id);
            setTitle(title);
            setBody(body);
            setUserId(userId);
        }
        
        window.setTimeout(function () {
            document.getElementById('title').focus();
        }, 500);
    }

    const validar = () => {
        var parametros;
        var metodo;

        if (title.trim() === '') {
            show_alerta('Escribe el nombre del post', 'warning');
        }
        else if (body.trim() === '') {
            show_alerta('Escribe la descripción del post', 'warning');
        }

        else {
            if (operation === 1) {
                parametros = { title: title.trim(), body: body.trim() };
                metodo = 'POST';
                enviarSolCre(metodo, parametros);
            }
            else {
                parametros = { id: id, title: title.trim(), body: body.trim(), userId: userId };
                metodo = 'PUT';
                enviarSolUp(metodo, parametros);
            }
        }
    }

    const enviarSolCre = async (metodo, parametros) => {

        await axios({ method: metodo, url: url, data: parametros }).then(function (respuesta) {
            console.log(respuesta);
            var tipo = respuesta.status;
            //var msj = respuesta.statusText;
            var msj = '';
            var icono = 'success';

            if (tipo === 201) {
                icono = 'success';
                msj = 'Post creado exitosamente';
            } else if (tipo === 400) {
                icono = 'error';
                msj = 'Ha ocurrido un error al crear el Post';
            } else {
                icono = 'warning';
                msj = 'Algo salió mal al crear el Post';
            }

            show_alerta(msj, icono);
            if (tipo === '201') {
                document.getElementById('btnCerrar').click();
                getPosts();
            }
        })
            .catch(function (error) {
                show_alerta('Error en la solicitud', 'error');
                console.log(error);
            });
    }

    const enviarSolUp = async (metodo, parametros) => {

        await axios({ method: metodo, url: url + '/' + parametros.id, data: parametros }).then(function (respuesta) {
            console.log(respuesta);
            var tipo = respuesta.status;
            //var msj = respuesta.statusText;
            var msj = '';
            var icono = 'success';

            if (tipo === 200) {
                icono = 'success';
                msj = 'El Post ha sido actualizado exitosamente';
            } else if (tipo === 400 || tipo === 404) {
                icono = 'error';
                msj = 'Ha ocurrido un error al actualizar el Post';
            } else {
                icono = 'warning';
                msj = 'Ha ocurrido un error al actualizar el Post';
            }

            show_alerta(msj, icono);
            if (tipo === '200') {
                document.getElementById('btnCerrar').click();
                getPosts();
            }
        })
            .catch(function (error) {
                show_alerta('Error en la solicitud', 'error');
                console.log(error);
            });
    }

    const enviarSolDelete = async (metodo, parametros) => {

        await axios({ method: metodo, url: url + '/' + parametros }).then(function (respuesta) {
            console.log(respuesta);
            var tipo = respuesta.status;
            //var msj = respuesta.statusText;
            var msj = '';
            var icono = 'success';
            if (tipo === 200) {
                icono = 'success';
                msj = 'El Post ha sido eliminado';
            } else if (tipo === 400 || tipo === 404) {
                icono = 'error';
                msj = 'Ha ocurrido un error al eliminar el Post';
            } else {
                icono = 'warning';
                msj = 'Ha ocurrido un error al eliminar el Post';
            }

            show_alerta(msj, icono);
            if (tipo === '200') {
                document.getElementById('btnCerrar').click();
                getPosts();
            }
        })
            .catch(function (error) {
                show_alerta('Error en la solicitud', 'error');
                console.log(error);
            });
    }

    const deletePost = (id, title) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Seguro de eliminar el post ' + title + ' ?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolDelete('DELETE', id);
            }
            else {
                show_alerta('El post NO fue eliminado', 'info');
            }
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row mt-3'>
                        <div className='col-6 col-lg-4 offset-0 offset-lg-2'>
                            <h1 className='text-left'>Listado de Posts</h1>
                        </div>
                        <div className='col-6 col-lg-4 offset-0 offset-lg-2'>
                            <button onClick={() => openModal(1)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalPost'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir Post
                            </button>
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Título</th>
                                        <th>Contenido</th>
                                        <th className='text-center'>Acciones</th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {currentData.map((post, index) => (
                                        /*posts.map( (post,i)=>(
                                            -
                                            <td>{(i+1)}</td>*/

                                        <tr key={post.id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{post.title}</td>
                                            <td>{post.body}</td>

                                            <td className='text-center'>
                                                <button onClick={() => openModal(2, post.id, post.title, post.body, post.userid)}
                                                    className='btn btn-danger mb-1' data-bs-toggle='modal' data-bs-target='#modalPost'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={() => deletePost(post.id, post.title)} className='btn btn-secondary'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='text-center mb-5'>
                                <button className="btn btn-outline-primary" onClick={() => handlePageChange(0)} disabled={currentPage === 0}>Primera</button>
                                {' '}
                                <button className="btn btn-outline-primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Anterior</button>
                                {' '}
                                <button className="btn btn-outline-primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / itemsPerPage) - 1}>Siguiente</button>
                                {' '}
                                <button className="btn btn-outline-primary" onClick={() => handlePageChange(totalPaginas - 1)} disabled={currentPage === totalPaginas-1}>Última</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalPost' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-pencil'></i></span>
                                <input type='text' id='title' className='form-control' placeholder='title' value={title}
                                    onChange={(e) => setTitle(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='body' className='form-control' placeholder='body' value={body}
                                    onChange={(e) => setBody(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <input type='hidden' id='userid' className='form-control' placeholder='userid' value={userId}
                                    onChange={(e) => setUserId(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPosts;