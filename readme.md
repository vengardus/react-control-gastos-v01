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
mkdir hooks

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
pnpm add prop-types
pnpm add zustand
pnpm add @supabase/supabase-js
pnpm add iso-country-currency
pnpm add @tanstack/react-query
pnpm add sweetalert2
pnpm add react-hook-form
pnpm add react-color
pnpm add emoji-picker-react
pnpm add react-spinners
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

## Supabase

- Tables
    -- users
    -- accounts

- Triggers

```plpsql
create function insert_account() 
returns trigger
language plpgsql
as $$
begin
  insert into accounts(id_user) values (new.id);
  return new;
end;
$$;

create trigger account_insert_trigger
after insert on users
for each row
execute function insert_account();
```

## Ayuda memoria

### Deshabilitar propTypes del lint en vsCode

```json
# disable project-wide in your eslintrc:

"rules": {
  "react/prop-types": "off"
}
```
