import * as THREE from 'three';

class TrailRenderer {
    trail: THREE.Line;
    geometry: THREE.BufferGeometry;
    material: THREE.LineBasicMaterial;
    trailPoints: THREE.Vector3[];
    length: number;
    maxTrailLength: number;

    constructor(maxTrailLength = 100, color = 0xff0000) {
        this.length = 0;
        this.trailPoints = [];
        this.maxTrailLength = maxTrailLength;

        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.LineBasicMaterial({ color });

        this.trail = new THREE.Line(this.geometry, this.material);
        this.trail.frustumCulled = false;
    }

    updateTrail(position: THREE.Vector3) {
        // Calculate the distance between the last point and the new point
        const lastPoint = this.trailPoints.length > 0 ? this.trailPoints[this.trailPoints.length - 1] : null;

        if (lastPoint) {
            this.length += position.distanceTo(lastPoint);
        }

        this.trailPoints.push(position.clone());

        // Remove points until the total distance is within the maximum trail length
        while (this.length > this.maxTrailLength && this.trailPoints.length > 1) {
            this.length -= this.trailPoints[1].distanceTo(this.trailPoints[0]);
            this.trailPoints.shift();
        }

        this.trail.geometry.setFromPoints(this.trailPoints);
    }
}

export default TrailRenderer;
