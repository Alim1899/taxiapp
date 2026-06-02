import "./App.css";
import Layout from "./components/layout/Layout";
import UserProvider from "./components/context/AuthContext/UserProvider";
import AmountProvider from "./components/context/AmountContext/AmountProvider";
function App() {
  return (
    <UserProvider>
      <AmountProvider>
        <div className="app">
          <Layout />
        </div>
      </AmountProvider>
    </UserProvider>
  );
}

export default App;
