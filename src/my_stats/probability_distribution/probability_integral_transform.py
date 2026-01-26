import numpy as np
import matplotlib.pyplot as plt


def visualize_pit(dist, n_samples: int) -> None:
    """Visualize the Probability Integral Transform (PIT) process.

    Args:
        dist: A continuous probability distribution object with methods `rvs`, `cdf`, and `pdf`.
        n_samples: Number of samples to generate from the source distribution.
    """
    # 1. generate samples from the source distribution
    # (in rvs, sampling is done using inverse of the CDF internally.)
    x = dist.rvs(size=n_samples)

    # 2. execute the probability integral transform
    # Passing the values of x through the CDF of the distribution results in a uniform distribution between 0 and 1
    u = dist.cdf(x)

    # --- Prepare plots ---
    fig, axes = plt.subplots(1, 3, figsize=(18, 6))
    plt.subplots_adjust(wspace=0.3)

    # Define range for plotting
    x_grid = np.linspace(min(x), max(x), 1000)

    # --- Left plot: Source Distribution ---
    axes[0].hist(
        x, bins=50, density=True, color="skyblue", alpha=0.7, label="Sampled Data"
    )
    axes[0].plot(x_grid, dist.pdf(x_grid), "b-", lw=2, label="True PDF")
    axes[0].set_title(r"1. Source Distribution $X \sim N(0, 1)$", fontsize=14)
    axes[0].set_xlabel("x")
    axes[0].set_ylabel("Density")
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)

    # --- Middle plot: Transformation Mechanism (CDF) ---
    # CDF curve
    axes[1].plot(x_grid, dist.cdf(x_grid), "k-", lw=2, label="CDF $F(x)$")

    # Add visual arrows for some representative points
    points_to_trace = [-1, 0, 1]  # Points at each sigma
    colors = ["red", "green", "purple"]

    for pt, col in zip(points_to_trace, colors):
        val_cdf = dist.cdf(pt)

        # Vertical line (x-axis -> curve)
        axes[1].plot([pt, pt], [0, val_cdf], color=col, linestyle="--", alpha=0.6)
        # Horizontal line (curve -> y-axis)
        axes[1].plot(
            [pt, 4], [val_cdf, val_cdf], color=col, linestyle="--", alpha=0.6
        )  # 4 is to extend to the right edge
        # Intersection point
        axes[1].plot(pt, val_cdf, "o", color=col)

        # Annotation
        axes[1].annotate(
            "",
            xy=(4, val_cdf),
            xytext=(pt, val_cdf),
            arrowprops=dict(arrowstyle="->", color=col),
        )

    axes[1].set_title(r"2. Transformation via CDF $U = F(X)$", fontsize=14)
    axes[1].set_xlabel("x")
    axes[1].set_ylabel("u (Probability)")
    axes[1].set_xlim(-4, 4)
    axes[1].set_ylim(0, 1.05)
    axes[1].grid(True, alpha=0.3)
    axes[1].text(
        -3.5,
        0.9,
        "Input $x$ maps to\nOutput $u$",
        fontsize=12,
        bbox=dict(facecolor="white", alpha=0.8),
    )

    # --- Right plot: Transformed Distribution (Uniform) ---
    axes[2].hist(
        u, bins=50, density=True, color="orange", alpha=0.7, label="Transformed Data"
    )
    axes[2].plot(
        [0, 1], [1, 1], "r--", lw=2, label="Uniform PDF"
    )  # Theoretical uniform distribution
    axes[2].set_title(r"3. Target Distribution $U \sim Uniform(0, 1)$", fontsize=14)
    axes[2].set_xlabel("u")
    axes[2].set_ylabel("Density")
    axes[2].set_xlim(0, 1)
    axes[2].set_ylim(0, 1.5)
    axes[2].legend()
    axes[2].grid(True, alpha=0.3)

    plt.suptitle("Probability Integral Transform Visualization", fontsize=20)
    plt.tight_layout()
    plt.show()
