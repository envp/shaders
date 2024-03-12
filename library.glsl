//! Library of utility functions

/// Compute xor of this bvec2
bool xorb(in bvec2 bits) {
  bool a = bits[0];
  bool b = bits[1];
  return (a && b) || (!a && !b);
}

/// Given a 'uv' coordinate in [-1, 1]
/// Compute the xor as a floating point number, i.e:
/// * 0.0 in quadrants 1 and 3
/// * 1.0 in quadrants 2 and 4
float xorf_uv(in vec2 uv) {
  vec2 step_ = step(0.0, uv);
  // This is the simplified  form of:
  // (step_.x * step_.y) + (1. - step_.x) * (1. - step_.y)
  return 1.0 - step_.x - step_.y + 2.0 * step_.x * step_.y;
}

/// Return a unit vector pointing at the specified angle in radians
vec2 unitvec(in float angle_radians) {
  return vec2(cos(angle_radians), sin(angle_radians));
}

// Vector equality against a float
bvec2 vEqual(in vec2 value, in float x) { return equal(value, vec2(x, x)); }

vec2 rotate2D(vec2 st, in float angle) {
  // Translate to [-0.5, 0.5],
  // so that coordiantes are centered around (0, 0)
  st -= 0.5;
  st = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * st;
  // Undo translation
  st += 0.5;
  return st;
}

vec2 tile(vec2 st, float zoom) {
  st *= zoom;
  return fract(st);
}