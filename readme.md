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
pnpm add dayjs
pnpm add @mui/material @emotion/react @emotion/styled
pnpm add chart.js react-chartjs-2
pnpm add swiper
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

- functions (rpc)

```sql
create function getmovementsbymonthyear(year int, month int, id_user int, type_category varchar)
returns table(
  id int,
  description varchar,
  value numeric,
  date date,
  state varchar,
  desc_account varchar,
  desc_category varchar,
  currency_value varchar
)
language sql
as $$
select movements.id, movements.description, movements.value, movements.date, movements.state, accounts.description as "desc_account", categories.description as "desc_category", (users.currency || ' ' || movements.value) as currency_value from movements
  inner join accounts on accounts.id = movements.id_account
  inner join users on users.id = accounts.id_user
  inner join categories on categories.id = movements.id_category
  where categories.type = type_category and date_part('year', movements.date)=year and date_part('month', movements.date)=month
$$;
```

```sql
create or replace function rpt_movements_by_year_month(year int, month int, id_user int, type_category varchar)
returns table (
  total numeric,
  description varchar,
  icon varchar,
  color varchar
)
language sql
as $$
select sum(movements.value) as total, categories.description, categories.icon, categories.color 
from movements
  inner join accounts on accounts.id = movements.id_account
  inner join users on users.id = accounts.id_user
  inner join categories on categories.id = movements.id_category
  where categories.type = type_category and date_part('year', movements.date)=year and date_part('month', movements.date)=month
  group by categories.description, categories.icon, categories.color;
$$;
```

## Ayuda memoria

### Deshabilitar propTypes del lint en vsCode

```json
# disable project-wide in your eslintrc:

"rules": {
  "react/prop-types": "off"
}
```

### Imagenes generadas para el carrusel

[https://www.canva.com/es_419/]

### Documentacion chartjs react

[https://react-chartjs-2.js.org/]

### Ejemplos carrusel

[http://swiperjs.com/demos]

## Deploy en Firebase

- Iniciar sesión en firebase [https://firebase.google.com]

- Crear nuevo proyecto (paso 1-3): dar nombre al proyecto

- Google analytics (Paso 2-3): deshabilitar analíticas

- Creando proyecto .... (3-3)

- Agregar app: seleccionar app web  < />

- Registar app:
  - ingresar sobrenombre app
  - agregar sdk firebase:

  ```pwd (carpeta de l proyecto)
    pnpm add firebase 
  ```

  - Opción ir a Console (botón en Registar App)

- Configurar Firebase hosting: menu compilación -> hosting
  - Iniciar Firebae Cli

  ```pwd
    pnpm add -g firebase-tools
  ```

  - Siguiente

  - Inicializar proyecto

  ```pwd
    firebase login
  ```

  - Generar proyecto
  
  ```pwd
    pnpm run buid
  ```
  
  - Solución al warning:

    ```pwd
      (!) Some chunks are larger than 500 KiB after minification. Consider:
      - Using dynamic import() to code-split the application
      - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
      - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
    ```
  
    ```vite.config.js
      export default defineConfig({
        plugins: [react()],
        build: {
          chunkSizeWarningLimit: 1600,    <==
        },
      })
    ```
  
  - Inicialiar firebase

    ```pwd
      firebase init

      Seleccionar opción: Hosting: Configure files for firebase hosting and (optionally) set up Github...
      Use an existing project
      Select project
      What do you want to use as your public directory: enter
      Configure as a simgle-page ? y
      Set up automatic builds and deploys with Github? n
    ```

  - Deploy

    ```pwd
      firebase deploy
    ```

  - Modificar:

    ```pwd
      "hosting": {
          "public": "dist",   <==

    ```

  - Configurar Url Autenticacion en Supabase

    - Opción Authentication -> URL Configuration

      - Redirects URLs -> Add URL
        - Agregar la url del proyecto de firebase

      - Modificar también en:  Site Url (asi funcionó para mi)

  - Posteriores deploys:

    ```pwd
      firebase login    # solo si es necesario
      pnpm run buid
      firebase deploy
    ```
