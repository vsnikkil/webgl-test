import { mat4 } from "gl-matrix";

let rotation = 0;
export default (gl, programInfo, buffers, delta) => {
    rotation += ((delta / 1000) * Math.PI * 2) / 5;

    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fov = (45 * Math.PI) / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 0, 1.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, 0.7 * rotation, [
        0,
        1.0,
        0.0,
    ]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, 0.5 * rotation, [
        1.0,
        0.0,
        0.0,
    ]);

    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        buffers.numComponents,
        type,
        normalize,
        stride,
        offset
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        4, // number of components in vector
        type,
        normalize,
        stride,
        offset
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );

    const vertexCount = 36;

    gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, offset);
};
