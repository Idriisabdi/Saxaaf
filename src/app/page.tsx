import { PlayCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-full items-center justify-start container mx-auto py-10">
      <button aria-label="Play video" className="group">
        <PlayCircle className="h-16 w-16 text-foreground/20 transition-colors group-hover:text-foreground/40" />
      </button>
    </div>
  );
}
