import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import FornecedorFiltros from '../components/fornecedores/FornecedorFiltros';
import FornecedorKanban from '../components/fornecedores/FornecedorKanban';
import { pedidosMock } from '../data/mockData';
import type { FiltrosFornecedor, Pedido } from '../types';

export default function Fornecedores() {
  const [pedidos, setPedidos] = useState(pedidosMock);
  const [filtros, setFiltros] = useState<FiltrosFornecedor>({
    grupoFornecedor: [],
    statusPedido: []
  });

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (filtros.statusPedido.length > 0 && !filtros.statusPedido.includes(pedido.status)) {
      return false;
    }
    if (filtros.grupoFornecedor.length > 0 && !filtros.grupoFornecedor.includes(pedido.grupoFornecedor)) {
      return false;
    }
    return true;
  });

  const handleStatusChange = (pedidoId: string, novoStatus: Pedido['status']) => {
    setPedidos(prev => 
      prev.map(p => p.id === pedidoId ? { ...p, status: novoStatus } : p)
    );
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Fornecedores</h1>
          <p className="text-gray-500 mt-1">Gerencie agências, freelancers e parceiros</p>
        </div>

        <FornecedorFiltros onFilterChange={setFiltros} />
        <FornecedorKanban 
          pedidos={pedidosFiltrados}
          onStatusChange={handleStatusChange}
        />
      </div>
    </DashboardLayout>
  );
}

