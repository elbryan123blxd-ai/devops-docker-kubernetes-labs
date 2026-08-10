# Introducción a Dockerfile

## ¿Qué es un Dockerfile?

Un **Dockerfile** es un documento de texto plano que contiene todas las instrucciones necesarias para construir una **imagen de Docker**. Imagínalo como una "receta" o un manual de instrucciones paso a paso que le dice a Docker cómo ensamblar tu aplicación, incluyendo su entorno, dependencias, configuraciones y el comando para iniciarla.

Al utilizar un Dockerfile, garantizas que tu aplicación se ejecute exactamente de la misma manera en cualquier máquina, eliminando el clásico problema de *"¡pero en mi máquina sí funciona!"*.

## Conceptos Clave

El Dockerfile utiliza una sintaxis sencilla basada en comandos llamados **instrucciones**. Aquí tienes las más comunes:

*   **`FROM`**: Define la imagen base sobre la cual construirás tu entorno (ej. `node:18`, `python:3.11`, `alpine`).
*   **`WORKDIR`**: Establece el directorio de trabajo dentro del contenedor.
*   **`COPY` / `ADD`**: Transfiere archivos desde tu máquina local al sistema de archivos del contenedor.
*   **`RUN`**: Ejecuta comandos durante el proceso de construcción (ideal para instalar paquetes o dependencias).
*   **`EXPOSE`**: Documenta qué puerto escuchará el contenedor en tiempo de ejecución.
*   **`CMD` / `ENTRYPOINT`**: Define el comando que se ejecutará automáticamente cuando el contenedor se inicie.

## Flujo de Trabajo Básico

1.  **Crear**: Escribes el `Dockerfile` en la raíz de tu proyecto.
2.  **Construir**: Ejecutas el comando de construcción para generar la imagen:
    ```bash
    docker build -t nombre-de-tu-imagen .
    ```
3.  **Ejecutar**: Creas y ejecutas un contenedor basado en esa imagen:
    ```bash
    docker run -p 8080:80 nombre-de-tu-imagen
    ```

## Ventajas de usar Dockerfiles

*   **Portabilidad**: La aplicación corre igual en desarrollo, testing y producción.
*   **Automatización**: Todo el proceso de instalación es código, lo que facilita la integración continua (CI/CD).
*   **Aislamiento**: Cada contenedor tiene su propio entorno, evitando conflictos entre versiones de librerías.
*   **Eficiencia**: Docker utiliza un sistema de capas que permite reutilizar partes de la imagen, haciendo que las actualizaciones sean mucho más rápidas.

---
*Para aprender más, visita la [documentación oficial de Docker](https://docs.docker.com/).*

## Trabajando con dockerfile
por ahora lo dejare aca ya casi son las 10 tengo sueño y mañana me tengo que levantar , debe preparan comida para mis hermanos y estudiar temprano, mañana con fuerzas en el repo de AWS vamos
