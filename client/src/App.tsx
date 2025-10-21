import Home from './pages/Home';
import Fornecedores from './pages/Fornecedores';
import Metricas from './pages/Metricas';
import Tarefas from './pages/Tarefas';

function App() {
  // Simple routing based on pathname
  const path = window.location.pathname;

  if (path === '/fornecedores') return <Fornecedores />;
  if (path === '/metricas') return <Metricas />;
  if (path === '/tarefas') return <Tarefas />;
  
  return <Home />;
}

export default App;

