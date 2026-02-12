'use client';

import React from 'react';
import SamplingRelationTemplate from '@/src/components/SamplingRelationTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function GeometricNBinomialPage() {
  const [r, setR] = React.useState(1);
  const [p, setP] = React.useState(0.5);

  return (
    <SamplingRelationTemplate
      title="Geometric-Negative Binomial"
      apiPath1="/api/sampling/geometric-sum"
      apiPath2="/api/sampling/negative-binomial"
      params1={{ p, r }}
      params2={{ r, p }}
      title1="Geometric Distribution"
      title2="Negative Binomial Distribution"
      parentBreadcrumbs={[
        {
          label: 'Distribution Relationships',
          href: '/distribution_relationships',
        },
      ]}
    >
      <ControlRow
        label="r (成功回数)"
        value={r}
        min={1}
        max={20}
        step={1}
        onChange={(value) => {
          setR(value);
        }}
      />
      <ControlRow
        label="p (成功確率)"
        value={p}
        min={0.01}
        max={0.99}
        step={0.01}
        onChange={(value) => {
          setP(value);
        }}
      />
    </SamplingRelationTemplate>
  );
}
