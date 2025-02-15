import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mt-32 w-full m-auto max-w-4xl border p-4">
      <Outlet />
    </div>
  );
}

export default App;
