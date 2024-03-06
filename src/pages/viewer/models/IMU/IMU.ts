import * as THREE from 'three';
import Tracker from '@/pages/viewer/types/Tracker/Tracker';

class IMU {
    imu: THREE.Mesh;
    rollMaterial: THREE.MeshBasicMaterial;
    pitchMaterial: THREE.MeshBasicMaterial;
    yawMaterial: THREE.MeshBasicMaterial;
    static instance: IMU;

    constructor(rollColor: number = 0xff0000, pitchColor: number = 0x0000ff, yawColor: number = 0x00ff00) {
        // Create materials for roll, pitch, and yaw arrows
        this.rollMaterial = new THREE.MeshBasicMaterial({ color: rollColor });
        this.pitchMaterial = new THREE.MeshBasicMaterial({ color: pitchColor });
        this.yawMaterial = new THREE.MeshBasicMaterial({ color: yawColor });

        // Create geometries
        const imuGeometry = new THREE.BoxGeometry(1, 0.5, 1);
        const arrowGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);

        this.imu = new THREE.Mesh(imuGeometry, [this.rollMaterial, this.rollMaterial, this.pitchMaterial, this.pitchMaterial, this.yawMaterial, this.yawMaterial]);

        // Create roll arrow
        const rollArrow = new THREE.Mesh(arrowGeometry, this.rollMaterial);
        rollArrow.position.x = 0.8;
        rollArrow.rotation.z = Math.PI * 3 / 2;
        this.imu.add(rollArrow);

        // Create pitch arrow
        const pitchArrow = new THREE.Mesh(arrowGeometry, this.pitchMaterial);
        pitchArrow.position.y = 0.8;
        pitchArrow.rotation.y = Math.PI / 2;
        this.imu.add(pitchArrow);

        // Create yaw arrow
        const yawArrow = new THREE.Mesh(arrowGeometry, this.yawMaterial);
        yawArrow.position.z = 0.8;
        yawArrow.rotation.x = Math.PI / 2;
        this.imu.add(yawArrow);

        IMU.instance = this;
    }

    public static getInstance() {
        return IMU.instance;
    }

    public updateIMU(tracker: Partial<Tracker>) {
        this.imu.position.x = tracker.position?.x || this.imu.position.x;
        this.imu.position.y = tracker.position?.y || this.imu.position.y;
        this.imu.position.z = tracker.position?.z || this.imu.position.z;
        this.imu.rotation.x = tracker.rotation?.x || this.imu.rotation.x;
        this.imu.rotation.y = tracker.rotation?.y || this.imu.rotation.y;
        this.imu.rotation.z = tracker.rotation?.z || this.imu.rotation.z;
    }
}

export default IMU;