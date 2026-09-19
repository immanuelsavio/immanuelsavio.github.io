import { ArrowLeft } from '@phosphor-icons/react';
import { Button, MaskText } from '../ui/primitives';
import { usePageTitle } from '../lib/use-page-title';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <div className="shell flex min-h-[90dvh] flex-col justify-center pt-24">
      <MaskText
        as="h1"
        text="404. Nothing here."
        className="display text-[clamp(3.4rem,11vw,10rem)] font-bold leading-[0.9] text-ink [font-variation-settings:'opsz'_96,'wdth'_75]"
      />
      <p className="mt-6 max-w-[40ch] text-lg text-muted">The page moved or never existed. The home page still does.</p>
      <Button to="/" className="mt-10 self-start" size="lg"><ArrowLeft size={16} /> Back home</Button>
    </div>
  );
}
