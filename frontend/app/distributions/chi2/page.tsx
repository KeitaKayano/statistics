'use client';

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function Chi2Page() {
  const [df, setDf] = useState(3);

  return (
    <DistributionTemplate
      title="Chi2 Distribution"
      apiPath="/api/distribution/chi2"
      params={{ df }}
    >
      <ControlRow
        label="Degrees of Freedom (df)"
        value={df}
        min={1}
        max={20}
        step={1}
        onChange={setDf}
      />
    </DistributionTemplate>
  );
}
