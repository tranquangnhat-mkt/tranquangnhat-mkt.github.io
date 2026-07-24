# Portfolio V16 deployment guide

V16 restores the complete Saint L’Beau case study:

- 14 JPG images
- 3 MP4 videos
- YouTube thumbnail and external button linking to:
  `https://www.youtube.com/watch?v=qdIZPqC9l_s`
- Saint L’Beau project card on the Homepage
- Responsive Saint L’Beau case-study page

## Upload order

GitHub’s browser upload limit applies to each uploaded file. Do not upload the ZIP
archives themselves. Extract each package and upload its contents in this order:

1. `01-portfolio-v16-core-and-images.zip`
2. `02-portfolio-v16-saint-small-videos.zip`
3. `03-portfolio-v16-saint-iris-video.zip`
4. `04-portfolio-v16-ocpb-banana-video.zip`
5. `05-portfolio-v16-ocpb-jackfruit-video.zip`

For every package, preserve the directory structure shown after extraction. When
GitHub reports that a file already exists, replace it with the V16 version.

## Expected checks after deployment

- Homepage shows Saint L’Beau as project number 7.
- `projects/saint-lbeau.html` opens successfully.
- Saint L’Beau page displays 14 images and 3 playable videos.
- Clicking the YouTube thumbnail or button opens the public video in a new tab.
- Existing Ông Chú Plant-Based videos continue to play.

The complete archive is for local backup only and is too large to upload directly
through GitHub’s browser interface.
