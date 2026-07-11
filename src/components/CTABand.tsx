import Section from './Section';
import Button from './Button';
import DemoButton from './DemoButton';

interface Props {
  title?: string;
  text?: string;
}

export default function CTABand({
  title = 'See a class before you decide.',
  text = 'Book a free demo and watch concept-first teaching in action — no commitment, no pressure.',
}: Props) {
  return (
    <Section tone="navy" className="relative overflow-hidden">
      <div className="grid-motif pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center" data-reveal>
        <h2 className="font-display text-display-lg text-white">{title}</h2>
        <p className="mt-4 max-w-xl text-lg text-mist">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <DemoButton variant="primary" size="lg" icon="arrow-right">
            Book a free demo
          </DemoButton>
          <Button
            href="/contact"
            variant="ghost"
            size="lg"
            className="!text-white !ring-white/40 hover:!bg-white/10"
          >
            Talk to a mentor
          </Button>
        </div>
      </div>
    </Section>
  );
}
