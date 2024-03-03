# Usage Guide for GraphifyJS Library

GraphifyJS is a lightweight JavaScript library designed for creating dynamic graphs and visualizations within HTML canvas elements. This guide will show you on how to integrate GraphifyJS in your web apps.

## Getting Started

To begin using GraphifyJS, follow these simple steps:

1. **Download the Library**: Download the GraphifyJS library file (`graphifyjs.js`) and ensure it is located within your project directory.

2. **Include the Library**: Include the GraphifyJS library using the `<script>` tag.

```html
<script src="graphifyjs.js"></script>
```

3. **Create a Canvas Element**: Create a canvas element in the `<body>` section of your html file and asign it a unique id.

```html
<canvas id="graphCanvas" width="960" height="400"></canvas>
```

4. **Initializing the Graph**: To initialize a Graph onto the canvas element set it up like this.

```javascript
const canvas = document.getElementById("graphCanvas"); //Get the canvas html element by id
const datasets = [ // Define initial datasets and colors
    [0], // Initial data for dataset 1
    [0]  // Initial data for dataset 2
];
const colors = ["#ff0000", "#00ff00"]; // Define colors for datasets
const isSmooth = true; // You can set the graph to smooth out values, which only works when the values are higher, when they are smaller, it can be hard to see the values correctly!
const updateInterval = 500; // You need to define on how often the Graph will update
const steps = 10; // Define on how many steps back the Graph should display, meaning more will display what happend some time ago

// Initialize the graph
const myGraph = new Graph(canvas, datasets, colors, isSmooth, updateInterval, steps);

// Start rendering the graph
myGraph.start();
```

5. **Updating the Graph with custom values**: To update the Graphs data, you can set an Interval using the same update interval you set the Graph to.

```javascript
setInterval(() => {
    const newData = [ // In this example only random numbers are choosen, but you could make it something like how many users are connected at the same time etc.
        Math.round(Math.random() * 32),
        Math.round(Math.random() * 2)
    ];

    // Update datasets with new data
    myGraph.updateDatasets(newData);
}, updateInterval);
```

## Have fun with my library :D

Thank you for reading the documentation! I hope this library will help you with one of your projects. It is fairly simple but for simple stuff, it should get the job done!