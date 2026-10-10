import { Button } from "./components/ui/Button";
import { toast } from "./lib/toast/Toast.service";

const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-5">
      <Button onClick={() => toast.info({ message: "Challenge completed" })}>Get Started</Button>

      <Button variant="outline">Get Started</Button>

      <Button variant="destructive" sound="none">
        Delete
      </Button>

      <Button variant="ghost">Ghost Btn</Button>
    </div>
  );
};

export default App;
