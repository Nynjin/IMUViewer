import * as THREE from 'three';

export const round = (number: number, decimals: number) => {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export const rotationInDegrees = (radAngle: number, decimals: number) => {
    return (round(THREE.MathUtils.euclideanModulo(THREE.MathUtils.radToDeg(radAngle), 360), decimals));
}