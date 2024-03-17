#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// A time varying chessboard pattern

/// Shader params here
#define SLIDING_ANGLE_DEGREES 30.
/// End shader params

#define PI 3.141592653
#define SLIDE_ANGLE_RADIANS (SLIDING_ANGLE_DEGREES * PI / 180.)
#define ANIMATION_SPEED 150.0

vec2 tile(vec2 st, float zoom) {
    st *= zoom;
    return fract(st);
}

/// Return a unit vector pointing at the specified angle in radians
vec2 unitvec(in float angle_radians) {
    return vec2(cos(angle_radians), sin(angle_radians));
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

void main(void) {
    // st coordiante space
    vec2 drift = ANIMATION_SPEED * unitvec(SLIDE_ANGLE_RADIANS) * u_time;
    vec2 st = (gl_FragCoord.xy + drift) / min(u_resolution.x, u_resolution.y);
    st = tile(st, 6.0);
    vec2 uv = 2.0 * st - 1.0;
    float grey = xorf_uv(uv);
    vec3 color = vec3(grey, grey, grey);
    gl_FragColor = vec4(color, 1.0);
}

