import sharp from 'sharp';
import { randInt, puzzlePieceSvg, backgroundSvg } from './generate';

const sizes = ({
  WIDTH: 250,
  HEIGHT: 150,
  PUZZLE: 60,
  PADDING: 20,
});

const createCaptcha = async ({
  image = Buffer.from(backgroundSvg(sizes.WIDTH, sizes.HEIGHT)),
  distort = false,
  rotate = false,
  fill = '#000',
  stroke = '#fff',
  strokeWidth = '.4',
  opacity = '0.5',
} = {}): Promise<{
  data: {
    background: Buffer,
    slider: Buffer,
  },
  solution: number,
}> => {
  const seed = randInt();
  const overlay = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      fill,
      stroke,
      strokeWidth,
      opacity,
      seed,
    }),
  );
  const mask = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      seed,
      strokeWidth,
      fill: '#000',
      stroke: '#000',
      opacity: '1',
    }),
  );
  const outline = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      seed,
      stroke,
      strokeWidth,
      fill: 'none',
      opacity: '1',
    }),
  );
  const location = {
    // Solution for slider
    left: randInt(sizes.PUZZLE + sizes.PADDING, sizes.WIDTH - (sizes.PUZZLE + sizes.PADDING)),
    // Vertical offset
    top: randInt(sizes.PADDING, sizes.HEIGHT - (sizes.PUZZLE + sizes.PADDING)),
  };
  const ins = sharp(image)
  .resize({ width: sizes.WIDTH, height: sizes.HEIGHT })
  const background = await ins
    .composite([
      {
        input: overlay,
        blend: 'over',
        top: location.top,
        left: location.left,
      },
    ])
    .png()
    .toBuffer();
  const composed = await ins
    .composite([
      {
        input: mask,
        blend: 'dest-in',
        top: location.top,
        left: location.left,
      },
      {
        input: outline,
        blend: 'over',
        top: location.top,
        left: location.left,
      },
    ]).toBuffer();
  const slider = await sharp(composed).extract({
    left: location.left,
    top: 0,
    width: sizes.PUZZLE,
    height: sizes.HEIGHT,
  })
    .png()
    .toBuffer();
  return {
    data: {
      background,
      slider,
    },
    solution: location.left,
  };
  
};

export default createCaptcha;

if (typeof require !== 'undefined' && require.main === module) {
  createCaptcha().then( r => {
    sharp(r.data.slider).toFile('slider.png')
    sharp(r.data.background).toFile('background.png')
  })
}