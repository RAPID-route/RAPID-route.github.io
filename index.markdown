---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default  
---

<style>
  .wrapper {
    max-width: 1300px !important; 
    padding-right: 20px;
    padding-left: 20px;
  }
</style>


## **MadDE-NDA:** Collision-Free Time-Optimal Planning of Underwater Gliders in Time-Varying Currents via Adaptive **N**iching **D**ual-**A**rchive Differential Evolution

This project presents a state-of-the-art GPU-accelerated 4D path planning framework designed for **Autonomous Underwater Gliders (AUGs)** operating in complex, time-varying ocean environments. To overcome the curse of dimensionality and the spatiotemporal causal chain in long-range missions, we propose a fixed-dimensional **B-spline trajectory encoding** combined with a novel evolutionary optimizer, **MadDE-NDA** (Niching Dual-Archive Differential Evolution). By leveraging massive **GPU parallelism**, the framework rigorously evaluates dynamic feasibility and continuous-domain collision safety in seconds.

### Key Features 

*   **📉 Fixed-Dimensional B-Spline Encoding:** Transforms the traditional variable-length, profile-wise routing problem into a compact, fixed-dimensional search space using B-spline control points in a local coordinate system, significantly improving optimization efficiency for long-endurance missions.
*   **🧬 Adaptive Niching Dual-Archive Evolution (MadDE-NDA):** Introduces dual cooperative archives for quality retention and diversity preservation, coupled with a stagnation-triggered niching scheme. This prevents premature convergence and robustly explores highly multimodal route corridors induced by complex terrain and currents.
*   **🛡️ Strict Continuous 3D Obstacle Avoidance:** Utilizes a Euclidean Signed Distance Field (ESDF) combined with adaptive **Sphere Tracing** (Ray Marching). This completely eliminates the "tunneling effect" of traditional discrete sampling, ensuring absolute safety against high-resolution **GEBCO seabed topography**. 
*   **🚀 GPU-Accelerated 4D Dynamic Verification:** Employs parallel 4th-order Runge-Kutta (RK4) integration on the GPU to strictly evaluate time-varying kinematics using **4D CMEMS ocean data**. The population-level parallel architecture reduces evaluation time by orders of magnitude (up to 18.6× speedup), making time-optimal planning computationally tractable.


<!-- ========================================================= -->
<!-- Added project-story sections: research motivation, method -->
<!-- pipeline, optimizer design, and experimental evidence.     -->
<!-- ========================================================= -->

<style>
  .story-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
    margin: 22px 0 32px 0;
  }
  .story-card {
    border: 1px solid rgba(128,128,128,0.22);
    border-radius: 12px;
    padding: 18px 20px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
    background: rgba(255,255,255,0.02);
  }
  .story-card h4 {
    margin-top: 0;
    margin-bottom: 8px;
  }
  .figure-box {
    margin: 22px auto 34px auto;
    text-align: center;
    width: 100%;
  }
  .figure-box img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 16px rgba(0,0,0,0.16);
    border: 1px solid rgba(128,128,128,0.20);
  }
  .figure-caption {
    margin-top: 8px;
    color: #666;
    font-size: 0.92rem;
    line-height: 1.45;
  }
  .pipeline-step {
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(0, 86, 179, 0.09);
    white-space: nowrap;
  }
</style>

### Research Storyline

The central idea of this work is to make **long-range underwater glider planning** simultaneously **compact**, **physically executable**, **collision-safe**, and **computationally tractable**. Unlike short-range geometric path planning, a practical underwater glider mission is a 4D planning problem: the vehicle moves in 3D space while the ocean current changes over time. Therefore, the final route must not only be short or smooth, but also reachable under current disturbances and safe with respect to real seabed terrain.

<div class="story-grid">
  <div class="story-card">
    <h4>1. From variable-length profiles to fixed-dimensional search</h4>
    <p>Traditional profile-wise heading encoding directly optimizes a sequence of heading commands. In long missions, the number of glide profiles may vary across candidates, causing variable-length decision vectors and making standard DE operators inconvenient. MadDE-NDA instead optimizes a fixed number of B-spline lateral offsets.</p>
  </div>
  <div class="story-card">
    <h4>2. From geometric curves to executable glider motion</h4>
    <p>The B-spline route is decoded into cycle-consistent waypoints through chord-length sampling. Each segment corresponds to one dive-climb cycle, so the optimized curve can be mapped back to the actual motion pattern of an underwater glider.</p>
  </div>
  <div class="story-card">
    <h4>3. From discrete obstacle checks to continuous safety</h4>
    <p>Fixed-step collision checking may miss terrain intrusions between samples. The proposed planner builds an ESDF from GEBCO bathymetry and uses sphere tracing to adaptively check the continuous 3D trajectory against the seabed.</p>
  </div>
  <div class="story-card">
    <h4>4. From generic DE to route-corridor-aware evolution</h4>
    <p>Time-varying currents and seabed morphology can create several competing feasible corridors. MadDE-NDA enhances MadDE with quality/diversity archives and stagnation-triggered niching so that the population can exploit good basins while still escaping inferior route corridors.</p>
  </div>
