'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function BetaPage() {
  const [a, setAlpha] = useState(0.1);
  const [b, setBeta] = useState(0.1);

  return (
    <DistributionTemplate
      title="beta distribution"
      apiPath="/api/distribution/beta"
      params={{ a, b }}
    >
      <ControlRow
        label="alpha (α)"
        value={a}
        min={0.1}
        max={10}
        step={0.1}
        onChange={setAlpha}
      />
      <ControlRow
        label="beta (β)"
        value={b}
        min={0.1}
        max={10}
        step={0.1}
        onChange={setBeta}
      />
    </DistributionTemplate>
  );
}
