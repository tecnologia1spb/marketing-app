import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Users,
  Target,
  Calendar
} from 'lucide-react';

interface Indicador {
  id: string;
  titulo: string;
  valor: number | string;
  unidade?: string;
  variacao?: number;
  meta?: number;
  tipo: 'positivo' | 'negativo' | 'neutro';
  icone: React.ElementType;
  cor: string;
}

interface StatusEntrega {
  total: number;
  noPrazo: number;
  atrasadas: number;
  concluidas: number;
  emAndamento: number;
}

interface IndicadoresEntregasProps {
  statusEntregas: StatusEntrega;
  indicadoresCustomizados?: Indicador[];
}

const IndicadoresEntregas: React.FC<IndicadoresEntregasProps> = ({ 
  statusEntregas,
  indicadoresCustomizados = []
}) => {
  const calcularPercentual = (valor: number, total: number): number => {
    return total > 0 ? Math.round((valor / total) * 100) : 0;
  };

  const indicadoresPrincipais: Indicador[] = [
    {
      id: 'total_entregas',
      titulo: 'Total de Entregas',
      valor: statusEntregas.total,
      tipo: 'neutro',
      icone: Package,
      cor: '#6366f1'
    },
    {
      id: 'entregas_prazo',
      titulo: 'Entregas no Prazo',
      valor: statusEntregas.noPrazo,
      unidade: `${calcularPercentual(statusEntregas.noPrazo, statusEntregas.total)}%`,
      tipo: 'positivo',
      icone: CheckCircle,
      cor: '#16a34a'
    },
    {
      id: 'entregas_atrasadas',
      titulo: 'Entregas Atrasadas',
      valor: statusEntregas.atrasadas,
      unidade: `${calcularPercentual(statusEntregas.atrasadas, statusEntregas.total)}%`,
      tipo: 'negativo',
      icone: AlertTriangle,
      cor: '#dc2626'
    },
    {
      id: 'em_andamento',
      titulo: 'Em Andamento',
      valor: statusEntregas.emAndamento,
      tipo: 'neutro',
      icone: Clock,
      cor: '#2563eb'
    }
  ];

  const todosIndicadores = [...indicadoresPrincipais, ...indicadoresCustomizados];

  const renderIconeVariacao = (variacao: number) => {
    if (variacao > 0) {
      return <TrendingUp size={16} className="icone-variacao positivo" />;
    } else if (variacao < 0) {
      return <TrendingDown size={16} className="icone-variacao negativo" />;
    }
    return null;
  };

  const formatarVariacao = (variacao: number): string => {
    const sinal = variacao > 0 ? '+' : '';
    return `${sinal}${variacao}%`;
  };

  return (
    <div className="indicadores-container">
      <div className="indicadores-header">
        <h2>Indicadores de Performance</h2>
        <p className="subtitulo">Acompanhe o desempenho e status de entregas</p>
      </div>

      <div className="indicadores-grid">
        {todosIndicadores.map(indicador => {
          const Icone = indicador.icone;
          const percentualMeta = indicador.meta 
            ? calcularPercentual(Number(indicador.valor), indicador.meta)
            : null;

          return (
            <div key={indicador.id} className="indicador-card">
              <div className="card-header">
                <div 
                  className="icone-container"
                  style={{ backgroundColor: `${indicador.cor}20` }}
                >
                  <Icone size={24} color={indicador.cor} />
                </div>
                {indicador.variacao !== undefined && (
                  <div className={`variacao ${indicador.variacao >= 0 ? 'positiva' : 'negativa'}`}>
                    {renderIconeVariacao(indicador.variacao)}
                    <span>{formatarVariacao(indicador.variacao)}</span>
                  </div>
                )}
              </div>

              <div className="card-conteudo">
                <h3 className="indicador-titulo">{indicador.titulo}</h3>
                <div className="valor-container">
                  <span className="valor-principal" style={{ color: indicador.cor }}>
                    {indicador.valor}
                  </span>
                  {indicador.unidade && (
                    <span className="unidade">{indicador.unidade}</span>
                  )}
                </div>

                {indicador.meta && (
                  <div className="meta-container">
                    <div className="meta-barra">
                      <div 
                        className="meta-progresso"
                        style={{ 
                          width: `${Math.min(percentualMeta || 0, 100)}%`,
                          backgroundColor: indicador.cor
                        }}
                      />
                    </div>
                    <span className="meta-texto">
                      Meta: {indicador.meta} ({percentualMeta}%)
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="status-entregas-detalhado">
        <h3>Status Detalhado de Entregas</h3>
        <div className="status-grid">
          <div className="status-item">
            <div className="status-header">
              <CheckCircle size={20} color="#16a34a" />
              <span>Concluídas</span>
            </div>
            <div className="status-valor">{statusEntregas.concluidas}</div>
            <div className="status-percentual" style={{ color: '#16a34a' }}>
              {calcularPercentual(statusEntregas.concluidas, statusEntregas.total)}% do total
            </div>
          </div>

          <div className="status-item">
            <div className="status-header">
              <Clock size={20} color="#2563eb" />
              <span>Em Andamento</span>
            </div>
            <div className="status-valor">{statusEntregas.emAndamento}</div>
            <div className="status-percentual" style={{ color: '#2563eb' }}>
              {calcularPercentual(statusEntregas.emAndamento, statusEntregas.total)}% do total
            </div>
          </div>

          <div className="status-item">
            <div className="status-header">
              <AlertTriangle size={20} color="#dc2626" />
              <span>Atrasadas</span>
            </div>
            <div className="status-valor">{statusEntregas.atrasadas}</div>
            <div className="status-percentual" style={{ color: '#dc2626' }}>
              {calcularPercentual(statusEntregas.atrasadas, statusEntregas.total)}% do total
            </div>
          </div>

          <div className="status-item">
            <div className="status-header">
              <Package size={20} color="#6366f1" />
              <span>No Prazo</span>
            </div>
            <div className="status-valor">{statusEntregas.noPrazo}</div>
            <div className="status-percentual" style={{ color: '#6366f1' }}>
              {calcularPercentual(statusEntregas.noPrazo, statusEntregas.total)}% do total
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .indicadores-container {
          padding: 24px;
          background: #f9fafb;
        }

        .indicadores-header {
          margin-bottom: 24px;
        }

        .indicadores-header h2 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
        }

        .subtitulo {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .indicadores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .indicador-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .indicador-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .icone-container {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .variacao {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .variacao.positiva {
          background: #d1fae5;
          color: #065f46;
        }

        .variacao.negativa {
          background: #fee2e2;
          color: #991b1b;
        }

        .card-conteudo {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .indicador-titulo {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
        }

        .valor-container {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .valor-principal {
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
        }

        .unidade {
          font-size: 16px;
          font-weight: 600;
          color: #6b7280;
        }

        .meta-container {
          margin-top: 12px;
        }

        .meta-barra {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .meta-progresso {
          height: 100%;
          transition: width 0.3s ease;
        }

        .meta-texto {
          font-size: 12px;
          color: #6b7280;
        }

        .status-entregas-detalhado {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .status-entregas-detalhado h3 {
          margin: 0 0 20px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .status-item {
          padding: 16px;
          background: #f9fafb;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }

        .status-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .status-valor {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .status-percentual {
          font-size: 13px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .indicadores-grid {
            grid-template-columns: 1fr;
          }

          .status-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default IndicadoresEntregas;

