import CardTimer from "@/components/card-timer";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import FullScreenLayout from "@/Layout/full-screen-layout";
import { Pencil } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
          <div className="fixed bottom-2 right-2 flex">
            {/* <Button variant="outline">
              <Pencil />
            </Button> */}
            {/* Add Form */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Timer</DialogTitle>
                </DialogHeader>
                <div className="flex text-2xl gap-2 justify-center items-center">
                  <Input id="name" type="number" placeholder="00" />
                  <span>:</span>
                  <Input id="name" type="number" placeholder="00" />
                  <span>:</span>
                  <Input id="name" type="number" placeholder="00" />
                </div>
                <div className="flex gap-4 py-2 justify-center items-center">
                  <NotebookPen />
                  <Input id="name" placeholder="Add Timer Name.." />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                  <Button type="submit" variant={"outline"}>
                    Cancel
                  </Button>{" "}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </FullScreenLayout>
    </ThemeProvider>
  );
};

export default App;
