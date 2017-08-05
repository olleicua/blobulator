(function() {

  var resolutionInput = document.querySelector('.new-image');
  resolutionInput.addEventListener('change', function() {
    var reader = new FileReader();
    var file = resolutionInput.files[0];

    reader.addEventListener('load', function() {
      BlobableImage.create(reader.result, function(image) {
        Gallery.addImage(image);
      });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  document.querySelector('.resolution').addEventListener('click', function() {
    Blob.draw();
  });
  Blob.draw();

})();
