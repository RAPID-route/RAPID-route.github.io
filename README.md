# RAPID-route: MadDE-NDA

<p align="center">
  <b>Collision-Free Path Planning for Underwater Gliders in Time-Varying Currents via Dual-Archive Niching Differential Evolution</b>
</p>

<p align="center">
  <a href="https://rapid-route.github.io/">
    <img src="https://img.shields.io/badge/Project-Website-blue" alt="Project Website">
  </a>
  <img src="https://img.shields.io/badge/Journal-Ocean%20Engineering-blue" alt="Ocean Engineering">
  <img src="https://img.shields.io/badge/Status-Accepted-success" alt="Accepted">
  <img src="https://img.shields.io/badge/Application-Underwater%20Glider-orange" alt="Underwater Glider">
</p>

## Overview

This repository hosts the official project website and supplementary visual materials for our paper:

> **Collision-Free Path Planning for Underwater Gliders in Time-Varying Currents via Dual-Archive Niching Differential Evolution**

The paper has been accepted for publication in **Ocean Engineering**.

The study presents **MadDE-NDA**, a GPU-accelerated planning framework for long-range underwater-glider missions in complex, time-varying ocean environments. The framework jointly considers ocean-current-assisted navigation, dynamic reachability, three-dimensional seabed collision avoidance, and mission travel time.

Rather than directly optimizing a variable-length sequence of heading commands, the proposed method uses a fixed-dimensional B-spline representation and reconstructs the resulting route into executable dive–climb profiles. A dual-archive niching differential evolution algorithm is then employed to explore multiple feasible route corridors while maintaining both solution quality and population diversity.

## Project Website

The complete project page is available at:

### [https://rapid-route.github.io/](https://rapid-route.github.io/)

The website provides:

- detailed descriptions of the planning framework;
- B-spline trajectory encoding and waypoint reconstruction;
- GPU-based RK4 dynamic-feasibility evaluation;
- ESDF-based continuous collision checking;
- MadDE-NDA optimization mechanisms;
- experimental results for five real-world ocean regions;
- two-dimensional route animations;
- three-dimensional dive–climb trajectory visualizations;
- GPU acceleration and collision-checking benchmarks.

## Method Highlights

### Fixed-Dimensional B-Spline Encoding

The horizontal route is represented using a fixed number of B-spline control-point offsets. This avoids the variable-dimensional optimization problem caused by different numbers of underwater-glider dive–climb cycles.

### Time-Varying Dynamic Verification

Candidate routes are evaluated through forward numerical simulation using fourth-order Runge–Kutta integration. The evaluation considers the spatial and temporal variations of real ocean-current data.

### Continuous 3D Collision Checking

A three-dimensional Euclidean Signed Distance Field is constructed from seabed bathymetry. ESDF-guided sphere tracing is used to detect potential collisions along the continuous dive–climb trajectory.

### MadDE-NDA Optimization

MadDE-NDA extends differential evolution with:

- a quality archive for retaining historically competitive solutions;
- a diversity archive for preserving structurally different search information;
- stagnation-triggered niching for escaping inferior route corridors;
- adaptive archive-source sampling for balancing exploitation and exploration.

### GPU-Accelerated Evaluation

The computationally intensive trajectory reconstruction, RK4 integration, reachability analysis, and collision checking procedures are evaluated in parallel on the GPU.

## Visual Materials

The project website contains supplementary animations for five planning cases.

For each case, we provide:

- a **2D horizontal-route animation** over the time-varying ocean-current field;
- a **3D trajectory animation** showing the reconstructed dive–climb motion relative to the seabed terrain.

These materials demonstrate the current-aware, terrain-aware, and physically executable characteristics of the planned routes.

## Repository Structure

```text
RAPID-route.github.io/
├── assets/                 # Figures, animations, and website resources
├── real_data/              # Data used by the project website
├── index.markdown          # English project page
├── index_cn.markdown       # Chinese project page
├── 2_about.markdown        # About page
├── _config.yml             # GitHub Pages configuration
└── README.md               # Repository introduction
