'use client';

import { useState } from 'react';
import DistributionRelationTemplate from '@/src/components/DistributionRelationTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function BinomialPoissonPage() {
  const [n, setN] = useState(10);
  const [lambda_param, setLambda] = useState(10 * 0.5);
  const p = lambda_param / n;

  return (
    <DistributionRelationTemplate
      title="Binomial-Poisson"
      apiPath1="/api/distribution/binomial"
      apiPath2="/api/distribution/poisson"
      params1={{ n, p }}
      params2={{ lambda_param }}
      title1="Binomial Distribution"
      title2="Poisson Distribution"
    >
      <ControlRow
        label="n (試行回数)"
        value={n}
        min={1}
        max={1000}
        step={1}
        onChange={(value) => {
          setN(value);
        }}
      />
      <ControlRow
        label="λ (平均発生率)"
        value={lambda_param}
        min={0.1}
        max={100}
        step={0.1}
        onChange={(value) => {
          setLambda(value);
        }}
      />
    </DistributionRelationTemplate>
  );
}
