import LeadAssessmentForm from '@/components/lead-assessment-form';

export default function LeadAssessmentPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">AI-Powered Lead Assessment</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Leverage artificial intelligence to instantly evaluate the potential of your business leads. Fill out the form below to get a comprehensive analysis and recommended next steps.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                <LeadAssessmentForm />
            </div>
        </div>
      </section>
    </div>
  );
}
