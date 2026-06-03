import "./App.css";
import Layout from "./components/layout/Layout";
import AuthProvider from "./components/context/AuthContext/AuthProvider";
import UserProvider from "./components/context/AmountContext/UserProvider";
function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="app">
          <Layout />
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
