import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = () => {
    return (
        <Button disabled className="bg-orange-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    );
};

export default LoadingButton;