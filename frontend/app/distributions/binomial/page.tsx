'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function BinomialPage() {
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);

  return (
    <DistributionTemplate
      title="binomial distribution"
      apiPath="/api/distribution/binomial"
      params={{ n, p }}
    >
      <ControlRow
        label="number of trials (n)"
        value={n}
        min={1}
        max={100}
        step={1}
        onChange={setN}
      />
      <ControlRow
        label="probability of success (p)"
        value={p}
        min={0.0}
        max={1.0}
        step={0.05}
        onChange={setP}
      />
    </DistributionTemplate>
  );
}
