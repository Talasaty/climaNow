## Clima Now

El objetivo de esta web es la de informar sobre el clima de diferentes partes del mundo.

Para acceder debes usar el usuario `admin` y la password `password`

Para lanzar el proyecto en modo desarrollo ejecuta

```bash
npm install
npm run dev
```

Para lanzar el proyecto en modo producción

```bash
npm run build
npm run start
```

Abre el navegador y dirígete a [http://localhost:3000](http://localhost:3000).

## Cómo está desarrollado

La estrategia de implementación que se ha adoptado a la hora de realizar este desarrollo
ha sido la de adoptar una arquitectura hexagonal donde, en este caso, se han creado las capas de

- entities
- repository (dentro de app/api)
- mappers o adaptadores (dentro de app/api)
- pages (dentro de app) esta es la capa que muestra la información al usuario

La organización de las carpetas y ficheros dista de ser la idónea para el framework debido al desconocimiento que
actualmente tengo del mismo.

## Descripción del desarrollo

### Conexión con el mundo exterior

```bash
    |app/
    |----api/
```

#### ApiClient

En esta carpeta nos encontramos con lo necesario para "hablar" con el mundo exterior.
El fichero ApiClient.ts tiene como única y exclusiva finalidad realizar comunicaciones con el API, en este caso solo se
ha implementado el get mediante query sin
modificar los headers, pero si fuese necesario añadir una función nueva con configuración diferente o incluso en lugar
de usar fetch usar Axios u otra librería, este fichero nos permite desacoplar esta tecnología del resto del proyecto.
Además de que tiene su propio control de errores por si falla algo en la comunicación.

#### locations

Este fichero solo es un array de datos que sirve como comodín para tener un índice de municipios de España. Se pone en
en esta carpeta porque si se cambia y en una evolución se consume de un API o de una base de datos, el resto de capas
no se vean afectadas.

#### repository

En este fichero se consume el ApiClient y es el que sirve a las vistas de la información que necesitan. En el caso de
tener más repositorios y si el proyecto crece, se debería añadir una capa más que se denominaría services y es esta la
controlaría a los repositorios. De esta forma si una vista requiere información de dos repositorios al mismo tiempo,
puede consumir un servicio que proporciona esta información.

#### weatherMapper

Estos ficheros son adaptadores, básicamente convierten la información que proporciona el API en un modelo de datos que
nos interesa. Estos modelos de datos están en la carpeta entities.

### Herramientas internas

```bash
    |app/
    |----hooks/
    |----lib/
```

Para la implementación de las vistas, y para facilitar la gestión de algunas funcionalidades se ha creado un conjunto
herramientas, tanto hooks como utilidades varias.

#### Hooks

Se han creado 3 hooks, uno de ellos es para verificar si nos encontramos en una pantalla responsive o desktop
useScreenIsMobile. De esta forma se puede verificar mediante Ts si estamos en una pantalla o en otra y mostrar una
información u otra.

También se han creado 2 hooks para la gestión de la información que viene del repositorio. Uno de ellos el useGetData.ts
hace
uso de una herramienta, concretamente del ServiceExecutor del que luego hablaré.
Este useGetData se encarga de proporcionar la información que requiere la vista, está pensado para que sea versátil y se
le pueden pasar un conjunto de props que se ejecuten tareas antes de la llamada al API, al terminar o en caso de error
por ejemplo.

El useGetLocations es un fichero que se encarga de traer del repositorio la información de los municipios a representar,
pero tiene la particularidad de que implementa una caché usando el localStorage de forma que alivia el consumo de datos
del lado del servidor. Esto se ha hecho así, ya que, esta información no cambia con frecuencia y es un dato que casi
será inmutable.

#### Herramientas y utilidades

Se han creado 3 ficheros para facilitar y simplificar el desarrollo del proyecto. El fichero logout.ts se encarga de
cerrar
la sesión y de llevarte a la pantalla del login, se ha extraído porque se usa en diferentes partes del proyecto y así
se centraliza su implementación, evitando la repetición de código.
El fichero utils.ts está destinado a albergar todas las funciones simples, pero que vienen de ayuda como ordenar strings
de una
determinada forma o cualquier otra funcionalidad que nos pueda ser de interés tener disponible en todo el proyecto.
El serviceExecutor.ts es una función cuyo objetivo es definir un try/catch, de manera que nos evita tener que
implementarlo
en cada llamada a un repositorio o a alguna otra promesa que pueda ser susceptible de error.

### Middleware

```bash
    |middleware.ts
```

Este fichero que se encuentra en la raíz del proyecto es el que se encarga de comprobar que se tiene sesión para poder
navegar a las pantallas protegidas.
De tal manera que si se intenta ir al /home y no hay sesión establecida impedirá la navegación.
Este también controla que si se tiene sesión no se pueda estar en la pantalla de login, haciendo una redirección a la
pantalla de home.

### NextAuth

```bash
    |pages/
    |----api/
    |-------auth/
    |-----------[...nextauth].ts/
```

En este fichero se ha configurado el control de accesos. Para este caso y dado que es un ejemplo y nunca se debe suar
así en un entorno
productivo se ha puesto el control de credenciales en este mismo fichero, el usuario es `admin` y la contraseña
es `password`. Como he dicho
en condiciones normales y fuera de este ejemplo la contraseña se debería encriptar y nunca se hará el control de si es
válida o no junto con el usuario en este fichero.

### Control de errores

Se han implementado controles de errores de tal manera que si falla el API se redirige a una pantalla que está en el
path `/error`
y si ocurre algún fallo en la rederización se muestra un mensaje personalizado de error.

### Estilos

Para el desarrollo de este proyecto se han usado estilos CSS en ficheros con CSS, en algún caso se ha hecho un amago de
uso de Taiwind, pero dado mi
desconocimiento sobre este no es algo más que anecdótico su uso en este proyecto.

### Testing

Se ha implementado con cypress un test E2E que verifica el login hace una navegación por la web validando el contenido
que se muestra, valida también
un escenario de fallo y luego hace un logout validando que todo se muestra como se espera.

Para probar esto, ejecutar:

```bash
npm run build
npm run start
```

y en otra consola ejecutar:

```bash
npm run cypress:open
```