</div>

<div class="figure-box">
  <img src="assets/img/fig_01_challenges.png" alt="Main challenges in DE-based underwater glider 4D path planning">
  <div class="figure-caption">
    <strong>Recommended image:</strong> main challenges of DE-based long-range underwater glider 4D path planning, including variable-length decision variables, spatiotemporal causal coupling, and missed collisions under sparse fixed-step checking.
  </div>
</div>

### End-to-End Framework

The framework can be understood as a closed-loop optimization-and-verification pipeline:

<p style="line-height: 2.1;">
  <span class="pipeline-step">GEBCO bathymetry</span> +
  <span class="pipeline-step">CMEMS currents</span> →
  <span class="pipeline-step">ESDF construction</span> →
  <span class="pipeline-step">B-spline encoding</span> →
  <span class="pipeline-step">Chord-length waypoint decoding</span> →
  <span class="pipeline-step">RK4 dynamic verification</span> →
  <span class="pipeline-step">ESDF sphere tracing</span> →
  <span class="pipeline-step">GPU fitness evaluation</span> →
  <span class="pipeline-step">MadDE-NDA optimization</span> →
  <span class="pipeline-step">collision-free time-optimal route</span>
</p>

In each generation, candidate decision vectors define B-spline control-point offsets. These offsets are decoded into horizontal waypoints and reconstructed into 3D dive-climb profiles. The GPU backend then evaluates travel time, reachability, and collision penalties for the whole population. The resulting fitness values guide MadDE-NDA to update the population, archives, mutation probabilities, and archive-source sampling probabilities.

### Problem Definition

Given a start point, a goal point, a prescribed dive depth, a fixed pitch angle, real seabed topography, and time-varying ocean currents, the planner searches for a route that minimizes total travel time while satisfying three types of constraints:

* **Terminal reachability:** the glider should arrive within the target region after executing a sequence of dive-climb cycles.
* **Dynamic feasibility:** for each segment, the horizontal velocity of the glider must be able to compensate the cross-current component and maintain the desired ground-track direction.
* **Collision safety:** the reconstructed 3D trajectory must remain outside the seabed obstacle region with a prescribed safety margin.

This formulation makes the task more demanding than ordinary 2D shortest-path planning, because the quality of a route depends on the arrival time at each segment, the local current encountered at that time, and the terrain clearance along the full 3D profile.

### B-Spline Trajectory Encoding

MadDE-NDA does not directly optimize hundreds of heading commands. Instead, it represents the horizontal route using a cubic B-spline curve in a local coordinate system aligned with the start-goal direction. The longitudinal coordinates of the intermediate control points are fixed along the start-goal line, and only their lateral offsets are optimized. This design has two practical benefits:

* The decision dimension remains fixed and small even for long missions.
* The generated trajectory naturally progresses from the start region to the goal region, reducing unnecessary backtracking and detours.

After optimization, the continuous B-spline curve is decoded into waypoints using chord-length sampling. The chord interval is chosen according to the horizontal distance traveled in one dive-climb cycle, which links the optimized geometric path to the glider's executable profile-level motion.

<div class="figure-box">
  <img src="assets/img/fig_05_bspline_encoding.png" alt="B-spline encoding and chord-length waypoint decoding">
  <div class="figure-caption">
    <strong>Recommended image:</strong> B-spline-based trajectory representation. Panel (a) should show fixed start/goal points and optimizable lateral control-point offsets; panel (b) should show chord-length waypoint decoding for dive-climb execution.
  </div>
</div>

### Dynamic Feasibility Verification

Because ocean currents are time-varying, the trajectory evaluation is sequential by nature. The arrival time and terminal position of one glide profile determine the current field encountered at the next profile. MadDE-NDA therefore verifies each candidate route through forward numerical simulation rather than treating segments as independent geometric edges.

