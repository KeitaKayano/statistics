'use client';

import React from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function TPage() {
  const [df, setDf] = React.useState(10);

  return (
    <DistributionTemplate
      title="t distribution"
      apiPath="/api/distribution/t"
      params={{ df }}
    >
      <ControlRow
        label="degrees of freedom (df)"
        value={df}
        min={1}
        max={30}
        step={1}
        onChange={setDf}
      />
    </DistributionTemplate>
  );
}
