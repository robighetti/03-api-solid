# App

GymPass style app.

## RFs (Requisitos funcionais) 

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter o perfil de um usuário logado
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado
- [ ] Deve ser possivel o usuário obter seu historico de check-ins
- [ ] Deve ser possivel o usuário buscar academias proximas
- [ ] Deve ser possivel o usuário buscar academias pelo nome
- [ ] Deve ser possivel o usuário realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuário
- [ ] Deve ser possivel cadastrar uma academia

## RNs (Regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100mts) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identicado por um token JWT