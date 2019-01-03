import vsSrc from "./shaders/vertexSimple";
import fsSrc from "./shaders/fragmentSimple";
import { initShaderProgram } from "./shaders/shaderUtils";
import initSquareBuffer from "./square";
import drawScene from "./scene";

const body = document.body;
const gameCanvas = document.createElement("canvas");
gameCanvas.setAttribute("width", 640);
gameCanvas.setAttribute("height", 480);

body.appendChild(gameCanvas);

const gl = gameCanvas.getContext("webgl");
if (gl === null) {
    throw new Error("WebGL is not supported!");
} else {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

const shaderProgram = initShaderProgram(gl, vsSrc, fsSrc);
const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
            shaderProgram,
            "uProjectionMatrix"
        ),
        modelViewMatrix: gl.getUniformLocation(
            shaderProgram,
            "uModelViewMatrix"
        ),
    },
};

const appIteration = (() => {
    let prevTimestamp = 0;

    return timestamp => {
        drawScene(
            gl,
            programInfo,
            initSquareBuffer(gl),
            timestamp - prevTimestamp
        );
        prevTimestamp = timestamp;
        requestAnimationFrame(appIteration);
    };
})();

requestAnimationFrame(appIteration);
