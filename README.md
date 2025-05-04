# Painel de Produtos

Este é um painel de gestão de produtos com frontend em **Next.js (TypeScript)** e backend em **Node.js + PostgreSQL**, hospedado no **Vercel** (frontend) e **Railway** (backend).

A aplicação permite:
- Adicionar produtos com imagem
- Editar e excluir produtos
- Upload de imagem real com preview

---

## 🔗 Acesso ao Projeto

- **Frontend (online):** https://painel-produtos-vittorios-projects-eaa54a5f.vercel.app  
- **Repositório GitHub:** https://github.com/VittorioBarella/product-dashboard

---

## ⚙️ Tecnologias Utilizadas

### Frontend
- **Next.js (TypeScript)**
- **Bootstrap**
- **Axios**
- **Toastify**

### Backend
- **Node.js + Express**
- **PostgreSQL (via `pg`)**
- **Multer** (upload de imagens)
- **Railway** (deploy backend)
- **Vercel** (deploy frontend)
- **dotenv** (variáveis de ambiente)

---

## 🧠 Por que essa estrutura?

O projeto foi iniciado com dados estáticos para validar a interface e experiência do usuário. Após isso, foi realizada a integração com backend e banco de dados, garantindo uma experiência completa e real de CRUD (Create, Read, Update, Delete).  
Trechos do código contêm **comentários explicativos** para facilitar a compreensão por outros desenvolvedores.

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js
- PostgreSQL local (ou Railway)

### Passos

```bash
# Clone o repositório
git clone https://github.com/VittorioBarella/product-dashboard.git

# Acesse os diretórios
cd product-dashboard

# Backend
cd backend
npm install

# Configure o arquivo .env com:
# PORT=5000
# DATABASE_URL=URL do PostgreSQL local ou Railway
node server.js

# Frontend
cd ../frontend
npm install

# Crie um arquivo .env.local com:
# NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
