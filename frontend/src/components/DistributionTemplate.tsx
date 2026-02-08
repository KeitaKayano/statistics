'use client';

import { useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { DistributionData } from '@/src/types/api';
import { AppShell } from '@/src/components/AppShell';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface TemplateProps {
  title: string;
  apiPath: string;
  params: Record<string, string | number>;
  children: ReactNode;
}

const DistributionTemplate: React.FC<TemplateProps> = ({
  title,
  apiPath,
  params,
  children,
}) => {
  const [data, setData] = useState<DistributionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });
  const queryString = queryParams.toString();

  // データ取得ロジック
  useEffect(() => {
    fetch(`http://localhost:8080${apiPath}?${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      // .then(text => {
      //   console.log("生のレスポンス:", text); // ★ コンソールで中身を確認！
      // })
      .then((json: DistributionData) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('データの取得に失敗しました');
      });
  }, [apiPath, queryString]);

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
            {!data && !error && (
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
