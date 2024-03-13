
void main(void) {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    gl_FragColor = vec4(st.s, st.t, 0, 0);
}