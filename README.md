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

<<<<<<< HEAD
## Dia 2:
### kubernetes 
* este si fue dificil , me costo pero creo que lo entendi , a continuacion los servicios de aws

#### deployments:

##### API:
=======
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

## AWS
* Llego el momento de la verdad, levantare los servidore en aws , espero no se caiga nada
### errores del codigo
* era inevitable ,al parecer al errores en mi infraestructura
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ee806b93-4a68-4cad-b795-1344aa99a9f1" />
* al final fue un problema de versionamiento de los nodos del cluster de eks
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7b1bea9d-3e35-46f1-87e0-a22e456cc936" />
* ahora si podemos lanzar
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/67520684-f6cc-4f30-83c2-75c8f46986f1" />

* no le di a commit changes , para hacerles un resumen le pedi a opencode que me de mejores practicas de seguridad , como agregar archivos al gitignore o agregarle archivos nuevos a mis kubernetes por motivos de buenas practicas , ademas que configuro algunos puertos
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6a37260d-a1ec-4ef2-9374-1fc873687ed4" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2eae5baa-5ad2-4674-a02a-9534311685e7" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1c3c12a6-e851-4472-985b-b1d44c6d7eac" />

## Automatizacion pipeline
* puse mis credenciales a github  y circle CI para crear repositorios y empezar el CI/CD de prueba , pero al fallar las pruebas no me dejaba
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/54d1006d-05fd-4b41-aecd-b0874b6883a8" />

* ahora si estaba en otra rama
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/36d2aa09-9fd0-4650-adf3-1ce5cb7a7041" />
* mi proyecto sigue fallando , ya  voy aca 3 horas :C
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/720118b8-f3e5-4255-9166-417f9f80f476" />
* creo que encontre la causa , tenia dos ramas
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0868f387-202c-4e36-862f-6cfc11cbcc64" />

* encontre el problema , el opencode habrio otra subcarpeta y mis pusheos no llegaban
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/662472e7-0f86-4e0b-9525-3752b19ce6af" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2f1da262-55b8-4893-a226-2af93b935f24" />

* ahora el opencode corrige raices
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/484620b1-003e-430a-ab8d-6e22752fbc97" />

* mis pipelies estan corriendo
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/64a95b5c-e306-4902-a37d-193904a02a9e" />

* pero estan fallando , el opencode esta auditando
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/60c462a2-06bb-4935-9fbe-654f1a1fd7d4" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ea265183-fa3d-4f87-810d-bec1a8a8dfe7" />

* faltan los pods de mi app EKS , para que lo entiendanmi ECR ya cargo , lo unico que falta esque cargue para mi Kubernetes tambien
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ac9f2219-7971-40c6-92c0-e9bf64cac3d7" />

* agregando Helm  en el archivo main de IaC, aca le damos credenciales para poder comunicarse con EKS
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c5bc58ea-92a5-48ad-b356-96290ca22559" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/06335c41-2304-4c03-8d5f-2e72481104f3" />


* luego le damos la indicacion de que instale paquetes a los EKS para produccion
<img width="1024" height="576" alt="image" src="https://github.com/user-attachments/assets/5a673937-75a9-47a6-a154-d0840c2d01a4" />

* agregamos tambien un OIDC en circle CI , esto nos permitira mayor seguridad pues usara un pase temporal que dura unos minutos , asi evitamos q se filtren mis llaves
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fbe277ed-6afe-4e47-a46a-0d62a3e168a0" />


* Configuramos circle CI para que solo tenga PRIVILEGIOS MINIMOS para que solo pueda pushear las imagenes a ECR Y actualizar servidores de EKS por un tiempo temporal
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1b0cc084-f7fd-4a30-9c60-2771b4869b98" />
