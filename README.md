# JornaPro
Proyecto realizado para entrega como **CFGS** del modulo Desarrollo de aplicaciones multiplataforma en el centro FESAC.
Este proyecto se trata de una pagina web para llevar jornadas de trabajadores.

## Versiones

Este proyecto a sido generado con  [Angular CLI](https://github.com/angular/angular-cli) versión 7.3.9.

## Servidor de desarrollo

Run `ng serve` para correr la pagina. Navega a `http://localhost:4200/`. La aplicación se volverá a cargar automáticamente si cambia alguno de los archivos de origen.

## Generar Componentes

Run `ng generate component component-name` para generar un nuevo componente.Tambien puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, use `ng help` o visite el  [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Notas sobre comceptos

## Promesas
- Trabajan con un único flujo de datos
- Se usan con una única data asíncrona de respuesta
- No es muy simple de cancelar

## Observables
- Trabajan con un flujo continuo de datos
- Al fallar puedes ejecutar comandos y reintentar continuar con el observer
- Se pueden encadenar operadores potentes como el retry() o el replay()
- Pueden ser creados desde otras fuentes, como los eventos
- Son funciones a las cuales podemos suscribirnos en míltiples lugares
