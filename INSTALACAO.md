# 📦 Guia de Instalação - ERP Marketing

## Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm instalado
- Git instalado

## 🚀 Instalação Rápida

### 1. Clonar o Repositório

```bash
git clone https://github.com/tecnologia1spb/marketing-app.git
cd marketing-app
```

### 2. Instalar Dependências

```bash
# Usando npm
npm install

# OU usando pnpm (recomendado)
pnpm install
```

### 3. Iniciar Servidor de Desenvolvimento

```bash
# Usando npm
npm run dev

# OU usando pnpm
pnpm dev
```

O aplicativo estará disponível em: **http://localhost:5173**

## 🏗️ Build para Produção

```bash
# Usando npm
npm run build

# OU usando pnpm
pnpm build
```

Os arquivos de produção estarão na pasta `dist/`

## 📁 Estrutura do Projeto

```
marketing-app/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── fornecedores/
│   │   │   ├── indicadores/
│   │   │   └── tarefas/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── types/         # Tipos TypeScript
│   │   ├── data/          # Dados mockados
│   │   ├── App.tsx        # Componente principal
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Estilos globais
│   └── index.html         # HTML principal
├── package.json           # Dependências
├── vite.config.ts         # Configuração Vite
├── tsconfig.json          # Configuração TypeScript
├── tailwind.config.ts     # Configuração Tailwind
└── README.md              # Documentação
```

## ⚙️ Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter

## 🔧 Solução de Problemas

### Erro ao instalar dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Porta 5173 já em uso

Edite `vite.config.ts` e altere a porta:

```typescript
server: {
  port: 3000, // Altere para a porta desejada
}
```

## 📝 Próximos Passos

1. Explore as páginas: Dashboard, Fornecedores, Métricas e Tarefas
2. Customize os dados em `client/src/data/mockData.ts`
3. Adicione novos componentes conforme necessário
4. Integre com sua API backend

## 🆘 Suporte

Para problemas ou dúvidas, abra uma issue no GitHub:
https://github.com/tecnologia1spb/marketing-app/issues

