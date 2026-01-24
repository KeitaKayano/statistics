from typing import Any
from dataclasses import dataclass
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats._distn_infrastructure import rv_continuous_frozen, rv_discrete_frozen


@dataclass
class DistributionData:
    """Data class to hold data necessary for plotting"""

    x: np.ndarray
    y_prop: np.ndarray
    y_cdf: np.ndarray
    mean: np.ndarray
    std: np.ndarray
    is_continuous: bool


def _calculate_data(
    dist: rv_continuous_frozen | rv_discrete_frozen,
) -> DistributionData:
    """Calculate data for plotting from a distribution object

    Args:
        dist: A object having methods pdf/pmf, cdf, ppf, mean, std.

    Returns:
        DistributionData object
    """

    # 1. judge distribution type
    is_continuous = isinstance(dist, rv_continuous_frozen)

    # 2. define x-axis range
    x_min = dist.ppf(0.001)
    x_max = dist.ppf(0.999)

    # 3. generate data points
    if isinstance(dist, rv_continuous_frozen):
        x: np.ndarray = np.linspace(x_min, x_max, 1000)
        y_prop = dist.pdf(x)
    elif isinstance(dist, rv_discrete_frozen):
        x = np.arange(int(x_min), int(x_max) + 1)
        y_prop = dist.pmf(x)

    y_cdf = dist.cdf(x)
    mean = dist.mean()
    std = dist.std()

    return DistributionData(
        x=x,
        y_prop=y_prop,
        y_cdf=y_cdf,
        mean=np.array(mean),
        std=np.array(std),
        is_continuous=is_continuous,
    )


def _render_plot(data: DistributionData, title: str) -> None:
    """plot the distribution using the provided data"""

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    fig.suptitle(f"{title} (Mean={data.mean:.2f}, Std={data.std:.2f})", fontsize=16)

    # --- Left Plot: PDF/PMF ---
    ax1 = axes[0]
    if data.is_continuous:
        ax1.plot(data.x, data.y_prop, label="PDF", color="blue")
        ax1.fill_between(data.x, data.y_prop, alpha=0.3, color="blue")
        ax1.set_ylabel("Probability Density")
    else:
        ax1.stem(data.x, data.y_prop, basefmt=" ", label="PMF")
        ax1.set_ylabel("Probability Mass")
        ax1.set_xticks(data.x)

    # plot line of mean and std
    ax1.axvline(data.mean, color="orange", linestyle="--", label="Mean")
    ax1.axvline(
        data.mean - data.std, color="green", linestyle="--", label="Mean ± 1 Std"
    )
    ax1.axvline(data.mean + data.std, color="green", linestyle="--")
    ax1.set_title("PDF/PMF")
    ax1.set_xlabel("x")
    ax1.set_ylim(bottom=0)
    ax1.legend()

    # --- Right Plot: CDF ---
    ax2 = axes[1]
    if data.is_continuous:
        ax2.plot(data.x, data.y_cdf, label="CDF", color="red", linewidth=2)
    else:
        ax2.step(
            data.x, data.y_cdf, where="post", label="CDF", color="red", linewidth=2
        )
        ax2.set_xticks(data.x)

    ax2.set_title("CDF")
    ax2.set_xlabel("x")
    ax2.set_ylabel("Cumulative Probability")
    ax2.set_ylim(0, 1)
    ax2.legend()

    plt.show()


def plot_distribution(dist: Any, title: str = "Distribution") -> None:
    """
    receives a frozen object from scipy.stats and plots its PDF/PMF and CDF.
    """
    data = _calculate_data(dist)

    _render_plot(data, title)
