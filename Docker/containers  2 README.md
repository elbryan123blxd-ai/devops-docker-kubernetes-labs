# Container 2 ( volumenes , enlazado)

## ¿Qué es un Volumen?

Un volumen es un mecanismo diseñado para persistir los datos generados y utilizados por los contenedores de Docker. A diferencia del almacenamiento efímero del contenedor, el volumen reside fuera del ciclo de vida de este, permitiendo que la información sobreviva a reinicios, actualizaciones o eliminaciones de los contenedores.

## Beneficios Principales

*   **Persistencia de Datos:** Los datos (como bases de datos, logs o archivos de configuración) se mantienen intactos aunque el contenedor sea eliminado.
*   **Gestión del Ciclo de Vida:** Facilita la separación entre la lógica de la aplicación (contenedor) y la información (volumen), permitiendo actualizar la imagen del contenedor sin riesgo de perder datos.
*   **Compartición de Datos:** Permite que múltiples contenedores accedan y compartan el mismo conjunto de datos de forma simultánea.
*   **Rendimiento:** Los volúmenes ofrecen un mejor rendimiento de I/O (entrada/salida) en comparación con el almacenamiento dentro del sistema de archivos de escritura del contenedor, especialmente en entornos de desarrollo local en Windows o macOS.

## Caso de Uso Típico

Un ejemplo clásico es el despliegue de bases de datos como **MySQL, PostgreSQL o MongoDB**. Si ejecutamos una base de datos sin un volumen, cualquier registro nuevo insertado se borrará al apagar el contenedor. Al montar un volumen, los archivos de la base de datos se almacenan de manera persistente en el host, garantizando la integridad de la información a largo plazo.

### Trabajando con docker en vs code

* como mencione antes los volumenes son persistentes y no dependen de que un container este vivo , un volumen se puede asignar a multiples contenedores
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d13a5704-ee55-4d84-8bd8-cae686a8c004" />

*  para eliminar un volumen usamos docker volume rm (nombre del volume)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5c54e5d4-e620-46ef-9606-aa8396ba431a" />

### montando volumenes en mis containers
* como les mencione el volumen es independiente al container , le asignaremos un volumen a un container a continuacion:

* volvemos a crear un volumen y lo ponemos en un container
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/46fedcd9-9bd6-4eec-bf7c-f556913ee830" />
* como observaran cree un volumen primero y lo asigne al container para que corra el el puerto de mi computadora 8080 y se linkee al puerto de mi container 80 con la imagen nginx

* ahora con el comando docker exec -it (id del container) bash   lo que se conseguira sera inspeccionar, depurar y entender por dentro lo que está pasando en un entorno aislado
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1e0cd621-5231-4e09-87b4-2b67ee2bdd9d" />

* puedo hacer cosas como crear archivos txt dentro  , procedemos a salir
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6aab949e-8550-4805-a78e-eb8452c0ebdc" />

* para matar un container le tenemos que dar docker stop y luego docker rm  , porque recuerden el contenedor esta corriendo actualmente
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0bf6af2f-d513-4b21-811d-55a8cfd3a512" />

* Lo que hice actualmente fue levantar otro contenedor con el volume que cree , y si entramos a este nuevo  container tambien tiene el archivo que deje creadoo , ¿por que pasa esto? pues como les dije los volumenes son persistentes a diferencia de los containers que son fragiles
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3a8dbee5-2418-4d98-916a-1681de6704ed" />

markdown_content = """
# Enlazando Contenedores en Docker

En el ecosistema de Docker, es frecuente que necesites que diferentes contenedores interactúen entre sí, como una aplicación web conectándose a una base de datos. Para lograr esta comunicación directa y privada, Docker proporciona la funcionalidad de **enlace**.

## ¿Qué es `--link`?

La bandera `--link` permite que un contenedor descubra y se comunique de forma segura con otro contenedor. Al establecer este enlace, Docker crea una ruta de comunicación directa, permitiendo que el segundo contenedor resuelva el nombre del primero como un nombre de host.

### Ejemplo práctico: Comunicación con Redis

Para enlazar dos contenedores, el proceso estándar es:

1.  **Lanzar el contenedor destino:**
    ```bash
    docker run -d --name myredis redis
    ```
    Aquí, iniciamos un contenedor llamado `myredis` basado en la imagen de Redis.

2.  **Lanzar el contenedor cliente:**
    ```bash
    docker run -it --link myredis:redis redis-cli -h redis
    ```
### trabajando:
*creamos un container con la imagen redis
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c839ff3f-7256-44ec-b0f0-57d0c9e53343" />

* luego lanzamos  docker run -it --link myredis redis redis-cli -h myredis  para lanzar un contenedor que se conecta con el servidor
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d5d2583d-f6f5-4f8f-933a-ca3b31788b82" />
* pregunta ... porque quiero enlazar todo si lo puedo hacer todo en el contenedor principal ... al inicio trabajar en un contenedor se ve facil , el problema viene cuando la app crece y vienen los problemas como que el mantenimiento , que tus contenedores mueren por sobrecaarga, o quieres escalar solo container , etc , hacer esto hace que organizemos bien nuestro trabajo para que escale bien

* si revisamos el estado de los containers salen los 2 vivos
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c540165a-78c4-4f9a-8168-f513b0683643" />

* pero si salimos del container que tenemos de redis , el contenedor morira :c pues su tarea termino
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c700e91d-db60-4ab0-8607-9d3cf371f383" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/89d2a555-906f-4e30-b637-4d2d6eb0684c" />
