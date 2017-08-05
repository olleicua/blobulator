(function() {

  window.Blob = {
    draw: function() {
      this.resolution = parseFloat(document.querySelector('.resolution').value);
      this.container = document.querySelector('.blob');
      this.container.innerHTML = '';

      this.calculateScale();
      this.buildPixels();
    },

    calculateScale: function() {
      var basicDimention = Math.min(this.container.offsetHeight,
                                    this.container.offsetWidth);
      var actualdimention = basicDimention - 100;
      this.pixelSize = actualdimention / this.resolution;
      this.componentSize = this.pixelSize / 2;
      this.top = (this.container.offsetHeight - actualdimention) / 2;
      this.left = (this.container.offsetWidth - actualdimention) / 2;
    },

    buildPixels: function() {
      this.pixelArray = [];
      for (var y = 0; y < this.resolution; y++) {
        this.pixelArray.push([]);
        for (var x = 0; x < this.resolution; x++) {
          this.pixelArray[y].push([]);
          for (var color_i = 0; color_i < 4; color_i++) {
            var elem = document.createElement('div');
            elem.className = 'pixel';
            elem.style.backgroundColor =
              ['#f00', '#0f0', '#00f', '#000'][color_i];
            elem.style.top = this.top +
              (y * this.pixelSize) +
              (Math.floor(color_i / 2) * this.componentSize) +
              'px';
            elem.style.left = this.left +
              (x * this.pixelSize) +
              ((color_i % 2) * this.componentSize) +
              'px';
            elem.style.height = this.componentSize + 'px';
            elem.style.width = this.componentSize + 'px';
            elem.style.filter = 'blur(' + this.componentSize / 3 + 'px)';
            elem.style.transform = 'translateX(0) translateY(0)';
            this.pixelArray[y][x].push(elem);
            this.container.appendChild(elem);
          }
        }
      }
    },

    renderImage: function(image) {
      var that = this;

      // The algorithm I have in mind for this contains bias that might effect
      // the nature of the distortion effect but which shouldn't effect the
      // resulting rendering

      var pixelCount = this.resolution * this.resolution;

      for (var color_i = 0; color_i < 4; color_i++) {
        var targetPositions = _.first(
          image.mostIntenseColors[['red', 'green', 'blue', 'black'][color_i]],
          pixelCount
        );
        for (var y = 0; y < this.resolution; y++) {
          for (var x = 0; x < this.resolution; x++) {
            var targetIndex = _.min(_.range(targetPositions.length), function(i) {
              window.DEBUG = color_i;
              window.DEBUG = image;
              window.DEBUG = pixelCount;

              return Math.abs(x - (targetPositions[i][0] *
                                   that.resolution / image.width)) +
                Math.abs(y - (targetPositions[i][1] *
                              that.resolution / image.height));
            });
            var target = targetPositions[targetIndex];
            targetPositions.splice(targetIndex, 1);
            var pixel = this.pixelArray[y][x][color_i];

            pixel.style.transform =
              'translateX(' +
              (((target[0] * this.resolution / image.width) - x) *
               this.pixelSize) +
              'px) translateY(' +
              (((target[1] * this.resolution / image.height) - y) *
               this.pixelSize) +
              'px)';
            /*
            Velocity(
              pixel, {
                transform: 'translateX(' +
                  (((target[0] * this.resolution / image.width) - x) *
                   this.pixelSize) +
                  'px) translateY(' +
                  (((target[1] * this.resolution / image.height) - y) *
                   this.pixelSize) +
                  'px)'
              }, { duration: 10000 }
            );

            /*
            pixel.animate([
              { transform: pixel.style.transform },
              { transform: 'translateX(' +
                (((target[0] * this.resolution / image.width) - x) *
                 this.pixelSize) +
                'px) translateY(' +
                (((target[1] * this.resolution / image.height) - y) *
                 this.pixelSize) +
                'px)' }
            ], {
              duration: 10000,
              iterations: Infinity
            });
            */
          }
        }
      }
    }
  };

})();
