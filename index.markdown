---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default  
---

## **MadDE-NDA:** Collision-Free Time-Optimal Planning of Underwater Gliders in Time-Varying Currents via Adaptive **N**iching **D**ual-**A**rchive Differential Evolution

This project presents a state-of-the-art GPU-accelerated 4D path planning framework designed for **Autonomous Underwater Gliders (AUGs)** operating in complex, time-varying ocean environments. To overcome the curse of dimensionality and the spatiotemporal causal chain in long-range missions, we propose a fixed-dimensional **B-spline trajectory encoding** combined with a novel evolutionary optimizer, **MadDE-NDA** (Niching Dual-Archive Differential Evolution). By leveraging massive **GPU parallelism**, the framework rigorously evaluates dynamic feasibility and continuous-domain collision safety in seconds.

### Key Features 

*   **📉 Fixed-Dimensional B-Spline Encoding:** Transforms the traditional variable-length, profile-wise routing problem into a compact, fixed-dimensional search space using B-spline control points in a local coordinate system, significantly improving optimization efficiency for long-endurance missions.
*   **🧬 Adaptive Niching Dual-Archive Evolution (MadDE-NDA):** Introduces dual cooperative archives for quality retention and diversity preservation, coupled with a stagnation-triggered niching scheme. This prevents premature convergence and robustly explores highly multimodal route corridors induced by complex terrain and currents.
*   **🛡️ Strict Continuous 3D Obstacle Avoidance:** Utilizes a Euclidean Signed Distance Field (ESDF) combined with adaptive **Sphere Tracing** (Ray Marching). This completely eliminates the "tunneling effect" of traditional discrete sampling, ensuring absolute safety against high-resolution **GEBCO seabed topography**. 
*   **🚀 GPU-Accelerated 4D Dynamic Verification:** Employs parallel 4th-order Runge-Kutta (RK4) integration on the GPU to strictly evaluate time-varying kinematics using **4D CMEMS ocean data**. The population-level parallel architecture reduces evaluation time by orders of magnitude (up to 18.6× speedup), making time-optimal planning computationally tractable.

### 2D Visual Results

<div style="display: flex; flex-direction: column; gap: 40px; align-items: center; margin-bottom: 50px; margin-top: 20px;">

  <!-- Case 1 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <!-- 标签 Badge -->
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 1
    </div>
    <!-- 视频播放器 -->
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Case 2 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 2
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_2.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Case 3 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 3
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_3.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Case 4 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 4
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_4.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Case 5 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 5
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_5.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

</div>

### 3D Visual Results

<div style="display: flex; flex-direction: column; gap: 40px; align-items: center; margin-bottom: 50px; margin-top: 20px;">

  <!-- Case 1 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <!-- 标签 Badge -->
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 1
    </div>
    <!-- 视频播放器 -->
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_1_3D.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Case 2 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <!-- 标签 Badge -->
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 2
    </div>
    <!-- 视频播放器 -->
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_2_3D.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Case 3 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 3
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_3_3D.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

<!-- Case 4 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 4
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_4_3D.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

<!-- Case 5 -->
  <div style="position: relative; width: 100%; max-width: 850px;">
    <div style="position: absolute; bottom: 15px; left: 15px; background-color: #0056b3; color: white; padding: 6px 12px; font-size: 0.9rem; font-weight: bold; z-index: 5; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); letter-spacing: 0.5px;">
      Case 5
    </div>
    <video width="100%" autoplay loop muted playsinline controls style="border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: block; border: 1px solid rgba(128,128,128, 0.2); height: auto; background-color: transparent;">
      <source src="assets/video/case_5_3D.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

</div>

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
