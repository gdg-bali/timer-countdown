import CardTimer from "@/components/card-timer";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import FullScreenLayout from "@/Layout/full-screen-layout";
import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FullScreenLayout>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 p-2">
          <CardTimer countTimer={120} />
          <CardTimer countTimer={120} />
          <CardTimer countTimer={120} />
          <CardTimer countTimer={120} />
        </div>
        <div className="fixed bottom-2 right-2 flex">
          <Button variant="outline" className="rounded-r-none">
            <Pencil />
          </Button>
          <Button variant="outline" className="rounded-l-none">
            <Plus />
          </Button>
        </div>
      </FullScreenLayout>
    </ThemeProvider>
  );
};

export default App;
