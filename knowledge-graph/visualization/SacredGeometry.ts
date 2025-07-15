/**
 * Sacred Geometry Pattern Generator
 * Creates divine mathematical patterns for node positioning
 */

import * as THREE from 'three';

export class SacredGeometry {
  private currentPattern: string = 'metatron';
  private phi: number = 1.618033988749895; // Golden ratio
  
  // Sacred numbers
  private readonly SACRED_NUMBERS = {
    trinity: 3,
    hexagon: 6,
    completion: 9,
    clock: 12,
    transformation: 13,
    fibonacci: 21,
    master: 33,
    fulfillment: 144,
    solfeggio: 528
  };

  constructor() {
    // Initialize with Metatron's Cube pattern
    this.currentPattern = 'metatron';
  }

  public setPattern(pattern: string): void {
    this.currentPattern = pattern;
  }

  public getCurrentPattern(): string {
    return this.currentPattern;
  }

  /**
   * Get position in Metatron's Cube formation
   */
  public getMetatronPosition(index: number, total: number): THREE.Vector3 {
    // Metatron's Cube has 13 primary nodes
    const primaryNodes = 13;
    const radius = 200;
    
    if (index < primaryNodes) {
      // Primary nodes form the cube vertices + center
      if (index === 0) {
        // Center node
        return new THREE.Vector3(0, 0, 0);
      }
      
      // Outer nodes in sacred formation
      const angle = (index - 1) * (Math.PI * 2 / 12);
      const layer = index <= 6 ? 0 : 1;
      const y = layer * radius - radius / 2;
      
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
    } else {
      // Secondary nodes orbit around primary nodes
      const primaryIndex = index % primaryNodes;
      const primaryPos = this.getMetatronPosition(primaryIndex, primaryNodes);
      const orbitAngle = (index / total) * Math.PI * 2;
      const orbitRadius = 50;
      
      return new THREE.Vector3(
        primaryPos.x + Math.cos(orbitAngle) * orbitRadius,
        primaryPos.y + Math.sin(index) * 20,
        primaryPos.z + Math.sin(orbitAngle) * orbitRadius
      );
    }
  }

  /**
   * Get position in Flower of Life pattern
   */
  public getFlowerOfLifePosition(index: number, total: number): THREE.Vector3 {
    const circles = 7; // Traditional flower has 7 circles
    const radius = 100;
    
    if (index === 0) {
      // Center of the flower
      return new THREE.Vector3(0, 0, 0);
    }
    
    // Determine which circle this node belongs to
    const circle = Math.floor((index - 1) / 6) % circles;
    const positionInCircle = (index - 1) % 6;
    
    // Calculate center of this circle
    const circleAngle = circle * (Math.PI * 2 / 6);
    const circleCenter = new THREE.Vector3(
      Math.cos(circleAngle) * radius,
      0,
      Math.sin(circleAngle) * radius
    );
    
    // Position within the circle
    const nodeAngle = positionInCircle * (Math.PI * 2 / 6);
    const nodeRadius = radius / 2;
    
    return new THREE.Vector3(
      circleCenter.x + Math.cos(nodeAngle) * nodeRadius,
      Math.sin(index * 0.1) * 50, // Gentle vertical wave
      circleCenter.z + Math.sin(nodeAngle) * nodeRadius
    );
  }

  /**
   * Get position in Tree of Life (Kabbalah) pattern
   */
  public getTreeOfLifePosition(index: number, total: number): THREE.Vector3 {
    // 10 Sephiroth + 22 paths
    const sephiroth = [
      { name: 'Kether', pos: new THREE.Vector3(0, 300, 0) },
      { name: 'Chokmah', pos: new THREE.Vector3(100, 200, 0) },
      { name: 'Binah', pos: new THREE.Vector3(-100, 200, 0) },
      { name: 'Chesed', pos: new THREE.Vector3(100, 100, 0) },
      { name: 'Geburah', pos: new THREE.Vector3(-100, 100, 0) },
      { name: 'Tiphareth', pos: new THREE.Vector3(0, 0, 0) },
      { name: 'Netzach', pos: new THREE.Vector3(100, -100, 0) },
      { name: 'Hod', pos: new THREE.Vector3(-100, -100, 0) },
      { name: 'Yesod', pos: new THREE.Vector3(0, -200, 0) },
      { name: 'Malkuth', pos: new THREE.Vector3(0, -300, 0) }
    ];
    
    if (index < sephiroth.length) {
      return sephiroth[index].pos;
    }
    
    // Additional nodes form paths between sephiroth
    const pathIndex = (index - sephiroth.length) % 22;
    const t = pathIndex / 22;
    
    // Interpolate between sephiroth
    const from = sephiroth[Math.floor(t * sephiroth.length)];
    const to = sephiroth[(Math.floor(t * sephiroth.length) + 1) % sephiroth.length];
    
    return new THREE.Vector3().lerpVectors(from.pos, to.pos, (t * sephiroth.length) % 1);
  }

