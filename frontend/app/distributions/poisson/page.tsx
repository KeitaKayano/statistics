'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function PoissonPage() {
  const [lambda_param, setLambdaParam] = useState(3);

  return (
    <DistributionTemplate
      title="poisson distribution"
      apiPath="/api/distribution/poisson"
      params={{ lambda_param }}
    >
      <ControlRow
        label="average rate (λ)"
        value={lambda_param}
        min={0.1}
        max={20}
        step={0.5}
        onChange={setLambdaParam}
      />
    </DistributionTemplate>
  );
}
