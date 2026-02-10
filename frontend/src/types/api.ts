export interface DistributionData {
  x: number[];
  y: number[];
  title: string;
}

export interface DistributionPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export interface DistributionRelationship {
  distributionA: DistributionData;
  distributionB: DistributionData;
  distributionNameA: string;
  distributionNameB: string;
  title: string;
}
