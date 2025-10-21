import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FornecedorFiltrosProps {
  onFilterChange: (filters: FiltrosFornecedor) => void;
}

interface FiltrosFornecedor {
  grupoFornecedor: string[];
  statusPedido: string[];
}

const FornecedorFiltros: React.FC<FornecedorFiltrosProps> = ({ onFilterChange }) => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<FiltrosFornecedor>({
    grupoFornecedor: [],
    statusPedido: []
  });

  const gruposFornecedor = [
    { id: 'agencia', label: 'Agência' },
    { id: 'fornecedor', label: 'Fornecedor' },
    { id: 'plataforma', label: 'Plataforma' },
    { id: 'freelancer', label: 'Freelancer' },
    { id: 'parceiro', label: 'Parceiro' }
  ];

  const statusPedidos = [
    { id: 'em_andamento', label: 'Em Andamento', cor: 'blue' },
    { id: 'atrasados', label: 'Atrasados', cor: 'red' },
    { id: 'concluidos', label: 'Concluídos', cor: 'green' }
  ];

  const toggleFiltro = (tipo: 'grupoFornecedor' | 'statusPedido', valor: string) => {
    const novosFiltros = { ...filtrosSelecionados };
    const index = novosFiltros[tipo].indexOf(valor);
    
    if (index > -1) {
      novosFiltros[tipo].splice(index, 1);
    } else {
      novosFiltros[tipo].push(valor);
    }
    
    setFiltrosSelecionados(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosVazios = {
      grupoFornecedor: [],
      statusPedido: []
    };
    setFiltrosSelecionados(filtrosVazios);
    onFilterChange(filtrosVazios);
  };

  const contadorFiltrosAtivos = 
    filtrosSelecionados.grupoFornecedor.length + 
    filtrosSelecionados.statusPedido.length;

  return (
    <div className="filtros-fornecedor">
      <button 
        className="btn-filtro"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      >
        <Filter size={20} />
        <span>Filtros</span>
        {contadorFiltrosAtivos > 0 && (
          <span className="badge-filtros">{contadorFiltrosAtivos}</span>
        )}
        <ChevronDown 
          size={16} 
          className={`icone-expandir ${mostrarFiltros ? 'rotacionado' : ''}`}
        />
      </button>

      {mostrarFiltros && (
        <div className="painel-filtros">
          <div className="filtro-secao">
            <h4>Grupo de Fornecedor</h4>
            <div className="filtro-opcoes">
              {gruposFornecedor.map(grupo => (
                <label key={grupo.id} className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={filtrosSelecionados.grupoFornecedor.includes(grupo.id)}
                    onChange={() => toggleFiltro('grupoFornecedor', grupo.id)}
                  />
                  <span>{grupo.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filtro-secao">
            <h4>Status de Pedidos</h4>
            <div className="filtro-opcoes">
              {statusPedidos.map(status => (
                <label key={status.id} className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={filtrosSelecionados.statusPedido.includes(status.id)}
                    onChange={() => toggleFiltro('statusPedido', status.id)}
                  />
                  <span className={`status-label status-${status.cor}`}>
                    {status.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="filtro-acoes">
            <button className="btn-limpar" onClick={limparFiltros}>
              Limpar Filtros
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .filtros-fornecedor {
          position: relative;
          margin-bottom: 20px;
        }

        .btn-filtro {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-filtro:hover {
          background: #f5f5f5;
          border-color: #2563eb;
        }

        .badge-filtros {
          background: #2563eb;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .icone-expandir {
          transition: transform 0.2s;
        }

        .icone-expandir.rotacionado {
          transform: rotate(180deg);
        }

        .painel-filtros {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
          min-width: 300px;
        }

        .filtro-secao {
          margin-bottom: 20px;
        }

        .filtro-secao:last-of-type {
          margin-bottom: 0;
        }

        .filtro-secao h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1f2937;
        }

        .filtro-opcoes {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filtro-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .filtro-checkbox:hover {
          background: #f9fafb;
        }

        .filtro-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .filtro-checkbox span {
          font-size: 14px;
          color: #374151;
        }

        .status-label {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
        }

        .status-label.status-blue {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-label.status-red {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-label.status-green {
          background: #d1fae5;
          color: #065f46;
        }

        .filtro-acoes {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .btn-limpar {
          width: 100%;
          padding: 8px 16px;
          background: #f3f4f6;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          transition: background 0.2s;
        }

        .btn-limpar:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default FornecedorFiltros;

