import { WithContext, Thing } from 'schema-dts';
import { useMemo } from 'react';

interface JsonLdProps {
  data: WithContext<Thing> | WithContext<Thing>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = useMemo(() => JSON.stringify(data), [data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
