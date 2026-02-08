'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function HypergeometricPage() {
  const [M, setM] = useState(20);
  const [n, setN] = useState(7);
  const [N, setN2] = useState(12);

  return (
    <DistributionTemplate
      title="hypergeometric distribution"
      apiPath="/api/distribution/hypergeometric"
      params={{ M, n, N }}
    >
      <ControlRow
        label="population size (M)"
        value={M}
        min={1}
        max={100}
        step={1}
        onChange={setM}
      />
      <ControlRow
        label="number of success states in the population (n)"
        value={n}
        min={1}
        max={M}
        step={1}
        onChange={setN}
      />
      <ControlRow
        label="number of draws (N)"
        value={N}
        min={1}
        max={M}
        step={1}
        onChange={setN2}
      />
    </DistributionTemplate>
  );
}
