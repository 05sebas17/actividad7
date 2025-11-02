Gestión de Productos (Node + React + MySQL)

Aplicación web para administrar productos de una tienda. Permite crear, editar, eliminar y listar productos, además de manejar un carrito de compras con total y pedidos.

Tecnologías usadas

Frontend: React.js + Vite

Backend: Node.js + Express.js

Base de datos: MySQL

Librerías: Axios, CORS, dotenv, Multer (para subir imágenes)

Instalación y configuración

1. Configurar el backend

Entrar a la carpeta del servidor:

cd server
npm install

2. Configurar el frontend

En otra terminal:

cd client
npm install
npm run dev

Funcionalidades principales

-Crear, leer, actualizar y eliminar productos

-Subir imágenes de productos con Multer

-Agregar productos al carrito

-Eliminar productos del carrito

-Calcular total del carrito

-Generar pedido con fecha y total



Base de datos (dónde está y cómo importarla)

Está en db/tennis_store.sql. Para importarlo con MySQL Workbench:

Abre Workbench → Server → Data Import.

Selecciona Import from Self-Contained File y elige db/tennis_store.sql.

Marca Dump Structure and Data.

En Default Target Schema, crea o selecciona un schema llamado tennis_store (si no existe, Workbench te permite crearlo).

Haz clic en Start Import.

Con CLI sería algo como:

mysql -u TU_USUARIO -p -h localhost -P 3306 < db/tennis_store.sql

Variables de entorno (.env)

En el repo hay un archivo de ejemplo: server/.env.example. No contiene credenciales reales; es solo una guía.
Copia ese archivo a server/.env y completa tus datos locales de MySQL.

Contenido de ejemplo:

PORT=8081
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
DB_NAME=tennis_store
