// src/components/AppShell.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string; // リンクがない場合は現在のページとみなす
}

interface AppShellProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  title,
  breadcrumbs,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* 共通ヘッダーエリア */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* パンくずリスト & タイトル */}
          <div>
            <nav className="flex items-center text-sm text-gray-500 mb-1 space-x-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Top
              </Link>
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>/</span>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
          </div>

          {/* 右上の共通パーツ（例：ロゴやGithubリンクなどあれば） */}
          <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Beta
          </div>
        </div>
      </header>

      {/* コンテンツエリア（子供をここに流し込む） */}
      <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        {children}
      </main>
    </div>
  );
};