For each decoded path segment, the planner performs RK4-based forward integration under the local current field. At each integration step, the cross-current component is checked against the glider's horizontal velocity capability. If the glider cannot compensate the cross-current and maintain the desired direction, the segment is marked infeasible and penalized. This ensures that the final route is not only geometrically valid, but also physically executable under time-varying currents.

<div class="figure-box">
  <img src="assets/img/fig_03_current_reachability.png" alt="Reachability analysis under ocean currents">
  <div class="figure-caption">
    <strong>Recommended image:</strong> geometric reachability analysis under ocean currents, including feasible, boundary-feasible, and infeasible cases depending on the cross-current magnitude.
  </div>
</div>

### Continuous-Domain Collision Checking

To improve safety over complex seabed terrain, the planner constructs a 3D Euclidean Signed Distance Field (ESDF) from GEBCO bathymetry. The ESDF provides signed distance queries: positive values indicate free space, whereas negative values indicate penetration into the seabed. Based on this representation, sphere tracing is used to check each descent/ascent segment of the reconstructed sawtooth trajectory.

Compared with fixed-step sampling, sphere tracing adaptively adjusts the checking step according to the local distance to obstacles. It can move quickly in open water and become conservative near seabed structures. This mechanism provides a better safety-efficiency balance for high-frequency population-level collision checking.

<div class="figure-box">
  <img src="assets/img/fig_06_sphere_tracing.png" alt="ESDF sphere tracing versus fixed-step collision checking">
  <div class="figure-caption">
    <strong>Recommended image:</strong> comparison between ESDF-based sphere tracing and fixed-step sampling. The figure should emphasize that sparse uniform checks may skip collisions, whereas sphere tracing adapts its step size based on signed distance.
  </div>
</div>

### MadDE-NDA Optimizer

MadDE-NDA is developed on top of the original MadDE framework. The motivation is that underwater glider routing is often multimodal: several feasible route corridors may exist, and a population may converge prematurely to a locally feasible but globally inferior corridor. MadDE-NDA introduces three route-planning-oriented mechanisms:

<div class="story-grid">
  <div class="story-card">
    <h4>Quality Archive</h4>
    <p>The quality archive stores historically competitive replaced parents. It provides promising search directions for archive-assisted mutation and strengthens exploitation around high-quality route basins.</p>
  </div>
  <div class="story-card">
    <h4>Diversity Archive</h4>
    <p>The diversity archive stores selected rejected offspring according to novelty and quality. It acts as a diversity-oriented reservoir and injects alternative structural information into mutation.</p>
  </div>
  <div class="story-card">
    <h4>Stagnation-Triggered Niching</h4>
    <p>When the best fitness stagnates for several generations, the algorithm enters an escape stage. Elite individuals still follow greedy selection, while non-elite offspring compete with nearby non-elite parents through crowding-based replacement.</p>
  </div>
  <div class="story-card">
    <h4>Adaptive Source Sampling</h4>
    <p>The probability of sampling from the population, quality archive, or diversity archive is updated according to historical fitness improvements. This lets the optimizer adjust its exploitation-exploration balance during evolution.</p>
  </div>
</div>

### GPU-Accelerated Population-Level Evaluation

The most expensive part of the planner is fitness evaluation: every candidate route must be reconstructed, dynamically integrated, checked for reachability, and verified for collision safety. To make this tractable, the framework offloads the evaluation stage to the GPU. The CPU manages evolutionary operations and population updates, while the GPU performs batched RK4 integration and ESDF-based sphere tracing for many candidate trajectories in parallel.

This design is especially suitable for evolutionary planning because each candidate solution can be evaluated independently at the population level, even though the profile sequence inside each candidate remains temporally coupled. In practice, the GPU backend substantially reduces the wall-clock cost of repeated fitness evaluations and makes long-range 4D underwater glider planning practical.

<div class="figure-box">
  <img src="assets/img/fig_framework_pipeline.png" alt="GPU-accelerated parallel evaluation pipeline">
  <div class="figure-caption">
    <strong>Recommended image:</strong> CPU-GPU division of labor. The CPU runs the DE loop and transfers decoded trajectory descriptors, while the GPU returns travel time, feasibility flags, and collision penalties after parallel evaluation.
  </div>
</div>

### Visual Results

