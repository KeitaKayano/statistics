'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function GeometricPage() {
  const [p, setP] = useState(0.5);

  return (
    <DistributionTemplate
      title="geometric distribution"
      apiPath="/api/distribution/geometric"
      params={{ p }}
    >
      <ControlRow
        label="probability of success (p)"
        value={p}
        min={0.05}
        max={0.95}
        step={0.05}
        onChange={setP}
      />
    </DistributionTemplate>
  );
}
