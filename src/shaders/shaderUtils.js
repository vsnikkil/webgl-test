const loadShader = (gl, type, shaderSrc) => {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const shaderInfoLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(
            `could not compile ${type} shader: ${shaderInfoLog}\n${shaderSrc}`
        );
    } else {
        return shader;
    }
};

export const initShaderProgram = (gl, vsSrc, fsSrc) => {
    const [vertexShader, fragmentShader] = [
        [gl.VERTEX_SHADER, vsSrc],
        [gl.FRAGMENT_SHADER, fsSrc],
    ].reduce(
        (shaders, shaderDefinition) =>
            shaders.concat(loadShader(gl, ...shaderDefinition)),
        []
    );

    const shaderProgram = gl.createProgram();

    [vertexShader, fragmentShader].forEach(shader =>
        gl.attachShader(shaderProgram, shader)
    );

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error(
            `unable to initialize the shader program: ${gl.getProgramInfoLog(
                shaderProgram
            )}`
        );
    } else {
        return shaderProgram;
    }
};
