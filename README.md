# Beta
Repositório para o armazenamento do projeto Beta, com Next.JS e Node.JS

## Descrição

O projeto é destinado para a apresentação de habilidades técnicas baseadas no desenvolvimento de uma aplicação CRUD, utilizando React (Next.JS) com Node.JS.

## Como executar

Faça o clone deste repositório utilizando o comando

```
$ git clone https://github.com/juniopereirab/Beta
```

Em seguida, acesse a pasta do projeto com:

```
$ cd Beta
```

Abra um segundo terminal e certifique-se que está dentro da pasta Beta/

Acesse a pasta /frontend e instale as dependencias utilizando o comando em um dos terminais abertos:
```
$ cd frontend
$ npm install
```

Acesse a pasta /backend e instale as dependencias utilizando o comando em um dos terminais abertos:
```
$ cd backend
$ npm install
```

Para executar o projeto, iniciando pelo Backend, é necessário rodar, na pasta raiz do projeto:

```
$ docker-compose up --build
```

Para executar o frontend, é necessário acessar a pasta /frontend, e executar o comando:

```
$ npm run dev
```

Caso não tenha o Docker instalado, é possível executar o Backend acessando a pasta /backend e executando o comando:
```
$ npm run dev
```

Obs.: Lembre-se de instalar as dependências antes de executar o projeto. Para esse projeto foi utilizado o Node v20.


## Funcionalidades

Nesse projeto é possível:

1. Realizar cadastro de usuario
2. Realizar login (autenticação) do usuário.
3. Listagem de produtos
4. Ordenação de produtos
5. Filtragem de produtos (feitos atráves da API)
6. Visualização de detalhes do projeto
7. Criação de produtos
8. Deleção de produtos
9. Edição de produtos

Obs.: É possível que ao executar o projeto, o banco de dados esteja indisponível visto que foi utilizado um banco hospedado na nuvem.