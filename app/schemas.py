from pydantic import BaseModel
from typing import List


# 全体のレスポンス定義
class DistributionResponse(BaseModel):
    x: List[float] | List[int]
    y: List[float]
    title: str
