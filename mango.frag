// Uniforms available:
// iResolution
// iGlobalTime (also as iTime)
// iTimeDelta
// iFrame
// iMouse
// iMouseButton
// iDate
// iSampleRate
//iChannelN with N in [0, 9] and iChannelResolution[]


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    fragColor = vec4(uv.x, uv.y, 0, 0);

}