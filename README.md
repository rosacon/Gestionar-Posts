# Gestionar-Posts
Aplicación utilizando React.js que consume la  API gratuita https://jsonplaceholder.typicode.com/posts y permite listar, crear, editar, eliminar  los posts. Así mismo la información se presenta en una tabla la cual está paginada.

## Instalación

## `sudo apt install curl`

Instalar la utilidad de linea de comandos con la siguiente linea: 

## `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`

Descargar node.js, ejecutar el siguiente comando para Descargar versión de node.js ahí en setup_se coloca la versión que se quiere por ejemplo si se quisiera la 20 se colocaría setup_20.x

## `sudo apt-get install -y nodejs`

Instalar Node.js


## `node -v` 

Verificar la versión instalada de node

## `npm --version`

Verificar la versión instalada de node


### `Crear el proyecto`

Para usar create-react-app, necesitas tener instalado Node.js. Se recomienda utilizar la versión de soporte a largo plazo (LTS, por sus siglas en inglés). Node incluye npm (el administrador de paquetes de Node), y npx (el ejecutor de paquetes de Node).Ref:https://developer.mozilla.org/es/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started.

### `npx create-react-app gestionar-posts`

Iniciar un nuevo proyecto con este comando y al final se le coloca el nombre del nuevo en este caso yo le coloqué gestionar-posts. Este paso instala todos los paquetes necesarios para trabajar con react.

### `gestionar-posts`

Nos ubicamos en el directorio del proyecto.

### `npm start`

En la terminal colocamos el siguiente comando, el cual va a iniciar nuestra aplicación y la va abrir en el navegador, por lo general la url es: <b>http://localhost:3000/</b>

### `npm i`

Utiliza npm i para instalar y actualizar dependencias

### `npm i react-router-dom axios bootstrap sweetalert2 sweetalert2-react-content @fortawesome/fontawesome-free`

Ahora copiar y pegar en la terminal el siguiente comando.El cual va a hacer lo siguiente:

-react-router-dom :se debe instalar para las rutas
-axios: Para las peticiones a las api.
-bootstrap: para estilos.
-sweetalert2: para mostrar las alertas en cada caso. 
-sweetalert2-react-content: para mostrar las alertas en cada caso.
-@fortawesome/fontawesome-free:Para colocar los iconos que se necesitan.

## Consumir API con React

Se consume la api (https://jsonplaceholder.typicode.com/posts)

- <b>REACT </b>
- CRUD en una sola vista
- Bootstrap
- Fontawesome
- SweetAlert2

## Es importante aclarar que parte de este proyecto se basa en herramientas proporcionadas en esta guía.

https://www.youtube.com/watch?v=fgQHjMotDPk
