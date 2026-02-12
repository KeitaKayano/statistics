import { ReactNode } from 'react';

// APIからのレスポンスデータの型定義
export interface DistributionData {
  x: number[];
  y: number[];
  title: string;
}

export interface SamplingData {
  samples: number[];
  title: string;
}

// テンプレートのProps定義
export interface DistributionTemplateProps {
  title: string;
  apiPath: string;
  params: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
}

export interface DistributionRelationTemplateProps {
  title: string;
  apiPath1: string;
  apiPath2: string;
  params1: Record<string, string | number>;
  params2: Record<string, string | number>;
  title1: string;
  title2: string;
  children?: ReactNode;
}

export interface SamplingTemplateProps {
  title: string;
  apiPath: string;
  params: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
}

export interface SamplingRelationTemplateProps {
  title: string;
  apiPath1: string;
  apiPath2: string;
  params1: Record<string, string | number>;
  params2: Record<string, string | number>;
  title1: string;
  title2: string;
  children?: ReactNode;
  parentBreadcrumbs?: { label: string; href: string }[];
}
