# 🧪 Testes Automatizados de API - Banco Digital

Este repositório contém a suíte de testes automatizados para a API de serviços bancários (Login e Transferência), desenvolvida em **Node.js** utilizando **SuperTest**, **Mocha/Assert** e gerador de relatórios **Mochawesome**.

O projeto foi construído seguindo os padrões da indústria de garantia de qualidade, utilizando a metodologia **AAA (Arrange, Act, Assert)** e arquitetura modularizada com **Fixtures** e **Helpers**.

---

## 📁 Estrutura do Projeto

```text
banco-api-test/
├── fixtures/              # Massa de dados estática em formato JSON
│   ├── postLogin.json
│   └── postTransferencia.json
├── helpers/               # Funções utilitárias e regras de negócio reutilizáveis
│   └── autenticacao.js    # Lógica de obtenção de token de autenticação
├── mochawesome-report/    # Relatórios visuais gerados após a execução dos testes
│   └── mochawesome.html
├── test/                  # Suítes de testes automatizados
│   ├── login.test.js
│   └── transferencia.test.js
├── .env                   # Variáveis de ambiente (URLs e credenciais)
├── .gitignore             # Arquivos ignorados pelo Git
└── package.json           # Dependências e scripts de execução
