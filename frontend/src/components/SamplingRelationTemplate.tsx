import { AppShell } from '@/src/components/AppShell';
import dynamic from 'next/dynamic';
import { buildQueryString } from '@/src/utils/url';
import { useFetch } from '@/src/hooks/useFetch';
import { SamplingData } from '@/src/types/api';
import { SamplingRelationTemplateProps } from '@/src/types/api';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const SamplingRelationTemplate: React.FC<SamplingRelationTemplateProps> = ({
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
  } = useFetch<SamplingData>(
    `http://localhost:8080${apiPath1}?${queryString1}`
  );
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useFetch<SamplingData>(
    `http://localhost:8080${apiPath2}?${queryString2}`
  );

  return (
    <AppShell
      title={`${title} Sampling Relation Simulator`}
      breadcrumbs={[
        {
          label: 'SamplingRelationship',
          href: '/sampling_relationships',
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
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[400px] relative overflow-hidden flex flex-col">
            {/* エラー表示 */}
            {error1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 text-red-500 font-bold">
                ⚠️ {error1}
              </div>
            )}

            {/* ローディング表示 */}
            {isLoading1 && !error1 && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-pulse text-gray-400 font-medium">
                  Computing...
                </div>
              </div>
            )}

            {/* グラフ描画 */}
            {data1 && !isLoading1 && !error1 && (
              <Plot
                data={[
                  {
                    x: data1.samples,
                    type: 'histogram',
                    marker: { color: '#3B82F6' },
                    opacity: 0.7,
                    name: title1,
                  },
                ]}
                layout={{
                  title: title1,
                  autosize: true,
                  margin: { t: 40, r: 20, b: 40, l: 50 },
                }}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
              />
            )}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[400px] relative overflow-hidden flex flex-col">
            {/* エラー表示 */}
            {error2 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 text-red-500 font-bold">
                ⚠️ {error2}
              </div>
            )}

            {/* ローディング表示 */}
            {isLoading2 && !error2 && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-pulse text-gray-400 font-medium">
                  Computing...
                </div>
              </div>
            )}

            {/* グラフ描画 */}
            {data2 && !isLoading2 && !error2 && (
              <Plot
                data={[
                  {
                    x: data2.samples,
                    type: 'histogram',
                    marker: { color: '#EF4444' },
                    opacity: 0.7,
                    name: title2,
                  },
                ]}
                layout={{
                  title: title2,
                  autosize: true,
                  margin: { t: 40, r: 20, b: 40, l: 50 },
                }}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
              />
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default SamplingRelationTemplate;
