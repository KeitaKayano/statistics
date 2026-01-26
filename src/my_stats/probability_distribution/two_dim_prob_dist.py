import numpy as np
from dataclasses import dataclass
import matplotlib.pyplot as plt


def multi_dist_check(dist) -> bool:
    """Check if the distribution is multivariate (2D)"""
    return hasattr(dist, "mean") and hasattr(dist, "cov") and hasattr(dist, "pdf")


@dataclass
class TwoDimensionalDistributionData:
    """Data class to hold data necessary for plotting multivariate distributions (2D)"""

    X: np.ndarray  # X-axis meshgrid
    Y: np.ndarray  # Y-axis meshgrid
    Z: np.ndarray  # PDF values (height) at each (X, Y)


def _calculate_multi_data(
    dist,
) -> TwoDimensionalDistributionData:
    """Calculate data for plotting from a multi-distribution object

    Args:
        dist: A frozen multivariate normal distribution object.
        dist should have methods pdf, mean, cov.

    Returns:
        TwoDimensionalDistributionData object containing meshgrids and PDF values.
    """
    multi_dist_check(dist)

    # 1. Get statistics
    mean = np.array(dist.mean())
    cov = np.array(dist.cov())
    assert mean.shape == (2,), "Mean vector must be 2-dimensional"
    assert cov.shape == (2, 2), "Covariance matrix must be 2x2"

    # Diagonal elements of covariance matrix are variances
    print(cov.shape)
    print(cov)
    stds = np.sqrt(np.diag(cov))

    # 2. Define range (Mean +/- 4 Std Dev)
    # Since multivariate dists don't have .ppf(), we estimate range from sigma.
    k = 4.0
    x_min, x_max = mean[0] - k * stds[0], mean[0] + k * stds[0]
    y_min, y_max = mean[1] - k * stds[1], mean[1] + k * stds[1]

    # 3. Generate 2D Grid (Meshgrid)
    # Creating a 100x100 grid
    x_lin = np.linspace(x_min, x_max, 100)
    y_lin = np.linspace(y_min, y_max, 100)
    X, Y = np.meshgrid(x_lin, y_lin)

    # 4. Calculate PDF
    # Pack into shape (N, M, 2) for scipy's pdf method
    pos = np.dstack((X, Y))
    pos_flat = pos.reshape(-1, 2)
    print(pos_flat.shape)
    Z = dist.pdf(pos_flat.T)
    Z_reshaped = Z.reshape(X.shape)
    print(Z_reshaped.shape)

    return TwoDimensionalDistributionData(
        X=X,
        Y=Y,
        Z=Z_reshaped,
    )


def create_dirichlet_input(num_points: int = 10000):
    x = np.linspace(0, 1, int(np.sqrt(num_points)))
    y = np.linspace(0, 1, int(np.sqrt(num_points)))
    X, Y = np.meshgrid(x, y)
    Z = 1.0 - X - Y

    mask = Z >= 0

    valid_X = X[mask]
    valid_Y = Y[mask]
    valid_Z = Z[mask]

    points = np.vstack([valid_X, valid_Y, valid_Z])

    # 修正点: 元のグリッド X, Y も返す
    return points, mask, X, Y


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
