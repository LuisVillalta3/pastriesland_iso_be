# PASTRISLAND API

## Requerimientos
- Gestor de paquetes: [pnpm](https://pnpm.io/installation).
- CLI [NestJs](https://docs.nestjs.com/#installation)
- Database: [Postgres](https://www.postgresql.org/)

## Project setup 
1. Realizar una copia del archivo **example.env** y llamarlo simplemente **.env**. Aqui deberas de añadir las claves de acceso a la base de datos.
2. Realizar `pnpm install`. Utilizar [pnpm](https://pnpm.io/installation) para realizar esta tarea.
3. Ejecutar `pnpm run start:dev` para levantar el proyecto en  el ambiente de desarrollo.
4. Antes de interactuar con la api, ejecutar `pnpm run migration:run`.
5. Reiniciar el servidor.

## How to code
Read [How to code](https://github.com/LuisVillalta3/pastriesland_iso_be/blob/main/documentation/how-to-code.md)

## Nest Readme
Read [Nest Readme](https://github.com/LuisVillalta3/pastriesland_iso_be/blob/main/documentation/nest-README.md)

## Conociendo la documentación

Una vez iniciada la api en el ambiente de desarrollo se podra visualizar la documentación y el ambiente de pruebas de la api. Para ello ingresa a [Api Documentation](http://localhost:3000/api).

Para conocer como utilizar el ambiente de pruebas leer [Ambiente de pruebas]()

## Ambiente de pruebas

El ambiente de pruebas es creado utilizando la herramienta [Swagger](https://swagger.io/). Este brinda información detallada de cada endpoint siempre y cuando la documentación respectiva se realice en cada archivo que la requiera.

![Swagger image](https://imagedelivery.net/PVooPtpJE-25QaNkbEuXvw/0117d73b-b327-45ff-f333-0af511c52b00/public)

Para saber como documentar la api utilizando swagger se recomienda leer la documentación en [NestJs OpenApi](https://docs.nestjs.com/openapi/introduction).

### Pruebas a endpoints con authentication.

Se debe de generar un token usando los endpoints `admin/auth/login` o `auth/login`. Este token se debera de introducir en el apartado bearer token en la ezquina superior derecha de la documentación.

## Documentación recomendada para el desarrollo de la api

- [NestJs](https://docs.nestjs.com/first-steps)
- [Postgres Docker](https://hub.docker.com/_/postgres)
- [NestJs OpenApi](https://docs.nestjs.com/openapi/introduction)
- [NestJs Database](https://docs.nestjs.com/techniques/database)
- [NestJs Typeorm](https://docs.nestjs.com/recipes/sql-typeorm)
- [NestJs Injection](https://docs.nestjs.com/fundamentals/custom-providers)

### Support
En caso de tener alguna duda sobre como desarrollar la api contactar a Luis Villalta (email: luisvillalta3@gmail.com)