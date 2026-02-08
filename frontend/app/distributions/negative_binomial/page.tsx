'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function NegativeBinomialPage() {
  const [r, setR] = useState(5);
  const [p, setP] = useState(0.5);

  return (
    <DistributionTemplate
      title="negative binomial distribution"
      apiPath="/api/distribution/negative_binomial"
      params={{ r, p }}
    >
      <ControlRow
        label="number of successes (r)"
        value={r}
        min={1}
        max={50}
        step={1}
        onChange={setR}
      />
      <ControlRow
        label="probability of success (p)"
        value={p}
        min={0.05}
        max={1.0}
        step={0.05}
        onChange={setP}
      />
    </DistributionTemplate>
  );
}
