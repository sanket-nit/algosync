import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Marketing from "./pages/marketing/Marketing";
import Navbar from "./components/Navbar";
import AuthLayout from "./pages/_auth/AuthLayout";
import SigninForm from "./pages/_auth/forms/SigninForm";
import SignupForm from "./pages/_auth/forms/SignupForm";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <main className="h-screen pt-10">
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Marketing />} />
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Route>
            {/* Private Routes */}
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
