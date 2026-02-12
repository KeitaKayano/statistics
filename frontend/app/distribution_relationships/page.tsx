import Link from 'next/link';
import { AppShell } from '@/src/components/AppShell';

// 分布の関係性データ定義
const distributionRelationships = [
  {
    id: 'binomial-to-poisson',
    name: '二項分布とポアソン分布',
    href: '/distribution_relationships/binomial-poisson',
    description:
      '試行回数が多く成功確率が小さい場合、二項分布はポアソン分布で近似できる',
  },
  {
    id: 'chi2-to-gamma',
    name: 'カイ二乗分布とガンマ分布',
    href: '/distribution_relationships/chi2-gamma',
    description: 'カイ二乗分布は自由度に応じたガンマ分布の特別なケースである',
  },
  {
    id: 'hypergeom-to-binomial',
    name: '超幾何分布と二項分布',
    href: '/distribution_relationships/hypergeom-binomial',
    description: '母集団が大きい場合、超幾何分布は二項分布で近似できる',
  },
  {
    id: 'normal-to-t',
    name: '正規分布とスチューデントのt分布',
    href: '/distribution_relationships/normal-t',
    description:
      '自由度が大きくなると、スチューデントのt分布は正規分布に近づく',
  },
  {
    id: 'geometric-to-exponential',
    name: '幾何分布と指数分布',
    href: '/distribution_relationships/geometric-exp',
    description: '幾何分布と指数分布は離散と連続の対応する分布である',
  },
  {
    id: 'geometric-to-nbinomial',
    name: '幾何分布と負の二項分布',
    href: '/distribution_relationships/geometric-nbinomial',
    description:
      '負の二項分布は複数回の成功までの試行回数をモデル化し、幾何分布はその特別なケースである',
  },
];

export default function DistributionRelationshipPage() {
  return (
    <AppShell
      title="分布の関係性"
      breadcrumbs={[{ label: 'Distribution_relationship' }]}
    >
      {/* 全体のヘッダー部分 */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {/* ページのヘッダー部分 */}
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            確率分布一覧
          </h1>
          <p className="text-lg text-gray-600">
            シミュレーターを使って、各分布の性質やパラメータによる変化を学びましょう。
          </p>
        </div>
        {/* グリッドレイアウト部分 */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {distributionRelationships.map((relation) => (
            <Link
              key={relation.id}
              href={relation.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow block"
            >
              {/* タイトルと説明 */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {relation.name}
              </h2>
              <p className="text-gray-600">{relation.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
