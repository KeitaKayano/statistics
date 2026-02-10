import Link from 'next/link';
import { AppShell } from '@/src/components/AppShell';

// 1. 分布のデータ定義（ここに行を追加していけばメニューが増えます）
const distributions = [
  {
    id: 'normal',
    name: '正規分布 (Normal Distribution)',
    href: '/distributions/normal',
    description:
      '平均と分散によって決定される、統計学で最も重要な連続確率分布。つり鐘型の曲線を描きます。',
    type: 'continuous', // 'continuous' | 'discrete'
    formula: 'N(μ, σ²)',
  },
  {
    id: 'gamma',
    name: 'ガンマ分布 (Gamma Distribution)',
    href: '/distributions/gamma',
    description:
      '形状パラメータと尺度パラメータによって決定される連続確率分布。待ち時間や寿命のモデルに使われます。',
    type: 'continuous',
    formula: 'Γ(α, β)',
  },
  {
    id: 'beta',
    name: 'ベータ分布 (Beta Distribution)',
    href: '/distributions/beta',
    description:
      '0から1の範囲で定義される連続確率分布。成功確率の事前分布としてよく使われます。',
    type: 'continuous',
    formula: 'Beta(α, β)',
  },
  {
    id: 'exponential',
    name: '指数分布 (Exponential Distribution)',
    href: '/distributions/exponential',
    description:
      '一定の平均発生率を持つ事象の待ち時間をモデル化する連続確率分布です。',
    type: 'continuous',
    formula: 'Exp(λ)',
  },
  {
    id: 'poisson',
    name: 'ポアソン分布 (Poisson Distribution)',
    href: '/distributions/poisson',
    description:
      '単位時間あたりに平均λ回起こる事象が、ちょうどk回起こる確率を表す離散分布です。',
    type: 'discrete',
    formula: 'P(X=k)',
  },
  {
    id: 'binomial',
    name: '二項分布 (Binomial Distribution)',
    href: '/distributions/binomial',
    description:
      'n回の独立した試行で、各試行が成功する確率pのとき、成功回数Xがk回である確率を表す離散分布です。',
    type: 'discrete',
    formula: 'B(n, p)',
  },
  {
    id: 'geometric',
    name: '幾何分布 (Geometric Distribution)',
    href: '/distributions/geometric',
    description:
      '独立したベルヌーイ試行で、最初の成功が起こるまでの失敗回数をモデル化する離散確率分布です。',
    type: 'discrete',
    formula: 'G(p)',
  },
  {
    id: 'nbinomial',
    name: '負の二項分布 (Negative Binomial Distribution)',
    href: '/distributions/negative_binomial',
    description:
      '独立したベルヌーイ試行で、r回目の成功が起こるまでの失敗回数をモデル化する離散確率分布です。',
    type: 'discrete',
    formula: 'NB(r, p)',
  },
  {
    id: 'hypergeometric',
    name: '超幾何分布 (Hypergeometric Distribution)',
    href: '/distributions/hypergeometric',
    description:
      '成功数がnであるのM個の有限母集団からのN回の無作為抽出において、成功数をモデル化する離散確率分布です。',
    type: 'discrete',
    formula: 'HG(M, n, N)',
  },
  {
    id: 'chi2',
    name: 'カイ二乗分布 (Chi-Square Distribution)',
    href: '/distributions/chi2',
    description:
      '自由度kのカイ二乗分布は、k個の独立した標準正規分布に従う確率変数の二乗和で定義される連続確率分布です。',
    type: 'continuous',
    formula: 'χ²(k)',
  },
];

export default function DistributionPage() {
  return (
    <AppShell title="確率分布一覧" breadcrumbs={[{ label: 'Distributions' }]}>
      {/* ヘッダー部分 */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* ヘッダー部分 */}
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            確率分布一覧
          </h1>
          <p className="text-lg text-gray-600">
            シミュレーターを使って、各分布の性質やパラメータによる変化を学びましょう。
          </p>
        </div>

        {/* グリッドレイアウト部分 */}
        <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
          {distributions.map((dist) => (
            <Link key={dist.id} href={dist.href} className="group block">
              <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 p-6 relative overflow-hidden">
                {/* 右上の数式装飾（デザインアクセント） */}
                <div className="absolute top-[-10px] right-[-10px] bg-gray-50 w-24 h-24 rounded-full flex items-end justify-start p-4 text-gray-200 text-3xl font-serif select-none group-hover:text-blue-100 transition-colors">
                  {dist.formula}
                </div>

                {/* ラベル（連続・離散） */}
                <div className="mb-4">
                  <span
                    className={`
                  inline-block px-3 py-1 text-xs font-semibold rounded-full
                  ${
                    dist.type === 'continuous'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }
                `}
                  >
                    {dist.type === 'continuous' ? '連続型' : '離散型'}
                  </span>
                </div>

                {/* タイトル */}
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {dist.name}
                </h2>

                {/* 説明文 */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dist.description}
                </p>

                {/* 「学ぶ」矢印 */}
                <div className="mt-4 flex items-center text-blue-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  シミュレーターを開く
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
