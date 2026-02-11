import numpy as np
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from scipy.stats import (
    norm,
    gamma,
    beta,
    poisson,
    expon,
    binom,
    geom,
    nbinom,
    hypergeom,
    chi2,
    t,
)
from app.schemas import DistributionResponse

app = FastAPI()

# --- CORSの設定 (Reactからのアクセスを許可) ---
origins = [
    "http://localhost:3000",  # Create React Appの場合
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/distribution/normal", response_model=DistributionResponse)
def get_normal_distribution(
    mu: float = Query(0, description="平均"),
    sigma: float = Query(1, description="標準偏差"),
) -> DistributionResponse:
    if sigma <= 0:
        sigma = 0.1

    start = mu - 4 * sigma
    end = mu + 4 * sigma

    # 計算ロジック
    x = np.linspace(start, end, 200)
    y = norm.pdf(x, loc=mu, scale=sigma)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)

    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"正規分布 (μ={mu}, σ={sigma})",
    )


@app.get("/api/distribution/gamma", response_model=DistributionResponse)
def get_gamma_distribution(
    alpha: float = Query(2, description="形状パラメータ"),
    beta: float = Query(2, description="尺度パラメータ"),
) -> DistributionResponse:
    if alpha <= 0:
        alpha = 0.1
    if beta <= 0:
        beta = 0.1
    start = 0
    end = alpha * beta * 3
    # 計算ロジック
    x = np.linspace(start, end, 200)
    y = gamma.pdf(x, a=alpha, scale=beta)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"ガンマ分布 (α={alpha}, β={beta})",
    )


@app.get("/api/distribution/beta", response_model=DistributionResponse)
def get_beta_distribution(
    a: float = Query(2, description="形状パラメータα"),
    b: float = Query(5, description="形状パラメータβ"),
) -> DistributionResponse:
    if a <= 0:
        a = 0.1
    if b <= 0:
        b = 0.1
    start = 0
    end = 1
    # 計算ロジック
    x = np.linspace(start, end, 200)
    y = beta.pdf(x, a=a, b=b)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"ベータ分布 (a={a}, b={b})",
    )


@app.get("/api/distribution/exponential", response_model=DistributionResponse)
def get_exponential_distribution(
    lambda_param: float = Query(1, description="レートパラメータ"),
) -> DistributionResponse:
    if lambda_param <= 0:
        lambda_param = 0.1
    start = 0
    end = 10 / lambda_param
    # 計算ロジック
    x = np.linspace(start, end, 200)
    y = expon.pdf(x, scale=1 / lambda_param)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"指数分布 (λ={lambda_param})",
    )


@app.get("/api/distribution/poisson", response_model=DistributionResponse)
def get_poisson_distribution(
    lambda_param: float = Query(3, description="平均発生率"),
) -> DistributionResponse:
    if lambda_param <= 0:
        lambda_param = 0.1
    start = 0
    end = int(lambda_param * 3)
    # 計算ロジック
    x = np.arange(start, end + 1)
    y = poisson.pmf(x, mu=lambda_param)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"ポアソン分布 (λ={lambda_param})",
    )


@app.get("/api/distribution/binomial", response_model=DistributionResponse)
def get_binomial_distribution(
    N: int = Query(10, description="試行回数"),
    p: float = Query(0.5, description="成功確率"),
) -> DistributionResponse:
    if N <= 0:
        N = 1
    if p < 0 or p > 1:
        p = 0.5
    start = 0
    end = N
    # 計算ロジック
    x = np.arange(start, end + 1)
    y = binom.pmf(x, n=N, p=p)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"二項分布 (n={N}, p={p})",
    )


@app.get("/api/distribution/geometric", response_model=DistributionResponse)
def get_geometric_distribution(
    p: float = Query(0.5, description="成功確率"),
) -> DistributionResponse:
    """
    幾何分布の確率質量関数を計算して返すエンドポイント
    ここでは、scipyのgeom.pmfを使用して、k回の試行で初めて成功が起こる確率を計算する。
    """
    if p <= 0 or p >= 1:
        p = 0.5
    start = 1
    end = 20
    # 計算ロジック
    x = np.arange(start, end + 1)
    y = geom.pmf(x, p)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"幾何分布 (p={p})",
    )


@app.get("/api/distribution/negative_binomial", response_model=DistributionResponse)
def get_negative_binomial_distribution(
    r: int = Query(5, description="成功回数"),
    p: float = Query(0.5, description="成功確率"),
) -> DistributionResponse:
    """
    負の二項分布の確率質量関数を計算して返すエンドポイント
    ここでは、scipyのnbinom.pmfを使用して、r回の成功が起こるまでにk回の失敗が起こる確率を計算する。
    """
    if r <= 0:
        r = 1
    if p <= 0 or p >= 1:
        p = 0.5
    start = 0
    end = 30
    # 計算ロジック
    x = np.arange(start, end + 1)
    y = nbinom.pmf(x, r, p)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"負の二項分布 (r={r}, p={p})",
    )


@app.get("/api/distribution/hypergeometric", response_model=DistributionResponse)
def get_hypergeometric_distribution(
    M: int = Query(20, description="母集団のサイズ"),
    n: int = Query(7, description="母集団中の成功数"),
    N: int = Query(12, description="抽出数"),
) -> DistributionResponse:
    """
    超幾何分布の確率質量関数を計算して返すエンドポイント
    ここでは、scipyのhypergeom.pmfを使用して、n回の抽出でk回の成功が起こる確率を計算する。
    """
    if M <= 0:
        M = 1
    if n < 0 or n > M:
        n = M // 2
    if N < 0 or N > M:
        N = M // 2
    start = max(0, N + n - M)
    end = min(n, N)
    # 計算ロジック
    x = np.arange(start, end + 1)
    y = hypergeom.pmf(x, M, n, N)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"超幾何分布 (M={M}, n={n}, N={N})",
    )


@app.get("/api/distribution/chi2", response_model=DistributionResponse)
def get_chisquare_distribution(
    df: float = Query(3, description="自由度"),
) -> DistributionResponse:
    if df <= 0:
        df = 0.1
    start = 0
    end = df * 4
    # 計算ロジック
    x = np.linspace(start, end, 200)
    y = chi2.pdf(x, df=df)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"カイ二乗分布 (df={df})",
    )


@app.get("/api/distribution/t", response_model=DistributionResponse)
def get_t_distribution(
    df: float = Query(3, description="自由度"),
) -> DistributionResponse:
    if df <= 0:
        df = 0.1
    start = -5
    end = 5
    # 計算ロジック
    x = np.linspace(start, end, 200)
    y = t.pdf(x, df=df)
    # to avoid infinite values in plot, clip y values
    y_clipped = np.clip(y, 0, 100)
    return DistributionResponse(
        x=x.tolist(),
        y=y_clipped.tolist(),
        title=f"t分布 (df={df})",
    )
