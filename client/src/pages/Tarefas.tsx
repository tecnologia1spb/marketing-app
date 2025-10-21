import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import TarefasKanbanVencidos from '../components/tarefas/TarefasKanbanVencidos';
import { tarefasMock } from '../data/mockData';
import type { Tarefa } from '../types';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState(tarefasMock);

  const handleStatusChange = (tarefaId: string, novoStatus: Tarefa['status']) => {
    setTarefas(prev => 
      prev.map(t => t.id === tarefaId ? { ...t, status: novoStatus } : t)
    );
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Tarefas</h1>
          <p className="text-gray-500 mt-1">Organize e acompanhe suas tarefas</p>
        </div>

        <TarefasKanbanVencidos 
          tarefas={tarefas}
          onStatusChange={handleStatusChange}
          autoMoverVencidas={true}
        />
      </div>
    </DashboardLayout>
  );
}

