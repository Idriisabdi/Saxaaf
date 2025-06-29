import { cn } from "@/lib/utils";

export const TypingIndicator = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center space-x-1 py-1", className)}>
            <span className="sr-only">Typing...</span>
            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
    );
};
