'use client';

import { useState } from 'react';
import DistributionRelationTemplate from '@/src/components/DistributionRelationTemplate';
import ControlRow from '@/src/components/ControlRow';

export default function HypergeomBinomialPage() {
  const [M, setM] = useState(20);
  const [N, setN] = useState(10);
  const [n, setn] = useState(10);
  const p = n / M;

  return (
    <DistributionRelationTemplate
      title="Hypergeometric-Binomial"
      apiPath1="/api/distribution/hypergeometric"
      apiPath2="/api/distribution/binomial"
      params1={{ M, N, n }}
      params2={{ N, p }}
      title1="Hypergeometric Distribution"
      title2="Binomial Distribution"
    >
      <ControlRow
        label="M (母集団のサイズ)"
        value={M}
        min={1}
        max={1000}
        step={1}
        onChange={(value) => {
          setM(value);
        }}
      />
      <ControlRow
        label="N (抽出数)"
        value={N}
        min={1}
        max={M}
        step={1}
        onChange={(value) => {
          setN(value);
        }}
      />
      <ControlRow
        label="n (母集団の中の成功数)"
        value={n}
        min={1}
        max={M}
        step={1}
        onChange={(value) => {
          setn(value);
        }}
      />
    </DistributionRelationTemplate>
  );
}
