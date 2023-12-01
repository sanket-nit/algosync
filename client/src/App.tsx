import { Route, Routes } from 'react-router-dom'
import AppLayout from './pages/layout/AppLayout'
import AuthLayout from './pages/auth/AuthLayout'
import SigninForm from './pages/auth/forms/SigninForm'
import SignupForm from './pages/auth/forms/SignupForm'
import Home from './pages/home/Home'
import Marketing from './pages/marketing/Marketing'
import RequireAuth from './pages/layout/RequireAuth'
import CodeEditor from './pages/codeEditor/CodeEditor'
import PersistLogin from './pages/layout/PersistLogin'
import VisualiserLayout from './pages/visualiser/VisualiserLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          {/* public routes */}
          <Route path='/' element={<Marketing />} />
          <Route element={<AuthLayout />}>
            <Route path='/signin' element={<SigninForm />} />
            <Route path='/signup' element={<SignupForm />} />
          </Route>
        </Route>

        {/* Private Routes */}
        <Route element={<AppLayout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/home' element={<Home />} />
              <Route path='/visualiser' element={<VisualiserLayout />} />
              <Route path='/editor' element={<CodeEditor />} />
            </Route>
          </Route>
        </Route>

        {/* Catch all */}
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
