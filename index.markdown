---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default  
---

### **GUIDE:** **G**pu-accelerated **U**nderwater **I**ntelligent **D**ifferential **E**volution for collision-free 3D path planning of autonomous gliders in dynamic ocean currents

**GUIDE** is a state-of-the-art path planning framework designed for **Autonomous Underwater Gliders (AUGs)** operating in complex, time-varying ocean environments.  Unlike traditional planners, GUIDE integrates **domain knowledge (Ocean Currents)** directly into the evolutionary search process and leverages massive **GPU parallelism** to solve high-dimensional 3D trajectory optimization problems in seconds. 

### Key Features 

*   **🚀 Extreme Performance via GPU:**  Built on **CUDA**, GUIDE implements a "Whole-Trajectory Kernel" design that eliminates CPU-GPU communication bottlenecks. It accelerates RK4 integration and B-Spline decoding by orders of magnitude (e.g., reducing runtime from ~1800s to <150s). 
*   **🌊 Physics-Informed Evolution (LSHADE-AHF):**  Introduces a novel **Adaptive Hybrid Flow** mutation strategy. The algorithm intelligently switches between "Current-Guided Search" (utilizing flow vectors) and "Stochastic Exploration" based on real-time success history, preventing stagnation in complex vortexes. 
*   **🛡️ Strict 3D Obstacle Avoidance:**  Utilizes **Signed Distance Fields (SDF)** and **GPU Sphere Tracing** to guarantee collision-free paths against high-resolution **GEBCO** **seabed terrain data,** ensuring safety even in deep-sea canyons. 
*   **⏳ Time-Varying Dynamics:** Full support for **4D ocean data (CMEMS).** The planner accounts for the temporal evolution of ocean currents during the glider's long-endurance missions, optimizing energy consumption and travel time simultaneously.

### Visual Results

[<img src="assets/gifs/cropped/3vor.gif" style="width: 32%;">](examples#3vor)
[<img src="assets/gifs/cropped/linear.gif" style="width: 32%;">](examples#linear)
[<img src="assets/gifs/cropped/4vor.gif" style="width: 32%;">](examples#4vor)

[<img src="assets/gifs/cropped/movor.gif" style="width: 32%;">](examples#movor)
[<img src="assets/gifs/cropped/movors.gif" style="width: 32%;">](examples#movors)
[<img src="assets/gifs/cropped/sanjuan-dublin-ortho-tv.gif" style="width: 32%;">](examples#sanjuan-dublin-ortho-tv)

[<img src="assets/gifs/cropped/chertovskih2020.gif" style="width: 32%;">](examples#chertovskih2020)
[<img src="assets/gifs/cropped/band.gif" style="width: 32%;">](examples#band)
[<img src="assets/gifs/cropped/trap.gif" style="width: 32%;">](examples#trap)

[<img src="assets/gifs/cropped/big_rankine.gif" style="width: 32%;">](examples#big_rankine)
[<img src="assets/gifs/cropped/pointsym-techy2011.gif" style="width: 32%;">](examples#pointsym-techy2011)
[<img src="assets/gifs/cropped/lva.gif" style="width: 32%;">](examples#lva)
