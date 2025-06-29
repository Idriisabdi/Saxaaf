import { Sparkles, Target, Eye, Diamond } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-16 w-16 text-primary" />,
      title: 'Our Mission',
      description: 'Our mission is to empower businesses and organizations to thrive in the digital age by delivering integrated solutions where creative vision meets intelligent technology. We craft compelling narratives through world-class Media Production, build powerful digital platforms with expert Web & Software Design, and deploy transformative AI Systems to drive measurable growth and connect our clients with a global audience.',
    },
    {
      icon: <Eye className="h-16 w-16 text-primary" />,
      title: 'Our Vision',
      description: 'Our vision is to be the foundational pillar of our clients\' digital transformation, fostering a vibrant ecosystem of innovation where every enterprise has the tools and the voice to compete and lead on a global stage. We aim to set the standard for excellence by proving that the most powerful results are born from the seamless fusion of human creativity and artificial intelligence.',
    },
    {
      icon: <Diamond className="h-16 w-16 text-primary" />,
      title: 'Our Values',
      description: 'We are guided by a core set of values: Partnership, treating clients as extensions of our own team; Innovation, relentlessly pursuing future-focused solutions; Integrity, operating with transparency and a commitment to excellence; and Impact, focusing on delivering measurable, lasting results.',
    }
  ];

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-500">
        <div className="text-center animate-in fade-in zoom-in-95 duration-500">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl uppercase flex items-center justify-center gap-4">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            About Saxaaf Network
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
            Fusing creative vision with intelligent technology to build the future of digital engagement.
          </p>
        </div>

        <div className="mx-auto mt-24 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8">
            {values.map((item, index) => (
              <div 
                key={item.title} 
                className={`flex flex-col items-center text-center p-6 ${index > 0 ? 'md:border-l md:border-border' : ''} animate-in fade-in slide-in-from-bottom-8 duration-700`}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="mb-6">{item.icon}</div>
                <h2 className="font-headline text-2xl font-bold uppercase text-primary">{item.title}</h2>
                <div className="my-4 w-20 border-b-2 border-primary/50" />
                <p className="text-base text-foreground/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
             <h2 className="font-headline text-3xl font-bold uppercase flex items-center justify-center gap-4">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                Our Story
              </h2>
          </div>
          <div className="space-y-6 text-lg text-foreground/80 max-w-3xl mx-auto">
            <p>
                In the modern digital economy, lasting success is achieved at the intersection of compelling narrative and powerful technology. Saxaaf Network was founded on this core belief. We recognized a critical disconnect in the market: brilliant creative visions were often limited by technical constraints, and powerful technologies lacked the storytelling to make them resonate. We built our network to bridge this gap.
            </p>
            <p>
                We are a new breed of digital partner, a deliberately assembled team of master storytellers, brand strategists, software engineers, and AI specialists. Our philosophy is that the most impactful brand experiences are born when captivating Media Production and Content Creation are built upon a foundation of powerful, scalable Web & Software Design. By infusing this entire process with insightful AI System Analysis, we move beyond simply completing projects—we architect sustainable competitive advantages for our clients.
            </p>
            <p>
                Our commitment to our clients transcends the traditional vendor relationship. We operate as a dedicated strategic partner, deeply invested in your growth and equipped to navigate the complexities of the digital frontier with you. Our ultimate purpose is to ensure your vision is not only realized but amplified, creating a measurable and lasting impact in your market and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
