(function() {

  window.BlobableImage = {
    all: [],

    create: function(uri, callback) {
      var obj = Object.create(this);

      obj.uri = uri;
      obj.initContext(function(){
        obj.buildPixelData();

        callback(obj);
      });

      this.all.push(obj);
    },

    initContext: function(callback) {
      var that = this;
      var image = new Image();

      this.canvas = document.createElement('canvas');
      this.canvasContext = this.canvas.getContext('2d');

      image.onload = function() {
        that.width = this.width;
        that.height = this.height;
        that.canvasContext.drawImage(image, 0, 0);

        callback();
      };

      image.src = this.uri;
    },

    buildPixelData: function() {
      var that = this;

      this.pixelData = this.canvasContext.getImageData(
        0, 0, this.width, this.height
      ).data;

      // pixel at position x,y is found at:
      //   | R | (x + (y * this.width)) * 4
      //   | G | ((x + (y * this.width)) * 4) + 1
      //   | B | ((x + (y * this.width)) * 4) + 2
      //   | A | ((x + (y * this.width)) * 4) + 3

      this.mostIntenseColors = {};

      // construct an array of coordinates for each color ordered from the
      // position where that color is most intense to to position where that
      // color is least intense. This algorithm breaks ties in top to bottom
      // left to right order, if this turns out to be too much of a bias then we
      // will need to adjust things..

      for (var i = 0; i < 4; i++) {
        this.mostIntenseColors[['red', 'green', 'blue', 'black'][i]] =
          _.flatten(
            _.map(_.range(0, this.height, 15), function(y) {
              return _.map(_.range(0, that.width, 15), function(x) {
                return [x, y];
              });
            }),
            true
          ).sort(function(a, b) {
            var a_x = a[0];
            var a_y = a[1];
            var b_x = b[0];
            var b_y = b[1];

            if (i === 3) {
              var a_r = that.pixelData[(a_x + (a_y * that.width)) * 4];
              var a_g = that.pixelData[((a_x + (a_y * that.width)) * 4) + 1];
              var a_b = that.pixelData[((a_x + (a_y * that.width)) * 4) + 2];
              var b_r = that.pixelData[(b_x + (b_y * that.width)) * 4];
              var b_g = that.pixelData[((b_x + (b_y * that.width)) * 4) + 1];
              var b_b = that.pixelData[((b_x + (b_y * that.width)) * 4) + 2];

              return (a_r + a_g + a_b) - (b_r + b_g + b_b);
            } else {
              return that.pixelData[((b_x + (b_y * that.width)) * 4) + i] -
                that.pixelData[((a_x + (a_y * that.width)) * 4) + i];
            }
          });
      }
    }
  };

})();
