# How to code


## Crear recursos
1. **Modules**: Ejecutar `nest g module modules/my_module`. Esto añadira el nuevo modulo en la carpeta modules.
2. **Services**: Ejecutar `nest g service modules/my_module`. Creara un service con el mismo nombre del modulo en la misma carpeta.

## Estructura de cada modulo
Cada funcionalidad del modulo debe de organizarse dentro de alguno de los siguientes directorios.

- **Interfaces**: Se usa para guardar las interfaces o tipes que se usaran en el modulo.
- **dto**: Data Transfer Objects. Es la representación de una `Class` en primitives, no posee lógica y se usa para definir los objectos que se reciben de una request. Este incluye `@decorators` para documentarlos en swagger.
- **Entities**: Definición de cada entidad que se usara en el modulo. Generalmente posee una entidad principal y otras sub entidades dependientes. La entidad principal suele tener el nombre del modulo. Puede poseer lógica de negocio. Se debe de incluir los `@decorators` de typeorm y nestjs para definir entidades o sino no podra generarse la migración correspondiente.
- **Responses**: Incluye interfaces o types con la respuesta que retornara la api utilizando primitives.
- **Services**: Se incluyen los services que se encargaran de realizar lógica de negocio o de realizar tareas en la base de datos. Estos archivos funcionan utilizando el sistema de inyección de dependencias de nestjs.

### Recomendaciones

Se recomienda tener conocimiento sobre los sistema de inyección de dependencias y como funciona el de nest JS.