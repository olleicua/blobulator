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
      this.pixelData = this.canvasContext.getImageData(
        0, 0, this.width, this.height
      ).data;

      // pixel at position x,y is found at:
      //   | R | (x + (y * this.width)) * 4
      //   | G | ((x + (y * this.width)) * 4) + 1
      //   | B | ((x + (y * this.width)) * 4) + 2
      //   | A | ((x + (y * this.width)) * 4) + 3
    }
  };

})();
