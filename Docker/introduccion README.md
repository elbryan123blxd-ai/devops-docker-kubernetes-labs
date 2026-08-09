# ¿Qué es Docker?

Docker es una plataforma de código abierto diseñada para empaquetar aplicaciones y todas sus dependencias en **contenedores** ligeros y estandarizados.

Esto permite que cualquier software se ejecute de forma rápida y confiable en cualquier entorno —ya sea en tu laptop, en un servidor de pruebas o en la nube— sin preocuparse por diferencias en el sistema operativo o configuraciones previas.

## Imágenes y Contenedores

Para entender Docker, es fundamental diferenciar estos dos conceptos clave:

### 1. Imágenes (Images)
Una **imagen** es una plantilla de solo lectura que contiene el código de la aplicación, las bibliotecas, las dependencias, las variables de entorno y los archivos de configuración necesarios para ejecutar una aplicación.

*   **Analogía:** Imagina que es como un **molde** de una receta o un **plano** de construcción.
*   **Características:** Son inmutables (no cambian). Se utilizan para crear contenedores.

### 2. Contenedores (Containers)
Un **contenedor** es una instancia ejecutable de una imagen. Es el entorno aislado donde realmente se ejecuta tu aplicación.

*   **Analogía:** Si la imagen es el molde, el contenedor es el **pastel** que horneas con él. Puedes hornear muchos pasteles (contenedores) a partir de un mismo molde (imagen).
*   **Características:** Son ligeros, portátiles y se pueden iniciar, detener, mover o eliminar fácilmente.


# Comandos basicos de Linux
readme_content = """# Comandos Básicos de Linux 🐧

Una guía rápida con los comandos esenciales de Linux organizada por categorías para consultar y copiar fácilmente en cualquier repositorio.

---

## 📂 Navegación y Gestión de Archivos

| Descripción | Comando |
| :--- | :--- |
| Mostrar el directorio actual | `pwd` |
| Listar archivos y directorios | `ls -la` |
| Cambiar de directorio | `cd [ruta]` |
| Crear un directorio | `mkdir [nombre]` |
| Copiar archivos o carpetas | `cp [origen] [destino]` |
| Mover o renombrar archivos | `mv [origen] [destino]` |
| Eliminar archivos o carpetas | `rm -rf [nombre]` |

---

## 📄 Lectura y Edición de Archivos

| Descripción | Comando |
| :--- | :--- |
| Ver el contenido de un archivo | `cat [archivo]` |
| Ver archivo por páginas | `less [archivo]` |
| Editar un archivo | `nano [archivo]` |
| Buscar texto | `grep "texto" [archivo]` |

---

## 🔐 Permisos y Usuarios

| Descripción | Comando |
| :--- | :--- |
| Cambiar permisos | `chmod 755 [archivo]` |
| Cambiar propietario | `chown usuario:grupo [archivo]` |
| Ejecutar como administrador | `sudo [comando]` |

---

## ⚡ Procesos y Sistema

| Descripción | Comando |
| :--- | :--- |
| Ver procesos activos | `ps aux` |
| Monitor en tiempo real | `top` |
| Terminar un proceso | `kill [PID]` |
| Espacio en disco | `df -h` |

---

## 🌐 Redes

| Descripción | Comando |
| :--- | :--- |
| Comprobar conectividad | `ping [dominio_o_ip]` |
| Descargar archivo | `curl -O [URL]` |
| Configuración de red | `ip a` |

"""


# Trabajando con docker
debemos tener las siguientes cosas:

* Tener instalado docker desktop

* Tener vs code

* Tener ganas de aprender

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/62b5941d-465e-4332-97af-35fafec18d06" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b0df55aa-b2a9-48b9-b238-204a801f68a2" />

* Para descargar imagenes podemos ir a docker hub ,por ejemplo una imagen de python
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/143027c7-e04e-4a0a-8f93-c903de3c7f52" />

* recuerda tener cuidado con las imagenes raras sin verificacion, evitar descargar esas como consejo de seguridad:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dcda3c48-26b9-479e-a172-391cd19828cf" />

* Le damos a pull para a atraer imagen
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/85c5e568-0f1f-4930-960a-b9e2a83be29d" />

* Si le damos al comando docker imagen inspect ...... seguido de la imagen que descargaste , saldra toda la informacion de la imagen
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5dbce882-8cc4-4679-a7b9-2aaefe637494" />

* Para evitar mandar captura les pasare los comandos de docker que se usan mas en la parte de imagenes
  ## 🏗️ Gestión de Imágenes
* **Listar imágenes:** `docker images`
* **Construir imagen:** `docker build -t <nombre> .`
* **Descargar imagen:** `docker pull <nombre>`
* **Subir imagen:** `docker push <nombre>`
* **Eliminar imagen:** `docker rmi <id-imagen>`
* **Limpiar imágenes sin uso:** `docker image prune`
* **Etiquetar imagen:** `docker tag <origen> <destino>`
* **Guardar imagen a .tar:** `docker save -o <archivo.tar> <imagen>`
* **Cargar imagen desde .tar:** `docker load -i <archivo.tar>`




