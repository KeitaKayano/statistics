from fastapi import APIRouter, Query
import numpy as np
from app.schemas import SamplingResponse

router = APIRouter()


@router.get("/negative-binomial", response_model=SamplingResponse)
def sample_negative_binomial(
    r: int = Query(5, description="成功回数"),
    p: float = Query(0.5, description="成功確率"),
    size: int = Query(1000, description="サンプル数"),
) -> SamplingResponse:
    if r <= 0:
        r = 1
    if p <= 0 or p >= 1:
        p = 0.5
    if size <= 0:
        size = 1000

    rng = np.random.default_rng()
    samples = rng.negative_binomial(n=r, p=p, size=size)

    return SamplingResponse(samples=samples.tolist())


@router.get("/geometric", response_model=SamplingResponse)
def sample_geometric(
    p: float = Query(0.5, description="成功確率"),
    size: int = Query(1000, description="サンプル数"),
) -> SamplingResponse:
    if p <= 0 or p >= 1:
        p = 0.5
    if size <= 0:
        size = 1000

    rng = np.random.default_rng()
    samples = rng.geometric(p=p, size=size) - 1  # 成功までの失敗回数を得るために1を引く

    return SamplingResponse(samples=samples.tolist())


@router.get("/geometric-sum", response_model=SamplingResponse)
def sample_geometric_sum(
    p: float = Query(0.5, description="成功確率"),
    r: int = Query(10, description="幾何分布の和を取る回数"),
    size: int = Query(1000, description="サンプル数"),
) -> SamplingResponse:
    if p <= 0 or p >= 1:
        p = 0.5
    if r <= 0:
        r = 10
    if size <= 0:
        size = 1000

    rng = np.random.default_rng()
    samples = np.sum(rng.geometric(p=p, size=(size, r)) - 1, axis=1)

    return SamplingResponse(samples=samples.tolist())
