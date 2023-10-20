# Proyecto: Control de Gastos con React (curso 369.com)

## Resumen

- Metodología Atomic Design
- ubuntu v.22.04
- node v.18.16.0
- react v.18.2
- pmpm v.8.9.2

## Extensiones VSCode

- styled-Components Snippets

## Creación del proyecto

```pwd
pnpm create vite
# seleccionar react
# seleccionar javascript 

pnpm install

pnpm run dev
```

## Creación de carpetas

```pwd
cd src
mkdir components
mkdir context
mkdir pages
mkdir querys
mkdir routers
mkdir store
mkdir styles
mkdir supabase
mkdir utils

cd components
mkdir atomos
mkdir moleculas
mkdir organismos
mkdir templates

cd ../..
```

## Instalar dependencias

```pwd
pnpm add styled-components  
pnpm add react-router-dom
pnpm add react-icons
```

## Desarrollo

- Limpiar App.jsx
- Modificar index.html: idioma, title
- Eliminar App.css
- Modificar index.css
- Copiar styles/themes.jsx styles/variables.jsx

- Crear paginas: pages/LoginPage.jsx
- Crear templates por cada pagina: components/templates/LoginTemnplate.jsx
- Crear rutas: routes/routes.jsx