  /**
   * Get position in Golden Spiral pattern
   */
  public getGoldenSpiralPosition(index: number, total: number): THREE.Vector3 {
    const angle = index * this.phi;
    const radius = Math.sqrt(index) * 20;
    
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      (index - total / 2) * 2, // Vertical spread
      Math.sin(angle) * radius
    );
  }

  /**
   * Get position in Platonic Solid formation
   */
  public getPlatonicPosition(index: number, total: number, solid: string = 'dodecahedron'): THREE.Vector3 {
    const radius = 200;
    
    switch (solid) {
      case 'tetrahedron': // 4 vertices - Fire
        const tetAngles = [
          [0, 0],
          [0, 2 * Math.PI / 3],
          [0, 4 * Math.PI / 3],
          [Math.PI, Math.PI]
        ];
        const tet = tetAngles[index % 4];
        return new THREE.Vector3(
          Math.sin(tet[0]) * Math.cos(tet[1]) * radius,
          Math.cos(tet[0]) * radius,
          Math.sin(tet[0]) * Math.sin(tet[1]) * radius
        );
        
      case 'cube': // 8 vertices - Earth
        const cubePos = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        const cube = cubePos[index % 8];
        return new THREE.Vector3(
          cube[0] * radius / 2,
          cube[1] * radius / 2,
          cube[2] * radius / 2
        );
        
      case 'octahedron': // 6 vertices - Air
        const octPos = [
          [1, 0, 0], [-1, 0, 0],
          [0, 1, 0], [0, -1, 0],
          [0, 0, 1], [0, 0, -1]
        ];
        const oct = octPos[index % 6];
        return new THREE.Vector3(
          oct[0] * radius,
          oct[1] * radius,
          oct[2] * radius
        );
        
      case 'dodecahedron': // 20 vertices - Universe
        const t = (1 + Math.sqrt(5)) / 2; // Golden ratio
        const r = radius / Math.sqrt(3);
        const dodecPos = [
          [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
          [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
          [0, 1/t, t], [0, 1/t, -t], [0, -1/t, t], [0, -1/t, -t],
          [1/t, t, 0], [1/t, -t, 0], [-1/t, t, 0], [-1/t, -t, 0],
          [t, 0, 1/t], [t, 0, -1/t], [-t, 0, 1/t], [-t, 0, -1/t]
        ];
        const dodec = dodecPos[index % 20];
        return new THREE.Vector3(
          dodec[0] * r,
          dodec[1] * r,
          dodec[2] * r
        );
        
      case 'icosahedron': // 12 vertices - Water
        const phi = (1 + Math.sqrt(5)) / 2;
        const icoPos = [
          [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
          [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
          [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
        ];
        const ico = icoPos[index % 12];
        return new THREE.Vector3(
          ico[0] * radius / 2,
          ico[1] * radius / 2,
          ico[2] * radius / 2
        );
        
      default:
        return this.getGoldenSpiralPosition(index, total);
    }
  }

  /**
   * Get position in Vesica Piscis pattern
   */
  public getVesicaPiscisPosition(index: number, total: number): THREE.Vector3 {
    const radius = 150;
    
    // Two overlapping circles
    const circle = index % 2;
    const angleInCircle = (index / 2) * (Math.PI * 2 / (total / 2));
    
    const centerOffset = radius / 2;
    const centerX = circle === 0 ? -centerOffset : centerOffset;
    
    return new THREE.Vector3(
      centerX + Math.cos(angleInCircle) * radius,
      Math.sin(angleInCircle) * radius,
      Math.sin(index * 0.1) * 50
    );
  }

  /**
   * Get position in Sri Yantra pattern
   */
  public getSriYantraPosition(index: number, total: number): THREE.Vector3 {
    // 9 interlocking triangles forming 43 smaller triangles
    const level = Math.floor(index / 9);
    const posInLevel = index % 9;
    const maxLevel = 5;
    
    const levelRadius = 50 + level * 40;
    const angle = posInLevel * (Math.PI * 2 / 9) + (level * Math.PI / 18);
    
    // Create interlocking triangle effect
    const yOffset = (level % 2 === 0) ? level * 30 : -level * 30;
    
    return new THREE.Vector3(
      Math.cos(angle) * levelRadius,
      yOffset,
      Math.sin(angle) * levelRadius
    );
  }

  /**
   * Calculate sacred angle between two nodes
   */
  public getSacredAngle(pos1: THREE.Vector3, pos2: THREE.Vector3): number {
    const angle = Math.atan2(pos2.z - pos1.z, pos2.x - pos1.x);
    
    // Quantize to sacred angles (multiples of π/6)
    const sacredAngle = Math.round(angle / (Math.PI / 6)) * (Math.PI / 6);
    
    return sacredAngle;
  }

  /**
   * Check if nodes form a sacred pattern
   */
  public detectSacredPattern(positions: THREE.Vector3[]): string | null {
    if (positions.length < 3) return null;
    
    // Check for equilateral triangle (Trinity)
    if (positions.length === 3) {
      const d1 = positions[0].distanceTo(positions[1]);
      const d2 = positions[1].distanceTo(positions[2]);
      const d3 = positions[2].distanceTo(positions[0]);
      
      if (Math.abs(d1 - d2) < 0.1 && Math.abs(d2 - d3) < 0.1) {
        return 'Trinity Formation';
      }
    }
    
    // Check for hexagon
    if (positions.length === 6) {
      // Calculate center
      const center = new THREE.Vector3();
      positions.forEach(pos => center.add(pos));
      center.divideScalar(positions.length);
      
      // Check if all points are equidistant from center
      const distances = positions.map(pos => pos.distanceTo(center));
      const avgDistance = distances.reduce((a, b) => a + b) / distances.length;
      const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
      
      if (variance < 1) {
        return 'Hexagonal Harmony';
      }
    }
    
    // Check for Fibonacci spiral
    if (positions.length >= 8) {
      let fibonacciScore = 0;
      for (let i = 2; i < positions.length && i < 10; i++) {
        const d1 = positions[i-2].distanceTo(positions[i-1]);
        const d2 = positions[i-1].distanceTo(positions[i]);
        const ratio = d2 / d1;
        
        if (Math.abs(ratio - this.phi) < 0.1) {
          fibonacciScore++;
        }
      }
      
      if (fibonacciScore >= 3) {
        return 'Fibonacci Spiral';
      }
    }
    
    return null;
  }

  /**
   * Generate coordinates for a custom sacred symbol
   */
  public generateSacredSymbol(symbol: string, scale: number = 100): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    
    switch (symbol) {
      case 'ankh':
        // Egyptian Ankh
        // Vertical line
        for (let i = -3; i <= 0; i++) {
          points.push(new THREE.Vector3(0, i * scale / 3, 0));
        }
        // Horizontal line
        points.push(new THREE.Vector3(-scale / 2, 0, 0));
        points.push(new THREE.Vector3(scale / 2, 0, 0));
        // Loop
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
          points.push(new THREE.Vector3(
            Math.cos(angle) * scale / 3,
            scale / 3 + Math.sin(angle) * scale / 3,
            0
          ));
        }
        break;
        
      case 'om':
        // Sacred Om symbol (simplified 3D representation)
        // Main curve
        for (let t = 0; t <= 1; t += 0.1) {
          const angle = t * Math.PI * 2;
          points.push(new THREE.Vector3(
            Math.cos(angle) * scale * (1 - t * 0.5),
            t * scale,
            Math.sin(angle) * scale * (1 - t * 0.5)
          ));
        }
        break;
        
      case 'infinity':
        // Lemniscate
        for (let t = 0; t < Math.PI * 2; t += Math.PI / 12) {
          points.push(new THREE.Vector3(
            scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)),
            0,
            scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t))
          ));
        }
        break;
    }
    
    return points;
  }
}