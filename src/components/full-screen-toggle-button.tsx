import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn } from "lucide-react";
import { ZoomOut } from "lucide-react";

interface FullScreenToggleButtonProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

const FullScreenToggleButton: React.FC<FullScreenToggleButtonProps> = ({
  isFullScreen,
  onToggle,
}) => {
  return (
    <Button onClick={onToggle} variant="outline">
      {isFullScreen ? <ZoomOut /> : <ZoomIn />}
    </Button>
  );
};

export default FullScreenToggleButton;
