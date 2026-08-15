# devops-docker-kubernetes-labs
Laboratorios y configuraciones prácticas utilizando Docker, Kubernetes y orquestación de contenedores.
## diagramas
<img width="1600" height="1204" alt="image" src="https://github.com/user-attachments/assets/3197568e-eb35-4381-8333-0a8d8f1c0327" />
<img width="1024" height="772" alt="image" src="https://github.com/user-attachments/assets/1c7d9b6b-7d7e-4881-9078-21e08cccca24" />


* este trabajo tendra:
* aplicacion web con frontend, api y worker
* infraestructura como codigo en servicios de aws :   VPC , ECR , EKS, RDS
* pipeline CI/CD , todo el proceso desde un push en maquina local hasta produccion en la nube



## documentacion de trabajo

---

## Dia 1:
#### documentacion de servicios AWS IaC , main , outputs y variables 

---

#### VPC ( el terreno ):
* main:
<img width="1024" height="576" alt="image" src="https://github.com/user-attachments/assets/f7c31c50-1b24-4de5-a6e1-1f8989641f5b" />
<img width="1024" height="576" alt="image" src="https://github.com/user-attachments/assets/06be9b58-17a7-4615-9f54-cff62d28316d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/31b1e1d0-e4df-4915-81b5-e255562b8e4b" />

* outputs:
<img width="1920" height="1080" alt="Captura de pantalla (6448)" src="https://github.com/user-attachments/assets/7c1383bb-4b9d-4f8a-ac31-bb684f4d81c2" />

* variables:
<img width="1920" height="1080" alt="Captura de pantalla (6450)" src="https://github.com/user-attachments/assets/5f8ba908-37b3-4f50-bbec-a06cdcf27082" />

---

#### RDS (la base de datos madre):
* main:
<img width="1920" height="1080" alt="Captura de pantalla (6461)" src="https://github.com/user-attachments/assets/c68d92f4-2f58-4d57-acb6-ec25f2087896" />
<img width="1920" height="1080" alt="Captura de pantalla (6464)" src="https://github.com/user-attachments/assets/bc92aa26-2304-402e-8612-ea7033278ea3" />

* outputs:
<img width="1920" height="1080" alt="Captura de pantalla (6466)" src="https://github.com/user-attachments/assets/05b3acca-0003-47ae-805a-9199312ba65c" />

* variables:
<img width="1920" height="1080" alt="Captura de pantalla (6467)" src="https://github.com/user-attachments/assets/0035fb80-c919-46de-8590-87f516c4c666" />

---

#### ECR ( EL DOCKER HUB EN AWS):
* main:
<img width="1920" height="1080" alt="Captura de pantalla (6472)" src="https://github.com/user-attachments/assets/df33b4c2-7a7b-4dca-8d06-79ff76b8f228" />

* outputs:
<img width="1920" height="1080" alt="Captura de pantalla (6474)" src="https://github.com/user-attachments/assets/8af83af1-ab0a-4c76-b61e-4a1ba16bfd9e" />

* variables:
<img width="1920" height="1080" alt="Captura de pantalla (6475)" src="https://github.com/user-attachments/assets/6dc74e62-45df-47e4-9195-e219abf7e421" />

---

### EKS ( el cerebro orquestador) :
* main
<img width="1920" height="1080" alt="Captura de pantalla (6480)" src="https://github.com/user-attachments/assets/bf74c893-2533-436a-9392-b3680ffcbc3e" />

* outputs
<img width="1920" height="1080" alt="Captura de pantalla (6481)" src="https://github.com/user-attachments/assets/3cc71e7b-6c62-47a0-a224-a1752da0515f" />

* variables
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/eb97b01e-1578-45f8-818b-6839fe682df1" />


---

## Errores que comet
* deje mi base de datos en publico , nunca hacer esto , cualquier IP podria conectarse
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1d74da83-2c19-4527-a650-9149593fba7c" />


* hardcodear , en main de eks , aca pongo las variables correctamente y el main
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5c8ac929-0872-40a8-9ef9-badff619655c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/935c7b06-8830-4a26-a576-41db2db7a145" />

## Dia 2:
### kubernetes 
* este si fue dificil , me costo pero creo que lo entendi , a continuacion los servicios de aws

#### deployments:

##### API:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/999caffc-489b-4144-adab-d22825966e5c" />

---

##### AUTH:
<img width="1920" height="1080" alt="Captura de pantalla (6602)" src="https://github.com/user-attachments/assets/304a4e16-b60b-444d-8306-976df83d1b42" />

---

#####  FRONTEND:
<img width="1920" height="1080" alt="Captura de pantalla (6603)" src="https://github.com/user-attachments/assets/e50a02e9-877e-4aef-a5b9-4a7cbaea2349" />

#### Services:

##### ingres-nginx:
<img width="1920" height="1080" alt="Captura de pantalla (6609)" src="https://github.com/user-attachments/assets/30b0a40d-0d87-495e-9f63-07f305452e48" />

##### Internal:
<img width="1920" height="1080" alt="Captura de pantalla (6611)" src="https://github.com/user-attachments/assets/2fff52b3-d50a-4c08-bed0-e9b73b3f1cc3" />

### Circle CI
* archivo config.yaml de circle ci:
<img width="1920" height="1080" alt="Captura de pantalla (6625)" src="https://github.com/user-attachments/assets/94f2a49c-bbdb-4a2f-92c5-01134dfb6681" />
