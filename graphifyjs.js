class Graph {
    constructor(canvas, datasets, colors, smooth, updateTimer, steps) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "16px Arial";
        this.datasets = datasets || [];
        this.colors = colors || ["#0000ff", "#ff0000", "#00ff00", "#ffff00", "#ff00ff", "#00ffff"];
        this.steps = steps;
        this.stepSize = this.canvas.width / this.steps;
        this.updateTimer = updateTimer;
        this.smooth = smooth;
    }

    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    drawCurve(data, color) {
        var scaleFactor = this.canvas.height / this.findMaxValue();

        if(this.smooth == true) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color + "30";
            this.ctx.moveTo(0, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height - data[0] * scaleFactor);
            for (var i = 1; i < data.length; i++) {
                var xMid = (i - 0.5) * this.stepSize;
                var yMid = (this.canvas.height - data[i - 1] * scaleFactor + this.canvas.height - data[i] * scaleFactor) / 2;
                this.ctx.quadraticCurveTo((i - 1) * this.stepSize, this.canvas.height - data[i - 1] * scaleFactor, xMid, yMid);
            }
            this.ctx.lineTo((data.length - 1) * this.stepSize, this.canvas.height - data[data.length - 1] * scaleFactor);
            this.ctx.lineTo((data.length - 1) * this.stepSize, this.canvas.height);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill();
        } else {
            this.ctx.beginPath();
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color + "30";
            this.ctx.moveTo(0, this.canvas.height - data[0] * scaleFactor);

            for (let i = 1; i < data.length; i++) {
                const x = i * this.stepSize;
                const y = this.canvas.height - data[i] * scaleFactor;
                this.ctx.lineTo(x, y);
            }

            this.ctx.lineTo((data.length - 1) * this.stepSize, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    updateDatasets(newdata) {
        for (var i = 0; i < this.datasets.length; i++) {
            if (this.datasets[i].length == Math.round(this.canvas.width / this.stepSize) + 1) {
                for (var j = 0; j < this.datasets[i].length - 1; j++) {
                    this.datasets[i][j] = this.datasets[i][j + 1];
                }
                this.datasets[i][this.datasets[i].length - 1] = newdata[i];
            } else {
                this.datasets[i].push(newdata[i]);
            }
        }
    }

    mainLoop() {
        this.drawBackground();

        for (var i = 0; i < this.datasets.length; i++) {
            this.drawCurve(this.datasets[i], this.colors[i]);
        }

        this.drawLabels();
    }

    drawBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#303030";
        for (var y = this.canvas.height; y > 0; y -= (this.canvas.height / this.findMaxValue())) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }
        this.ctx.stroke();
    }

    drawLabels() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText("Value:", 10, 20);
        let valueTextWidth = this.ctx.measureText("Value:").width;
    
        let xOffset = 10 + valueTextWidth + 5;
        for (let i = 0; i < this.datasets.length; i++) {
            const dataset = this.datasets[i];
            const color = this.colors[i];
            const numberText = dataset[dataset.length-1].toString();
            const numberTextWidth = this.ctx.measureText(numberText).width;
        
            this.ctx.fillStyle = color;
            this.ctx.fillText(numberText, xOffset, 20);
            this.ctx.fillRect(xOffset + numberTextWidth + 5, 5, 20, 20);
        
            xOffset += numberTextWidth + 30;
        }
    
        const timerText = ((this.updateTimer / 1000) * this.steps) + " seconds ago";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(timerText, 10, this.canvas.height - 10);
        this.ctx.fillText("now", this.canvas.width - 60, this.canvas.height - 10);
        this.ctx.fillText("0", this.canvas.width - 20, this.canvas.height - 20);
        this.ctx.fillText(this.findMaxValue(), this.canvas.width - 20, 20);
    }
    

    getValue() {
        var num = Math.round(this.getRandomNumber(0, 10));
        return num;
    }

    findMaxValue() {
        var maxValues = [];
        for (var i = 0; i < this.datasets.length; i++) {
            var max = Math.max(...this.datasets[i]);
            if (!isNaN(max)) {
                maxValues.push(max);
            } else {
                maxValues.push(0)
            }
        }
        var overallMax = Math.max(...maxValues);
        if (!isNaN(overallMax)) {
            return Math.round(overallMax);
        } else {
            return 0;
        }
    }

    addDataset(dataset) {
        var dataSetEmptySize = Math.round(this.canvas.width / this.stepSize);
        var emptyArray = [];
        for (var i = 0; i < dataSetEmptySize; i++) {
            emptyArray.push(0);
        }
        this.datasets.push(emptyArray);
    }

    start() {
        setInterval(this.mainLoop.bind(this), this.updateTimer);
    }
}
