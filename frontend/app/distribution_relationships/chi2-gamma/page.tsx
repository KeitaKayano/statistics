import DistributionRelationTemplate from '@/src/components/DistributionRelationTemplate';
export default function Chi2GammaPage() {
  return (
    <DistributionRelationTemplate
      title="Chi2-Gamma"
      apiPath1="/api/distribution/chi2"
      apiPath2="/api/distribution/gamma"
      params1={{ df: 1 }}
      params2={{ alpha: 0.5, beta: 2 }}
      title1="Chi-Squared Distribution"
      title2="Gamma Distribution"
    >
      {/* コントロール要素はここに追加できます */}
    </DistributionRelationTemplate>
  );
}
