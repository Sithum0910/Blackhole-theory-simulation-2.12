async function main() {
       // Load Pyodide
       let pyodide = await loadPyodide();

       // Write your Python code here
       await pyodide.runPython(`
           import numpy as np
           import matplotlib.pyplot as plt

           # Example: Simulate particles around a black hole
           black_hole_mass = 10000
           particle_positions = np.random.rand(100, 2) * 100
           particle_velocities = np.random.rand(100, 2) - 0.5

           # Save data to JavaScript
           from js import window
           window.particlePositions = particle_positions.tolist()
       `);

       // Access Python data in JavaScript
       const canvas = document.getElementById('simulationCanvas');
       const ctx = canvas.getContext('2d');
       canvas.width = 800;
       canvas.height = 600;

       const particles = window.particlePositions;

       function draw() {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           ctx.fillStyle = 'white';
           particles.forEach(([x, y]) => {
               ctx.beginPath();
               ctx.arc(x * 8, y * 6, 2, 0, Math.PI * 2);
               ctx.fill();
           });
       }

       draw();
   }

   main();
