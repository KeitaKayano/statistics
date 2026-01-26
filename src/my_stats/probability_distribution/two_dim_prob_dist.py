import numpy as np
from dataclasses import dataclass
import matplotlib.pyplot as plt


@dataclass
class TwoDimensionalDistributionData:
    """Data class to hold data necessary for plotting multivariate distributions (2D)"""

    X: np.ndarray  # X-axis meshgrid
    Y: np.ndarray  # Y-axis meshgrid
    Z: np.ndarray  # PDF values (height) at each (X, Y)


def render_plot_2d(data: TwoDimensionalDistributionData, title: str) -> None:
    """
    2次元分布をプロットする
    data.x, data.y: 1次元の軸データ (または meshgrid)
    data.z: 確率密度/確率質量の2次元配列 (shapeは x, y に対応)
    data.mean: [mean_x, mean_y] のリストまたは配列
    data.std: [std_x, std_y] のリストまたは配列（簡易的な表示のため周辺標準偏差を使用）
    """

    # グリッドデータの準備（もしdata.x, data.yが1次元配列ならmeshgrid化する）
    fig = plt.figure(figsize=(14, 6))
    fig.suptitle(f"{title}", fontsize=16)

    # --- Left Plot: 3D Surface (鳥瞰図) ---
    # 3Dプロット用のサブプロットを追加
    ax1 = fig.add_subplot(1, 2, 1, projection="3d")

    # 連続: 滑らかな曲面
    surf = ax1.plot_surface(
        data.X, data.Y, data.Z, cmap="viridis", edgecolor="none", alpha=0.8
    )
    ax1.set_zlabel("Probability Density")

    ax1.set_title("3D View")
    ax1.set_xlabel("X")
    ax1.set_ylabel("Y")
    fig.colorbar(surf, ax=ax1, shrink=0.5, aspect=5, label="Probability")

    # --- Right Plot: Contour / Heatmap (真上からの図) ---
    ax2 = fig.add_subplot(1, 2, 2)

    # 等高線 (Contour)
    cf = ax2.contourf(data.X, data.Y, data.Z, cmap="viridis", levels=20)
    # 等高線も少し描画
    ax2.contour(data.X, data.Y, data.Z, colors="k", linewidths=0.5, alpha=0.5)

    fig.colorbar(cf, ax=ax2, label="Probability")

    ax2.set_title("Top-down View (Contour)")
    ax2.set_xlabel("X")
    ax2.set_ylabel("Y")

    plt.tight_layout()
    plt.show()
