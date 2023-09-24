import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <UserContextProvider>
      <main className=" max-w-screen-lg mx-auto px-2">
        <Header />
        <Outlet />
      </main>
    </UserContextProvider>
  );
}

export default App;
