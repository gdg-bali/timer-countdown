import CardTimer from "@/components/card-timer";
import { ThemeProvider } from "@/components/theme-provider";
import FullScreenLayout from "@/Layout/full-screen-layout";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FullScreenLayout>
        <div className="bg-white dark:bg-black transition min-h-screen">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 p-2">
            <CardTimer countTimer={120} />
            <CardTimer countTimer={120} />
            <CardTimer countTimer={120} />
            <CardTimer countTimer={120} />
          </div>
        </div>
      </FullScreenLayout>
    </ThemeProvider>
  );
};

export default App;
