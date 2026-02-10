import Link from 'next/link';
import { AppShell } from '@/src/components/AppShell';

export default function Home() {
  // アプリの機能モジュール一覧
  const modules = [
    {
      title: '確率分布シミュレーター',
      href: '/distributions', // 先ほど作った一覧ページへ
      description:
        '正規分布、ポアソン分布などのパラメータを動かし、形状の変化を直感的に学びます。',
      icon: '📊',
      active: true, // 現在使える機能
      color: 'bg-blue-500', // アイコンの背景色
    },
    {
      title: '仮説検定（準備中）',
      href: '#',
      description:
        't検定やカイ二乗検定のp値、棄却域を可視化して理解するモジュールです。',
      icon: '⚖️',
      active: false, // まだ使えない（グレーアウト用）
      color: 'bg-indigo-500',
    },
    {
      title: '相関と回帰（準備中）',
      href: '#',
      description:
        '散布図データを自分で作成し、相関係数や回帰直線の動きを確認します。',
      icon: '📈',
      active: false,
      color: 'bg-green-500',
    },
    {
      title: '分布の関係性（準備中）',
      href: '/distribution_relationships',
      description:
        '２つの確率分布の関係性や変換を視覚的に理解するためのモジュールです。',
      icon: '🔄',
      active: true,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <AppShell title="ホーム" breadcrumbs={[]}>
      {/* ヒーローセクション（トップの大きな見出し） */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Statistics Learning App
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            インタラクティブなシミュレーションで、統計学の「なぜ？」を「なるほど！」に変える学習プラットフォーム。
          </p>
        </div>
      </div>

      {/* メインコンテンツ（カードグリッド） */}
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className={`
                group relative bg-white rounded-2xl shadow-sm border border-gray-200 
                overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                ${!module.active ? 'opacity-60 pointer-events-none grayscale' : ''}
              `}
            >
              <div className="p-6">
                {/* アイコン部分 */}
                <div
                  className={`
                  w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 text-white shadow-md
                  ${module.color}
                `}
                >
                  {module.icon}
                </div>

                {/* タイトル */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {module.title}
                </h3>

                {/* 説明文 */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* アクションリンク（アクティブな場合のみ表示） */}
                {module.active ? (
                  <div className="flex items-center text-blue-500 font-semibold text-sm mt-auto">
                    学習を始める
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
