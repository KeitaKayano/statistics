'use client';

import { useState } from 'react';
import DistributionRelationTemplate from '@/src/components/DistributionRelationTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function NormalTPage() {
  const [df, setDf] = useState(5);
  return (
    <DistributionRelationTemplate
      title="Normal-T"
      apiPath1="/api/distribution/normal"
      apiPath2="/api/distribution/t"
      params1={{ mu: 0, sigma: 1 }}
      params2={{ df: df }}
      title1="Normal Distribution"
      title2="Student's T Distribution"
    >
      <ControlRow
        label="自由度 (df)"
        value={df}
        min={1}
        max={50}
        step={1}
        onChange={(value) => {
          setDf(value);
        }}
      />
    </DistributionRelationTemplate>
  );
}
