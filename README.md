# Painel de Produtos

Este é um painel de gestão de produtos com frontend em 
**Next.js (TypeScript) e backend em **Node,js + PostreSQL**, hospedado no **Vercel** (frontend) e **Raiway** (backend).

A aplicação permite:
- adicionar; 
- editar e 
- excluir produtos com upload de imagem real.

##  Acesso ao projeto
- **Frontend (online):** https://painel-produtos-zaply.vercel.app  
- **Repositório GitHub:** https://github.com/VittorioBarella/painel-produtos-zaply

---

## Tecnologias Utilizadas

### Frontend:
- **Next.js (TypeScript):** escolha ideal para projetos escaláveis com SSR (server-side rendering).
- **Bootstrap:** usado para estrutura responsiva e componentes rápidos.
- **Axios:** para chamadas HTTP com melhor controle e interceptação.
- **Toastify:** feedback visual moderno ao usuário.

### Backend:
- **Node.js + Express:** leve, rápido e de fácil manutenção para API REST.
- **PostgreSQL:** banco de dados robusto e confiável, conectado via `pg`.
- **Multer:** para upload de imagens reais.
- **Railway:** usado como serviço de deploy backend gratuito e prático.
- **Vercel:** usado como serviço de deploy para o front gratuito e prático.
- **.env:** separação das variáveis de ambiente.

##  Por que essa estrutura?

Iniciei o projeto com **dados estáticos** para focar primeiro na interface e na experiência visual. Depois disso, integrei dinamicamente com backend e banco de dados, garantindo que todas as funcionalidades estivessem operando corretamente.  
Alguns trechos do código possuem **comentários explicativos** para facilitar o entendimento por parte de quem for analisar o projeto.

---

##  Como rodar o projeto localmente

### Requisitos:
- Node.js
- PostgreSQL local (ou crie uma instância no Railway)

### Passos:

```bash
# Clone o repositório
git clone https://github.com/VittorioBarella/painel-produtos-zaply.git

# Acesse os diretórios
cd painel-produtos-zaply

# Backend
cd backend
npm install
# Configure o arquivo .env com suas credenciais
node server.js

# Frontend
cd ../frontend
npm install
# Crie um arquivo .env.local com:
# NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev

## Testando a API com o Postman

Este projeto acompanha uma collection do Postman para testes completos de CRUD.

1. Importe o arquivo `ProdutosZaplyAPI.postman_collection.json` no Postman.
2. Teste os endpoints `GET`, `POST`, `PUT` e `DELETE`.
3. Certifique-se de que a variável de ambiente `NEXT_PUBLIC_API_URL` está apontando para o backend correto (Railway).

