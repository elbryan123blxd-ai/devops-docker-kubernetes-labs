# 💡 ¿Qué es un Contenedor?

A diferencia de las máquinas virtuales (VM), que incluyen un sistema operativo completo ("invitado") encima del host, los contenedores **comparten el núcleo (kernel) del sistema operativo del host**. Esto los hace significativamente más ligeros, rápidos y eficientes.

### Diferencias Clave
*   **Virtualización de Hardware (VM):** Cada VM tiene su propio SO completo. Pesadas, lento arranque y requieren muchos recursos.
*   **Virtualización de SO (Contenedores):** Los contenedores aislan procesos mediante características nativas del kernel de Linux (como cgroups y namespaces). Son ligeros, inician en milisegundos y consumen pocos recursos.

---

## 🏗️ Los Pilares de Docker

1.  **Imágenes (Images):** Es el "plano" o plantilla inmutable de solo lectura. Contiene el código, las dependencias y las instrucciones necesarias para crear un contenedor.
2.  **Contenedores (Containers):** Es la instancia en ejecución de una imagen. Es un proceso aislado que vive y muere según su ciclo de vida.
3.  **Dockerfile:** Un archivo de texto simple con instrucciones paso a paso para construir una imagen de Docker personalizada.
4.  **Registro (Docker Hub/Registry):** El repositorio donde se almacenan y comparten las imágenes, similar a lo que es GitHub para el código fuente.

---

## 🚀 ¿Por qué usar Contenedores?

*   **Consistencia ("Funciona en mi máquina"):** Al empaquetar todo lo necesario, se elimina la variabilidad entre entornos de desarrollo, pruebas y producción.
*   **Portabilidad:** Un contenedor empaquetado en una laptop con Linux puede ejecutarse sin cambios en un servidor en la nube o en un entorno on-premise.
*   **Escalabilidad:** Debido a su ligereza, puedes iniciar o detener cientos de contenedores en segundos, facilitando arquitecturas de microservicios.
*   **Aislamiento:** Cada aplicación vive en su propio entorno, evitando conflictos de versiones de bibliotecas entre distintas aplicaciones en el mismo servidor.

---
# Trabajando con containers
* haremos nuestro hello word pero en containers usando la imagen busybox
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0bc311ca-77ac-474e-8373-c524e6087a62" />
aca docker creo un container con la imagen busybox(la descargo porque no la tenia) con el mensaje "Hello World"
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5d9b8137-ed90-41cf-bac4-114726284a61" />

* si revisamos con docker ps -a veremos nuestro contenedor que su mision fue enviar el mensaje y morir :C
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0fb880fa-cea0-4e60-bb9d-97f2a6015a37" />

* si queremos ver que un container no se muera como otro y mas bien que este trabajando para mantener un servidor corriendo con : docker run nginx , solo terminara la ejecucion cuando apretemos las teclas ctrl + C
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3260cebd-b98e-46ad-afb2-8e50fcfdaa49" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9d2076e5-1b7e-4ef6-b757-26d9c5c9bb3e" />

* Tambien lo podemos enlazar a un host para verlo en nuestro internet con el comando docker run -p 8080:80 nginx
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4651d9e3-5a3b-4806-9c2e-7f9aa2d708e1" />
* y si abrimos otro terminal para ver el contenido dandole curl localhost:8080 nos saldra su contenido
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e4d77243-1f03-4719-884e-c6c0ebab9f14" />
* o en mi internet
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a838e8f7-020d-46c5-b949-02f02956250d" />

* y cada vez que envio una peticion sale en el comando de docker que alguien dio una peticion para entrar
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5b83b065-84c2-4610-b484-5e8a98c800de" />

*podemos crear un container con nuestro nombre tambien , y con el comando -d no se quede pegado en la terminal,sino que siga funcionando siempre:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1f1c1069-2fa1-4524-b04c-7583a46f0c4b" />
como veran el container todavia esta vivo , no se muere porque la tarea no finaliza

*si le doy a docker ps -a veremos todos los containers , los que murieron y los que estan vivo
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/64e2f1b2-49de-4cf1-a2f0-e052064ccd9c" />

* Para eliminar los container solo usas el docker rm ...seguido del id del container
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e1f90991-9877-443d-a2f3-7fb14fc60fb0" />

* Como dato adicional puedes entrar a un ccontainer para ver mejor su contenido con el comando: docker exec -it (id del container) --bash

*los container son propenso a morir facilmente, asi que si un container se muere tendrias que armarlo tu otra vez , que chevere seria que exista una plataforma de codigo abierto que orqueste y maneje contenedores de forma mas automatizada verdad???...v.erdad?
