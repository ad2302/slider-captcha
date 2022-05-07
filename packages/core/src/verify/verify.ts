import { urlAlphabet, customAlphabet } from 'nanoid';
export type Trail = {
  x: number[]
  y: number[]
}

const uid = customAlphabet(urlAlphabet, 32);
// Solution must be correct within the given tolerance
const verifySolution = (captcha:number, solution:number, tolerance:number) =>
  Math.abs(captcha - solution) < tolerance;

// Slider position must not jump to the solution without intermediate values
const verifyHorizontalMotion = (positions:number[]) =>
  !positions.reduce(
    (jumpToInput, pos) => jumpToInput && (pos === 0 || pos === positions[positions.length - 1]),
    true,
  );

// Vertical motion must be present while dragging the slider
const verifyVerticalMotion = (positions:number[]) =>
  positions.reduce((total, pos) => total + pos) !== 0;

const verifyTrailLength = (trail: Trail) =>
  trail.x.length === trail.y.length;

const verifyResponse = (captcha: number, solution:number, trail: Trail, tolerance: number) =>
  verifySolution(captcha, solution, tolerance)
  && verifyTrailLength(trail)
  && verifyHorizontalMotion(trail.x)
  && verifyVerticalMotion(trail.y);

const verifyCaptcha = async (
  captcha:number,
  {
    response,
    trail,
  }: {
    response:number
    trail: Trail
  },
  {
    tolerance = 7,
    verify = verifyResponse,
  } = {},
): Promise<{
  result: 'success' | 'failure'
  token?: string
}> => {
  if (verify(captcha, response, trail, tolerance)) {
    const token = uid();
    return {
      result: 'success',
      token,
    };
  } else {
    return { result: 'failure' };
  }
};

   

export default verifyCaptcha;
