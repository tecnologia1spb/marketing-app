import DashboardLayout from '../components/DashboardLayout';
import IndicadoresEntregas from '../components/indicadores/IndicadoresEntregas';
import { statusEntregasMock, metricasMock } from '../data/mockData';

export default function Metricas() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <IndicadoresEntregas statusEntregas={statusEntregasMock} />

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            Métricas Recentes
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Métrica</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Valor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Unidade</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fonte</th>
                </tr>
              </thead>
              <tbody>
                {metricasMock.map((metrica, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(metrica.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {metrica.metrica}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-blue-600">
                      {metrica.valor.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {metrica.unidade}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {metrica.fonte}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

