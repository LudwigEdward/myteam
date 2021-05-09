# MyTeam
 Meu Time é um projeto colaborativo com o objetivo de informar a infraestrutura e grande parte das trâmites do maior e mais popular esporte do mundo.
## Alunos
- Luís Eduardo
- Alex Gabriel
- José Vitor

##	:rocket: Iniciando ( Recomendado )
```
//no seu terminal
**cd backend**
// recomendamos baixar a imagem do postgres para utilizar-lo em um container docker
docker run postgres
// apos a imagem do docker baixar, crie o container para o banco
docker run --name postgres -p 5432:5432 -ev POSTGRES_PASSWORD=docker -d postgres
// aqui é basicamente a criação do container com o nome postgres, redirecionando a porta 5432 do container para a porta 5432 da sua máquina, passando a senha do banco e informando a imagem a ser utilizada
// após o container ser criado
docker start postgres
yarn
yarn start
```
Após Iniciado o banco basta abrir o index.html dentro de web e realizar as consultas / gravações.
