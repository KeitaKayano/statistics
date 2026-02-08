'use client'; // ユーザー操作(useState)があるのでClient Componentにします

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function NormalPage() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  return (
    <DistributionTemplate
      title="normal distribution"
      apiPath="/api/distribution/normal"
      params={{ mu, sigma }}
    >
      <ControlRow
        label="mean (μ)"
        value={mu}
        min={-10}
        max={10}
        step={0.5}
        onChange={setMu}
      />
      <ControlRow
        label="standard deviation (σ)"
        value={sigma}
        min={0.1}
        max={5}
        step={0.1}
        onChange={setSigma}
      />
    </DistributionTemplate>
  );
}
