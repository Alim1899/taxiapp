import "./App.css";
import Layout from "./components/layout/Layout";
import UserProvider from "./components/context/UserProvider";
function App() {
  return (
    <UserProvider>
      <div className="app">
        <Layout />
      </div>
    </UserProvider>
  );
}

export default App;
