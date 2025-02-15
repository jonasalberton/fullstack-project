import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="mt-32 w-full m-auto max-w-4xl p-4">
      <Toaster richColors />
      <Outlet />
    </div>
  );
}

export default App;
