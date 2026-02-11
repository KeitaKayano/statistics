'use client';

import React from 'react';
import DistributionRelationTemplate from '@/src/components/DistributionRelationTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function GeometricExpPage() {
  const [lambda_param, setLambda] = React.useState(1);
  const p = 1 - Math.exp(-lambda_param);

  return (
    <DistributionRelationTemplate
      title="Geometric-Exponential"
      apiPath1="/api/distribution/geometric"
      apiPath2="/api/distribution/exponential"
      params1={{ p }}
      params2={{ lambda_param }}
      title1="Geometric Distribution"
      title2="Exponential Distribution"
    >
      <ControlRow
        label="λ (レートパラメータ)"
        value={lambda_param}
        min={0.01}
        max={50}
        step={0.01}
        onChange={(value) => {
          setLambda(value);
        }}
      />
    </DistributionRelationTemplate>
  );
}
