# ERP Marketing

Sistema de gestão integrada para equipes de marketing digital.

## 🚀 Funcionalidades

### 1. Gestão de Fornecedores
- **Filtros avançados** por grupo de fornecedor e status de pedidos
- **Kanban de pedidos** com drag & drop
- Colunas: Em Andamento, Atrasados, Concluídos
- Indicadores de dias restantes e atrasos

### 2. Indicadores de Performance
- Dashboard com status de entregas
- Métricas de performance em tempo real
- Visualização de total de entregas, no prazo, atrasadas e em andamento

### 3. Gestão de Tarefas
- **Kanban com 4 colunas**: A Fazer, Em Progresso, **Vencidos**, Concluídas
- **Movimentação automática** de tarefas vencidas
- Alertas visuais de vencimento
- Drag & drop entre status

## 🛠️ Tecnologias

- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- Wouter (routing)

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/tecnologia1spb/marketing-app.git

# Instalar dependências
cd marketing-app
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

## 🎯 Estrutura do Projeto

```
client/
  src/
    components/
      fornecedores/     # Componentes de gestão de fornecedores
      indicadores/      # Componentes de indicadores
      tarefas/          # Componentes de gestão de tarefas
    pages/              # Páginas da aplicação
    types/              # Tipos TypeScript
    data/               # Dados mockados
```

## 📝 Licença

Desenvolvido para uso interno.

---

**Versão:** 1.0.0  
**Data:** 21 de Outubro de 2024

