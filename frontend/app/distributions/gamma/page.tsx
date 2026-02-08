'use client'; // ユーザー操作(useState)があるのでClient Componentにします

import { useState } from 'react';
import DistributionTemplate from '@/src/components/DistributionTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function GammaPage() {
  const [alpha, setAlpha] = useState(0.1);
  const [beta, setBeta] = useState(1);

  return (
    <DistributionTemplate
      title="gamma distribution"
      apiPath="/api/distribution/gamma"
      params={{ alpha, beta }}
    >
      <ControlRow
        label="alpha (α)"
        value={alpha}
        min={0.1}
        max={10}
        step={0.1}
        onChange={setAlpha}
      />
      <ControlRow
        label="beta (β)"
        value={beta}
        min={0.1}
        max={5}
        step={0.1}
        onChange={setBeta}
      />
    </DistributionTemplate>
  );
}
