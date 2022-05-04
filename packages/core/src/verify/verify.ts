import { urlAlphabet, customAlphabet } from 'nanoid';

const uid = customAlphabet(urlAlphabet, 32);
// Solution must be correct within the given tolerance
const verifySolution = (captcha, solution, tolerance) =>
  Math.abs(captcha - solution) < tolerance;

// Slider position must not jump to the solution without intermediate values
const verifyHorizontalMotion = (positions) =>
  !positions.reduce(
    (jumpToInput, pos) => jumpToInput && (pos === 0 || pos === positions[positions.length - 1]),
    true,
  );

// Vertical motion must be present while dragging the slider
const verifyVerticalMotion = (positions) =>
  positions.reduce((total, pos) => total + pos) !== 0;

const verifyTrailLength = (trail) =>
  trail.x.length === trail.y.length;

const verifyResponse = (captcha, solution, trail, tolerance) =>
  verifySolution(captcha, solution, tolerance)
  && verifyTrailLength(trail)
  && verifyHorizontalMotion(trail.x)
  && verifyVerticalMotion(trail.y);

const verifyCaptcha = (
  captcha,
  {
    response,
    trail,
  },
  {
    tolerance = 7,
    verify = verifyResponse,
  } = {},
): Promise<{
  result: 'success' | 'failure'
  token?: string
}> =>
  new Promise((resolve) => {
    if (verify(captcha, response, trail, tolerance)) {
      const token = uid();
      resolve({
        result: 'success',
        token,
      });
    } else {
      resolve({ result: 'failure' });
    }
  });

export default verifyCaptcha;
