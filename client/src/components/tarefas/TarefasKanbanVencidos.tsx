import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, Calendar, User } from 'lucide-react';

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  responsavel?: string;
  dataVencimento: string;
  status: 'a_fazer' | 'em_progresso' | 'concluidas' | 'vencidos';
  etiqueta?: string;
  prioridade?: 'alta' | 'media' | 'baixa';
}

interface TarefasKanbanProps {
  tarefas: Tarefa[];
  onTarefaClick?: (tarefa: Tarefa) => void;
  onStatusChange?: (tarefaId: string, novoStatus: Tarefa['status']) => void;
  autoMoverVencidas?: boolean;
}

const TarefasKanbanVencidos: React.FC<TarefasKanbanProps> = ({ 
  tarefas, 
  onTarefaClick,
  onStatusChange,
  autoMoverVencidas = true
}) => {
  const [tarefasAtualizadas, setTarefasAtualizadas] = useState<Tarefa[]>(tarefas);
  const [tarefaArrastando, setTarefaArrastando] = useState<string | null>(null);

  // Verificar e mover tarefas vencidas automaticamente
  useEffect(() => {
    if (autoMoverVencidas) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const tarefasProcessadas = tarefas.map(tarefa => {
        const dataVencimento = new Date(tarefa.dataVencimento);
        dataVencimento.setHours(0, 0, 0, 0);

        // Se a tarefa não está concluída e está vencida, mover para "vencidos"
        if (tarefa.status !== 'concluidas' && dataVencimento < hoje) {
          return { ...tarefa, status: 'vencidos' as const };
        }
        return tarefa;
      });

      setTarefasAtualizadas(tarefasProcessadas);
    } else {
      setTarefasAtualizadas(tarefas);
    }
  }, [tarefas, autoMoverVencidas]);

  const colunas = [
    {
      id: 'a_fazer' as const,
      titulo: 'A Fazer',
      cor: '#64748b',
      icone: Clock,
      corFundo: '#f1f5f9'
    },
    {
      id: 'em_progresso' as const,
      titulo: 'Em Progresso',
      cor: '#2563eb',
      icone: Clock,
      corFundo: '#dbeafe'
    },
    {
      id: 'vencidos' as const,
      titulo: 'Vencidos',
      cor: '#dc2626',
      icone: XCircle,
      corFundo: '#fee2e2'
    },
    {
      id: 'concluidas' as const,
      titulo: 'Concluídas',
      cor: '#16a34a',
      icone: CheckCircle,
      corFundo: '#d1fae5'
    }
  ];

  const getTarefasPorStatus = (status: Tarefa['status']) => {
    return tarefasAtualizadas.filter(t => t.status === status);
  };

  const handleDragStart = (tarefaId: string) => {
    setTarefaArrastando(tarefaId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Tarefa['status']) => {
    if (tarefaArrastando && onStatusChange) {
      onStatusChange(tarefaArrastando, status);
      
      // Atualizar localmente
      setTarefasAtualizadas(prev => 
        prev.map(t => t.id === tarefaArrastando ? { ...t, status } : t)
      );
    }
    setTarefaArrastando(null);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calcularDiasVencidos = (dataVencimento: string): number => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const vencimento = new Date(dataVencimento);
    vencimento.setHours(0, 0, 0, 0);
    const diffTime = hoje.getTime() - vencimento.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calcularDiasRestantes = (dataVencimento: string): number => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const vencimento = new Date(dataVencimento);
    vencimento.setHours(0, 0, 0, 0);
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const estaVencida = (dataVencimento: string, status: Tarefa['status']): boolean => {
    if (status === 'concluidas') return false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const vencimento = new Date(dataVencimento);
    vencimento.setHours(0, 0, 0, 0);
    return vencimento < hoje;
  };

  return (
    <div className="kanban-container">
      {/* Resumo de Tarefas */}
      <div className="resumo-tarefas">
        <div className="resumo-item">
          <Clock size={20} />
          <span>A Fazer</span>
          <strong>{getTarefasPorStatus('a_fazer').length}</strong>
        </div>
        <div className="resumo-item">
          <Clock size={20} color="#2563eb" />
          <span>Em Progresso</span>
          <strong>{getTarefasPorStatus('em_progresso').length}</strong>
        </div>
        <div className="resumo-item alerta">
          <XCircle size={20} color="#dc2626" />
          <span>Vencidos</span>
          <strong>{getTarefasPorStatus('vencidos').length}</strong>
        </div>
        <div className="resumo-item">
          <CheckCircle size={20} color="#16a34a" />
          <span>Concluídas</span>
          <strong>{getTarefasPorStatus('concluidas').length}</strong>
        </div>
      </div>

      {/* Kanban */}
      <div className="kanban-colunas">
        {colunas.map(coluna => {
          const tarefasColuna = getTarefasPorStatus(coluna.id);
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
                <span className="contador-tarefas" style={{ backgroundColor: coluna.cor }}>
                  {tarefasColuna.length}
                </span>
              </div>

              <div className="kanban-cards">
                {tarefasColuna.map(tarefa => {
                  const diasVencidos = calcularDiasVencidos(tarefa.dataVencimento);
                  const diasRestantes = calcularDiasRestantes(tarefa.dataVencimento);
                  const vencida = estaVencida(tarefa.dataVencimento, tarefa.status);

                  return (
                    <div
                      key={tarefa.id}
                      className={`kanban-card ${tarefaArrastando === tarefa.id ? 'arrastando' : ''} ${vencida ? 'card-vencido' : ''}`}
                      draggable
                      onDragStart={() => handleDragStart(tarefa.id)}
                      onClick={() => onTarefaClick?.(tarefa)}
                    >
                      <div className="card-header-info">
                        {tarefa.etiqueta && (
                          <span className="etiqueta">{tarefa.etiqueta}</span>
                        )}
                        {tarefa.prioridade && (
                          <span className={`badge-prioridade prioridade-${tarefa.prioridade}`}>
                            {tarefa.prioridade === 'alta' ? 'Alta' : 
                             tarefa.prioridade === 'media' ? 'Média' : 'Baixa'}
                          </span>
                        )}
                      </div>

                      <h4 className="card-titulo">{tarefa.titulo}</h4>
                      <p className="card-descricao">{tarefa.descricao}</p>

                      <div className="card-footer">
                        {tarefa.responsavel && (
                          <div className="info-responsavel">
                            <User size={14} />
                            <span>{tarefa.responsavel}</span>
                          </div>
                        )}

                        <div className={`info-data ${vencida ? 'data-vencida' : ''}`}>
                          <Calendar size={14} />
                          <span>{formatarData(tarefa.dataVencimento)}</span>
                        </div>
                      </div>

                      {/* Alertas de vencimento */}
                      {coluna.id === 'vencidos' && (
                        <div className="alerta-vencimento">
                          <AlertCircle size={16} />
                          <span>Vencido há {diasVencidos} {diasVencidos === 1 ? 'dia' : 'dias'}</span>
                        </div>
                      )}

                      {coluna.id !== 'vencidos' && coluna.id !== 'concluidas' && vencida && (
                        <div className="alerta-vencimento">
                          <AlertCircle size={16} />
                          <span>Vencido há {diasVencidos} {diasVencidos === 1 ? 'dia' : 'dias'}</span>
                        </div>
                      )}

                      {coluna.id !== 'vencidos' && coluna.id !== 'concluidas' && !vencida && diasRestantes <= 3 && (
                        <div className="alerta-proximo-vencimento">
                          <Clock size={16} />
                          <span>Vence em {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {tarefasColuna.length === 0 && (
                  <div className="coluna-vazia">
                    <p>Nenhuma tarefa {coluna.titulo.toLowerCase()}</p>
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

        .resumo-tarefas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .resumo-item {
          background: white;
          padding: 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .resumo-item.alerta {
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        .resumo-item span {
          flex: 1;
          font-size: 14px;
          color: #6b7280;
        }

        .resumo-item strong {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
        }

        .kanban-colunas {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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

        .contador-tarefas {
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
        }

        .kanban-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .kanban-card.arrastando {
          opacity: 0.5;
          cursor: grabbing;
        }

        .kanban-card.card-vencido {
          border-left: 4px solid #dc2626;
          background: #fef2f2;
        }

        .card-header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .etiqueta {
          background: #dbeafe;
          color: #1e40af;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge-prioridade {
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

        .card-descricao {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .card-footer {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
        }

        .info-responsavel,
        .info-data {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .info-data.data-vencida {
          color: #dc2626;
          font-weight: 600;
        }

        .alerta-vencimento {
          margin-top: 12px;
          padding: 8px;
          background: #fee2e2;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #dc2626;
        }

        .alerta-proximo-vencimento {
          margin-top: 12px;
          padding: 8px;
          background: #fef3c7;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #92400e;
        }

        .coluna-vazia {
          padding: 40px 20px;
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
        }

        @media (max-width: 1400px) {
          .kanban-colunas {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .kanban-colunas {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TarefasKanbanVencidos;

