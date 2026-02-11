'use client';

import React from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function ParetoPage() {
  const [b, setB] = React.useState(1.0);

  return (
    <DistributionTemplate
      title="pareto distribution"
      apiPath="/api/distribution/pareto"
      params={{ b }}
    >
      <ControlRow
        label="shape parameter (b)"
        value={b}
        min={0.1}
        max={10.0}
        step={0.1}
        onChange={setB}
      />
    </DistributionTemplate>
  );
}
