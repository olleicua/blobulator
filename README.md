This is an interactive art project involving images being represented using blobs.. it should be interesting..

basically I'm playing with ideas from here: https://codepen.io/olleicua/pen/zdoQpz?editors=110
but with blobs representing the pixels of a low-res rendering of an image that the user has uploaded

at this point the user can upload an image which we can extract pixel data from. I the user to be able to upload a bunch of images and then select them from a gallery of thumbnails and watch a fixed number of black and colored blobs fly accros the screen to form the new image. At high res I hope to visualise a smooth transition from one image to another. Image one person's face reflected on a perfectly smooth pond and then a stone is dropped in and the ripples reform and distort the image to instantly be another person's face.

**Update:** I've done a bunch more work and successfully implemented the imaging interface. Three major steps remain:

- replace my clunky non-working blob placement algorithm (which fails to create a recogniseable rendering of the image) with a hill climbing algorith where each pixel seeks the local maxima for the color it represents.
- fix animation
- build the gallery and preview ui

also:
- get some sleep..