<div style="display: flex; flex-direction: column; gap: 50px; align-items: center; margin-bottom: 50px; margin-top: 20px; width: 100%;">

  <!-- ================= Case 1 ================= -->
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; width: 100%;">
    <!-- Case 1: 2D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 1 (2D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_1.mp4" type="video/mp4">
      </video>
    </div>
    <!-- Case 1: 3D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #28a745; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 1 (3D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_1_3D.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <!-- ================= Case 2 ================= -->
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; width: 100%;">
    <!-- Case 2: 2D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 2 (2D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_2.mp4" type="video/mp4">
      </video>
    </div>
    <!-- Case 2: 3D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #28a745; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 2 (3D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_2_3D.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <!-- ================= Case 3 ================= -->
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; width: 100%;">
    <!-- Case 3: 2D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 3 (2D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_3.mp4" type="video/mp4">
      </video>
    </div>
    <!-- Case 3: 3D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #28a745; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 3 (3D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_3_3D.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <!-- ================= Case 4 ================= -->
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; width: 100%;">
    <!-- Case 4: 2D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 4 (2D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_4.mp4" type="video/mp4">
      </video>
    </div>
    <!-- Case 4: 3D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #28a745; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 4 (3D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_4_3D.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <!-- ================= Case 5 ================= -->
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; width: 100%;">
    <!-- Case 5: 2D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 5 (2D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_5.mp4" type="video/mp4">
      </video>
    </div>
    <!-- Case 5: 3D -->
    <div style="flex: 1 1 48%; min-width: 350px; position: relative;">
      <div style="position: absolute; bottom: 15px; left: 15px; background-color: #28a745; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
        Case 5 (3D View)
      </div>
      <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
        <source src="assets/video/case_5_3D.mp4" type="video/mp4">
      </video>
    </div>
  </div>

</div>


### Experimental Evidence

The experiments are designed to answer four practical questions: **Can the planner find feasible routes? Does MadDE-NDA improve the MadDE backbone? Are the generated routes physically plausible? Is the GPU/ESDF implementation efficient enough for repeated population evaluation?**

#### Simulation cases

Five real-world planning cases are constructed from GEBCO bathymetry and CMEMS current data in the northern South China Sea and adjacent Philippine Sea. The cases cover different mission lengths, dive depths, safety margins, and terrain-current conditions.

| Case | Dive depth | Safety margin | Start → Goal | Current window |
|:---:|:---:|:---:|:---|:---|
| 1 | 1000 m | 50 m | `[120.90, 20.60]` → `[121.60, 21.40]` | 2025-11-21 to 2025-12-11 |
| 2 | 550 m | 15 m | `[111.65, 16.10]` → `[112.40, 16.70]` | 2025-11-21 to 2025-12-11 |
| 3 | 1500 m | 50 m | `[122.38, 22.00]` → `[128.30, 24.40]` | 2025-11-11 to 2025-12-11 |
| 4 | 1000 m | 25 m | `[114.70, 16.65]` → `[110.80, 17.50]` | 2025-11-21 to 2025-12-11 |
| 5 | 550 m | 25 m | `[110.20, 14.10]` → `[110.80, 17.20]` | 2025-11-21 to 2025-12-11 |

<div class="figure-box">
  <img src="assets/img/fig_08_simulation_cases.png" alt="Geographical distribution of the five simulation cases">
  <div class="figure-caption">
    <strong>Recommended image:</strong> geographical overview of the five planning regions, with square markers for starts and star markers for goals.
  </div>
</div>

#### Compared algorithms and metrics

MadDE-NDA is compared with six representative DE variants: **JADE**, **L-SHADE**, **SaDE**, **IMODE**, **MadDE**, and **NL-SHADE-LBC**. All methods use the same B-spline decision representation, search bounds, and GPU-based fitness evaluation backend. Each algorithm is independently run **31 times** on each case with a common budget of **25,000 fitness evaluations**.

The comparison reports four groups of metrics:

* **Success rate:** whether a feasible route reaches the goal region under the prescribed constraints.
* **Fitness:** the composite optimization objective, including travel time and constraint penalties.
* **Travel time:** the mission-oriented physical objective measured in hours.
* **Runtime:** the wall-clock cost of optimization under the same evaluation backend.

#### Main quantitative findings

* **Robust feasibility:** MadDE-NDA obtains a success rate of `1.0` in all five cases, including the difficult Case 5 where several competing methods show reduced success rates.
* **Overall fitness advantage:** MadDE-NDA achieves the best average fitness in four of the five cases. The only exception is Case 3, where the proposed NDA mechanism still substantially improves the original MadDE backbone.
* **Statistical ranking:** Over all `5 × 31 = 155` matched runs, MadDE-NDA obtains the best Friedman average rank (`2.9710`). Under the Bonferroni-Dunn post-hoc test, it significantly outperforms JADE, L-SHADE, SaDE, IMODE, and NL-SHADE-LBC.
* **Time-optimal benefit over MadDE:** A supplementary paired Wilcoxon signed-rank test on travel time gives `p = 7.58 × 10^-9`. MadDE-NDA achieves shorter travel time than MadDE in `105 / 155` matched blocks, supporting the advantage of the proposed niching dual-archive design on the core time-optimal objective.
* **Stable route quality:** In representative visualizations, MadDE-NDA tends to generate smoother and less tortuous routes while maintaining clear terrain clearance.

<div class="figure-box">
  <img src="assets/img/fig_09_average_fitness.png" alt="Average fitness comparison over the five cases">
  <div class="figure-caption">
    <strong>Recommended image:</strong> average fitness values of different algorithms over the five simulation cases.
  </div>
</div>

<div class="figure-box">
  <img src="assets/img/fig_11_cd_diagram.png" alt="Critical-difference diagram of algorithm ranks">
  <div class="figure-caption">
    <strong>Recommended image:</strong> critical-difference diagram showing the average rank of each DE variant over 155 matched blocks.
  </div>
</div>

#### Physical trajectory visualization

The 3D trajectory results show that the optimized routes are not merely abstract 2D curves. They are reconstructed into repeated dive-climb profiles over real bathymetric surfaces. Across the five cases, the trajectories remain collision-free and keep clear separation from high-relief seabed structures, demonstrating that the framework can integrate trajectory smoothness, current-aware reachability, and terrain safety into a unified planning result.

<div class="figure-box">
  <img src="assets/img/fig_12_3d_trajectories.png" alt="3D MadDE-NDA trajectories over GEBCO seabed terrains">
  <div class="figure-caption">
    <strong>Recommended image:</strong> 3D visualization of the representative median-fitness MadDE-NDA trajectories over the corresponding GEBCO seabed terrains.
  </div>
</div>

#### Efficiency analysis

Two efficiency studies are included. First, the GPU backend is compared with a CPU-only backend for batch fitness evaluation. The steady-state GPU speedup ranges from approximately **4.7× to 18.65×**, confirming that GPU acceleration is highly beneficial for repeated population-level evaluation. Second, the ESDF sphere-tracing checker is compared with dense and sparse fixed-step sampling. The results demonstrate that sphere tracing provides an efficient adaptive checking strategy while avoiding the missed-collision risk of sparse sampling.

<div class="figure-box">
  <img src="assets/img/fig_13_gpu_speedup.png" alt="GPU versus CPU backend benchmark results">
  <div class="figure-caption">
    <strong>Recommended image:</strong> GPU-versus-CPU benchmark showing mean batch-evaluation time and speedup across the five cases.
  </div>
</div>

<div class="figure-box">
  <img src="assets/img/fig_14_collision_checking_benchmark.png" alt="Collision checking benchmark of dense sampling, sparse sampling, and sphere tracing">
  <div class="figure-caption">
    <strong>Recommended image:</strong> comparison of dense fixed-step sampling, sparse fixed-step sampling, and ESDF-based sphere tracing in terms of checking time and ESDF query count.
  </div>
</div>

### What the Visual Results Show

The videos above provide dynamic views of the final planned routes. The **2D videos** show the horizontal route evolution over the ocean-current background, while the **3D videos** show the reconstructed dive-climb trajectory relative to seabed topography. Together, they demonstrate three core properties of the proposed method:

1. **Current-aware routing:** the route is shaped by the time-varying ocean environment rather than simply following the shortest geometric line.
2. **Terrain-aware safety:** the 3D trajectory avoids bathymetric obstacles and maintains safety margins.
3. **Executable glider motion:** the planned path can be reconstructed into repeated dive-climb profiles, matching the operational pattern of underwater gliders.

### Status

This work is currently under review at **Ocean Engineering**. Data and Code will be made available on reasonable request.

### BibTeX

If you find our work helpful, please consider citing it:

```Latex
@article{li2024collision,
      title={Collision-Free Time-Optimal Planning of Underwater Gliders in Time-Varying Currents via Adaptive Niching Dual-Archive Differential Evolution}, 
      author={Li, Zezhong and Juan, Rongshun and Li, Yang and Liu, Shoufu and Wang, Tianshu and Shi, Shuaikun and Du, Leihao and Feng, Wanjun and Gao, Zhongke},
      journal={Under Review at Ocean Engineering},
      year={2026}
}
```
