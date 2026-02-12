'use client';

import dynamic from 'next/dynamic';
import { DistributionData, DistributionTemplateProps } from '@/src/types/api';
import { AppShell } from '@/src/components/AppShell';
import { buildQueryString } from '@/src/utils/url';
import { useFetch } from '../hooks/useFetch';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const DistributionTemplate: React.FC<DistributionTemplateProps> = ({
  title,
  apiPath,
  params,
  children,
}) => {
  const queryString = buildQueryString(params);
  const { data, error, isLoading } = useFetch<DistributionData>(
    `http://localhost:8080${apiPath}?${queryString}`
  );

  // ★ AppShellで包んで中身だけを書く
  return (
    <AppShell
      title={`${title} Simulator`}
      breadcrumbs={[
        { label: 'Distributions', href: '/distributions' },
        { label: title },
      ]}
    >
      {/* ここから下は「中身」のレイアウト定義 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左カラム：操作パネル */}
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

        {/* 右カラム：グラフ */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[500px] relative overflow-hidden flex flex-col">
            {/* エラー表示 */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 text-red-500 font-bold">
                ⚠️ {error}
              </div>
            )}

            {/* ローディング表示 */}
            {isLoading && !error && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-pulse text-gray-400 font-medium">
                  Computing...
                </div>
              </div>
            )}

            {/* グラフ描画 */}
            {data && (
              <Plot
                data={[
                  {
                    x: data.x,
                    y: data.y,
                    type: 'scatter',
                    mode: 'lines',
                    fill: 'tozeroy',
                    line: { color: '#2563eb', width: 3 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: { text: data.title, font: { size: 18 } },
                  margin: { l: 50, r: 20, t: 40, b: 40 },
                  xaxis: { gridcolor: '#f3f4f6' },
                  yaxis: { gridcolor: '#f3f4f6' },
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default DistributionTemplate;
