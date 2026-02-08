'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function ExpPage() {
  const [lambda_param, setLambdaParam] = useState(1);

  return (
    <DistributionTemplate
      title="exponential distribution"
      apiPath="/api/distribution/exponential"
      params={{ lambda_param }}
    >
      <ControlRow
        label="rate (λ)"
        value={lambda_param}
        min={0.1}
        max={5}
        step={0.1}
        onChange={setLambdaParam}
      />
    </DistributionTemplate>
  );
}
