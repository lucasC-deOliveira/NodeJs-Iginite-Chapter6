# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro


**RN**
Não deve ser possivel cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuario responsavel pelo cadastro deve ser um usuario administrado


# Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponiveis.
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
Deve ser possivel listar todos os carros disponiveis pelo nome do carro.


**RN**
O usuario não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possivel listar todas as especificações 
Deve ser possivel   listar todos os carros

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro.
O usuario responsavel pelo cadastro deve ser um usuario administrado.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carros   

**RNF**
Utilizar o multer para upload dos arquivos


**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuario responsavel pelo cadastro deve ser um usuario administrado.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro






### Comandos uteis do docker
docker ps : mostra uma lista de todos os containers disponiveis em execução
docker ps -a : mostra uma lista de todos os containers disponiveis inclusive os parados
docker rm <id do container> : remove o container
docker start <id do container> : inicia o container
docker stop <id do container> : para o container

docker-compose up -d : executa os serviços com reload em background
docker-compose down : remove todos os serviços
docker-compose stop : para todos os serviços

docker exec -it exec <nome do container> : acessa o container => pra sair "CTRL D"
docker logs <nome do container> : mostra os logs
docker logs <nome do container> -f : fica observando os logs


### Comandos TypeORM 
yarn typeorm migration:create -n nomeDaMigration            => criar migration
yarn typeorm migration:run                                  => executar migration


### jest Comandos
yarn jest --init  Configurar o jest