---
layout: page    
title: Real data
permalink: /real_data/
---

Click on map to select start point (green) and target point (red)

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
 integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
 crossorigin=""/>

<div id="map" style="height: 600px;"></div>

<button id="reset_map">Reset map</button>

Start date : 
<input type="date" id="start_date" value="2021-11-01">
<input type="time" id="start_time" value="12:00">
Airspeed : 
<input id="airspeed" value="23.0" style="width: 70px;"> m/s
Level : 
<input id="altitude" value="1000" style="width: 70px;"> hPa

To solve the selected problem, run the dabry module with following arguments:
<div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight">
<code id="code_line">python3 -m dabry real <span id="db_init_lon">0.0</span> <span id="db_init_lat">0.0</span> <span id="db_target_lon">0.0</span> <span id="db_target_lat">0.0</span> <span id="db_start_date"></span> <span id="db_airspeed"></span> <span id="db_altitude"></span>
</code></pre></div></div>

<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
 integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
 crossorigin=""></script>

<script src="real_data.js"></script>