export interface Pedido {
  id: string;
  titulo: string;
  fornecedor: string;
  grupoFornecedor: 'agencia' | 'fornecedor' | 'plataforma' | 'freelancer' | 'parceiro';
  descricao: string;
  valor: number;
  dataInicio: string;
  dataEntrega: string;
  responsavel?: string;
  status: 'em_andamento' | 'atrasados' | 'concluidos';
  prioridade?: 'alta' | 'media' | 'baixa';
}

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  responsavel?: string;
  dataVencimento: string;
  status: 'a_fazer' | 'em_progresso' | 'concluidas' | 'vencidos';
  etiqueta?: string;
  prioridade?: 'alta' | 'media' | 'baixa';
}

export interface StatusEntrega {
  total: number;
  noPrazo: number;
  atrasadas: number;
  concluidas: number;
  emAndamento: number;
}

export interface Indicador {
  id: string;
  titulo: string;
  valor: number | string;
  unidade?: string;
  variacao?: number;
  meta?: number;
  tipo: 'positivo' | 'negativo' | 'neutro';
  icone: string;
  cor: string;
}

export interface FiltrosFornecedor {
  grupoFornecedor: string[];
  statusPedido: string[];
}

export interface Metrica {
  data: string;
  metrica: string;
  valor: number;
  unidade: string;
  fonte: string;
}

