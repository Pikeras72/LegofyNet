import { SectionHeading } from '../ui/SectionHeading';
import { Accordion } from '../ui/Accordion';
import { FAQ_ITEMS } from '../../data/faq';

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading">
      <SectionHeading
        align="left"
        eyebrow="FAQ"
        title="Frequently asked questions"
      />
      <Accordion items={FAQ_ITEMS} className="mt-8" />
    </section>
  );
}
