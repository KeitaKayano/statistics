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
