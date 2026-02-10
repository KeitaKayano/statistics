'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { DistributionData } from '@/src/types/api';
import { AppShell } from '@/src/components/AppShell';
import { buildQueryString } from '@/src/utils/url';
import { useFetch } from '../hooks/useFetch';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface TemplateProps {
  title: string;
  apiPath1: string;
  apiPath2: string;
  params1: Record<string, string | number>;
  params2: Record<string, string | number>;
  title1: string;
  title2: string;
  children?: ReactNode;
}

const DistributionRelationTemplate: React.FC<TemplateProps> = ({
  title,
  apiPath1,
  apiPath2,
  params1,
  params2,
  title1,
  title2,
  children,
}) => {
  const queryString1 = buildQueryString(params1);
  const queryString2 = buildQueryString(params2);
  const {
    data: data1,
    error: error1,
    isLoading: isLoading1,
  } = useFetch<DistributionData>(
    `http://localhost:8080${apiPath1}?${queryString1}`
  );
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useFetch<DistributionData>(
    `http://localhost:8080${apiPath2}?${queryString2}`
  );
  console.log('DistributionRelationTemplate rendered with:', {
    params1,
    params2,
    data1,
    data2,
  });
  console.log(data1, data2);

  return (
    <AppShell
      title={`${title} Relation Simulator`}
      breadcrumbs={[
        {
          label: 'DistributionRelationship',
          href: '/distribution_relationships',
        },
        { label: title },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              パラメータ設定
            </h3>
            <div className="space-y-6">{children}</div>
          </div>

          <div className="bg-blue-50 text-blue-800 rounded-xl p-4 text-sm">
            <p className="font-bold mb-1">💡 ガイド</p>
            パラメータを動かすと、リアルタイムで確率密度関数の形状が変化します。
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[500px] relative overflow-hidden flex flex-col">
            {(error1 || error2) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 text-red-500 font-bold">
                ⚠️ {error1 || error2}
              </div>
            )}

            {(isLoading1 || isLoading2) && !error1 && !error2 && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-pulse text-gray-400 font-medium">
                  Computing...
                </div>
              </div>
            )}

            {!error1 && !error2 && data1 && data2 && (
              <Plot
                data={[
                  {
                    x: data1.x,
                    y: data1.y,
                    type: 'scatter',
                    mode: 'lines',
                    name: title1,
                    line: { color: 'blue' },
                  },
                  {
                    x: data2.x,
                    y: data2.y,
                    type: 'scatter',
                    mode: 'lines',
                    name: title2,
                    line: { color: 'red' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: 'Distribution Relationship',
                  xaxis: { title: 'x' },
                  yaxis: { title: 'Density' },
                  margin: { t: 40, r: 20, b: 40, l: 50 },
                }}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler={true}
              />
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default DistributionRelationTemplate;
