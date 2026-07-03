import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import QuemSomos from './pages/QuemSomos'
import Produtos from './pages/Produtos'
import FoodService from './pages/FoodService'
import Varejo from './pages/Varejo'
import Calculadora from './pages/Calculadora'
import SejaCliente from './pages/SejaCliente'
import AreaCliente from './pages/AreaCliente'
import Contato from './pages/Contato'
import AdminLogin from './pages/admin/AdminLogin'
import AdminImagens from './pages/admin/AdminImagens'
import RepresentanteComercial from './pages/RepresentanteComercial'
import TrabalheConosco from './pages/TrabalheConosco'
import CentralAtendimento from './pages/CentralAtendimento'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Site público ─────────────────────────── */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quem-somos" element={<QuemSomos />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="food-service" element={<FoodService />} />
          <Route path="varejo" element={<Varejo />} />
          <Route path="calculadora" element={<Calculadora />} />
          <Route path="seja-cliente" element={<SejaCliente />} />
          <Route path="area-cliente" element={<AreaCliente />} />
          <Route path="contato" element={<Contato />} />
          <Route path="representante-comercial" element={<RepresentanteComercial />} />
          <Route path="trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="central-atendimento" element={<CentralAtendimento />} />
        </Route>

        {/* ── Painel administrativo ─────────────────── */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/imagens" element={<AdminImagens />} />
      </Routes>
    </BrowserRouter>
  )
}
