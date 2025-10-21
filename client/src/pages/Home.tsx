import DashboardLayout from '../components/DashboardLayout';
import { Package, BarChart3, CheckSquare, TrendingUp } from 'lucide-react';

export default function Home() {
  const cards = [
    {
      title: 'Fornecedores',
      description: 'Gerencie pedidos e acompanhe status',
      icon: Package,
      link: '/fornecedores',
      color: 'blue'
    },
    {
      title: 'Métricas',
      description: 'Indicadores e performance de entregas',
      icon: BarChart3,
      link: '/metricas',
      color: 'green'
    },
    {
      title: 'Tarefas',
      description: 'Organize tarefas com Kanban',
      icon: CheckSquare,
      link: '/tarefas',
      color: 'purple'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao ERP Marketing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.link}
                href={card.link}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  card.color === 'blue' ? 'bg-blue-100' :
                  card.color === 'green' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <Icon size={24} className={`${
                    card.color === 'blue' ? 'text-blue-600' :
                    card.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {card.description}
                </p>
              </a>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={32} />
            <h2 className="text-2xl font-bold">Sistema ERP Marketing</h2>
          </div>
          <p className="text-blue-100 max-w-2xl">
            Gerencie fornecedores, acompanhe métricas de performance e organize tarefas em um único lugar.
            Utilize os filtros avançados e o sistema Kanban para otimizar seu fluxo de trabalho.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

