import type { Pedido, Tarefa, StatusEntrega, Metrica } from '../types';

export const pedidosMock: Pedido[] = [
  {
    id: '1',
    titulo: 'Criação de Campanha Meta Ads - Black Friday',
    fornecedor: 'Agência Criativa Digital',
    grupoFornecedor: 'agencia',
    descricao: 'Desenvolvimento de 5 criativos estáticos e 3 vídeos para campanha de Black Friday nas redes sociais',
    valor: 8000,
    dataInicio: '2024-11-01',
    dataEntrega: '2024-11-25',
    responsavel: 'João Silva',
    status: 'em_andamento',
    prioridade: 'alta'
  },
  {
    id: '2',
    titulo: 'Impressão de Banners para Evento',
    fornecedor: 'Gráfica Rápida Print',
    grupoFornecedor: 'fornecedor',
    descricao: 'Impressão de 10 banners roll-up para evento de lançamento de produto',
    valor: 1500,
    dataInicio: '2024-11-10',
    dataEntrega: '2024-11-18',
    responsavel: 'Maria Santos',
    status: 'atrasados',
    prioridade: 'alta'
  },
  {
    id: '3',
    titulo: 'Produção de Vídeo Institucional',
    fornecedor: 'Produtora Eventos Premium',
    grupoFornecedor: 'agencia',
    descricao: 'Gravação e edição de vídeo institucional de 2 minutos para site e redes sociais',
    valor: 12000,
    dataInicio: '2024-10-15',
    dataEntrega: '2024-11-05',
    responsavel: 'Pedro Costa',
    status: 'concluidos',
    prioridade: 'media'
  }
];

export const tarefasMock: Tarefa[] = [
  {
    id: '1',
    titulo: 'Responder leads qualificados',
    descricao: 'Entrar em contato com 3 leads potenciais vindos da campanha de Google Ads',
    responsavel: 'Maria Santos',
    dataVencimento: '2024-11-16',
    status: 'a_fazer',
    etiqueta: 'Média',
    prioridade: 'alta'
  },
  {
    id: '2',
    titulo: 'Editar vídeo Reels Corrida 10K',
    descricao: 'Finalizar edição do vídeo teaser para campanha da Corrida 10K',
    responsavel: 'Pedro Costa',
    dataVencimento: '2024-11-24',
    status: 'em_progresso',
    etiqueta: 'Média',
    prioridade: 'media'
  }
];

export const statusEntregasMock: StatusEntrega = {
  total: 45,
  noPrazo: 32,
  atrasadas: 5,
  concluidas: 28,
  emAndamento: 12
};

export const metricasMock: Metrica[] = [
  {
    data: '2024-11-13',
    metrica: 'Visitantes Site',
    valor: 5600,
    unidade: 'visitas',
    fonte: 'Google Analytics'
  },
  {
    data: '2024-11-11',
    metrica: 'Taxa de Conversão',
    valor: 68,
    unidade: 'porcentagem',
    fonte: 'Google Ads'
  }
];

