import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Calendar, User, DollarSign } from 'lucide-react';

interface Pedido {
  id: string;
  titulo: string;
  fornecedor: string;
  descricao: string;
  valor: number;
  dataInicio: string;
  dataEntrega: string;
  responsavel?: string;
  status: 'em_andamento' | 'atrasados' | 'concluidos';
  prioridade?: 'alta' | 'media' | 'baixa';
}

interface FornecedorKanbanProps {
  pedidos: Pedido[];
  onPedidoClick?: (pedido: Pedido) => void;
  onStatusChange?: (pedidoId: string, novoStatus: Pedido['status']) => void;
}

const FornecedorKanban: React.FC<FornecedorKanbanProps> = ({ 
  pedidos, 
  onPedidoClick,
  onStatusChange 
}) => {
  const [pedidoArrastando, setPedidoArrastando] = useState<string | null>(null);

  const colunas = [
    {
      id: 'em_andamento' as const,
      titulo: 'Em Andamento',
      cor: '#2563eb',
      icone: Clock,
      corFundo: '#dbeafe'
    },
    {
      id: 'atrasados' as const,
      titulo: 'Atrasados',
      cor: '#dc2626',
      icone: AlertCircle,
      corFundo: '#fee2e2'
    },
    {
      id: 'concluidos' as const,
      titulo: 'Concluídos',
      cor: '#16a34a',
      icone: CheckCircle,
      corFundo: '#d1fae5'
    }
  ];

  const getPedidosPorStatus = (status: Pedido['status']) => {
    return pedidos.filter(p => p.status === status);
  };

  const handleDragStart = (pedidoId: string) => {
    setPedidoArrastando(pedidoId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Pedido['status']) => {
    if (pedidoArrastando && onStatusChange) {
      onStatusChange(pedidoArrastando, status);
    }
    setPedidoArrastando(null);
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calcularDiasRestantes = (dataEntrega: string) => {
    const hoje = new Date();
    const entrega = new Date(dataEntrega);
    const diffTime = entrega.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="kanban-container">
      <div className="kanban-colunas">
        {colunas.map(coluna => {
          const pedidosColuna = getPedidosPorStatus(coluna.id);
          const IconeColuna = coluna.icone;

          return (
            <div 
              key={coluna.id}
              className="kanban-coluna"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(coluna.id)}
            >
              <div 
                className="kanban-coluna-header"
                style={{ backgroundColor: coluna.corFundo }}
              >
                <div className="header-titulo">
                  <IconeColuna size={20} color={coluna.cor} />
                  <h3 style={{ color: coluna.cor }}>{coluna.titulo}</h3>
                </div>
                <span className="contador-pedidos" style={{ backgroundColor: coluna.cor }}>
                  {pedidosColuna.length}
                </span>
              </div>

              <div className="kanban-cards">
                {pedidosColuna.map(pedido => {
                  const diasRestantes = calcularDiasRestantes(pedido.dataEntrega);
                  const estaAtrasado = diasRestantes < 0;

                  return (
                    <div
                      key={pedido.id}
                      className={`kanban-card ${pedidoArrastando === pedido.id ? 'arrastando' : ''}`}
                      draggable
                      onDragStart={() => handleDragStart(pedido.id)}
                      onClick={() => onPedidoClick?.(pedido)}
                    >
                      {pedido.prioridade && (
                        <div className={`badge-prioridade prioridade-${pedido.prioridade}`}>
                          {pedido.prioridade === 'alta' ? 'Alta' : 
                           pedido.prioridade === 'media' ? 'Média' : 'Baixa'}
                        </div>
                      )}

                      <h4 className="card-titulo">{pedido.titulo}</h4>
                      <p className="card-fornecedor">{pedido.fornecedor}</p>
                      <p className="card-descricao">{pedido.descricao}</p>

                      <div className="card-info">
                        <div className="info-item">
                          <DollarSign size={14} />
                          <span>{formatarMoeda(pedido.valor)}</span>
                        </div>

                        <div className="info-item">
                          <Calendar size={14} />
                          <span className={estaAtrasado ? 'data-atrasada' : ''}>
                            {formatarData(pedido.dataEntrega)}
                          </span>
                        </div>

                        {pedido.responsavel && (
                          <div className="info-item">
                            <User size={14} />
                            <span>{pedido.responsavel}</span>
                          </div>
                        )}
                      </div>

                      {coluna.id === 'em_andamento' && (
                        <div className={`dias-restantes ${estaAtrasado ? 'atrasado' : ''}`}>
                          {estaAtrasado 
                            ? `${Math.abs(diasRestantes)} dias de atraso`
                            : `${diasRestantes} dias restantes`
                          }
                        </div>
                      )}
                    </div>
                  );
                })}

                {pedidosColuna.length === 0 && (
                  <div className="coluna-vazia">
                    <p>Nenhum pedido {coluna.titulo.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .kanban-container {
          width: 100%;
          padding: 20px;
          background: #f9fafb;
        }

        .kanban-colunas {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          min-height: 500px;
        }

        .kanban-coluna {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .kanban-coluna-header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(0, 0, 0, 0.05);
        }

        .header-titulo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-titulo h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .contador-pedidos {
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }

        .kanban-cards {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 400px;
        }

        .kanban-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px;
          cursor: grab;
          transition: all 0.2s;
          position: relative;
        }

        .kanban-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .kanban-card.arrastando {
          opacity: 0.5;
          cursor: grabbing;
        }

        .badge-prioridade {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .prioridade-alta {
          background: #fee2e2;
          color: #991b1b;
        }

        .prioridade-media {
          background: #fef3c7;
          color: #92400e;
        }

        .prioridade-baixa {
          background: #e0e7ff;
          color: #3730a3;
        }

        .card-titulo {
          margin: 0 0 8px 0;
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.4;
        }

        .card-fornecedor {
          margin: 0 0 8px 0;
          font-size: 13px;
          font-weight: 500;
          color: #2563eb;
        }

        .card-descricao {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .info-item svg {
          color: #9ca3af;
        }

        .data-atrasada {
          color: #dc2626;
          font-weight: 600;
        }

        .dias-restantes {
          margin-top: 12px;
          padding: 8px;
          background: #f0f9ff;
          border-radius: 6px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #0369a1;
        }

        .dias-restantes.atrasado {
          background: #fef2f2;
          color: #dc2626;
        }

        .coluna-vazia {
          padding: 40px 20px;
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .kanban-colunas {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FornecedorKanban;

