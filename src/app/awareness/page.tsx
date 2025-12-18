import Button from '@/components/Button';

export default function AwarenessPage() {
  return (
    <section className="flex flex-col items-center gap-16 md:gap-32">
      <h1 className="text-center text-6xl md:text-8xl">Awareness</h1>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">
          Discrimination-free zone
        </h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          Tohuwabohu aims to create a space where all people are respected and
          treated equally, regardless of their origin, religion, gender, or
          other characteristics.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">Consensus</h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          Only YES means YES!
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">
          Respectful coexistence
        </h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          Appreciation, courtesy, empathy & understanding towards everyone.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">
          Possible exclusion for non-compliance
        </h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          If you do not adhere to these principles, you can be excluded from the
          party without warning!
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <h2 className="text-center text-4xl md:text-6xl">Awareness Team</h2>
        <p className="text-center text-xl text-balance md:text-2xl">
          If you feel uncomfortable or harassed, or observe situations where
          others might feel uncomfortable, please speak to our awareness team!
        </p>
        <p className="text-center text-xl text-balance md:text-2xl">
          You can recognize our awareness team by the illuminated strings of
          lights.
        </p>
      </div>
      <Button as="a" href="/" variant="outlined">
        Go to Homepage
      </Button>
    </section>
  );
}
