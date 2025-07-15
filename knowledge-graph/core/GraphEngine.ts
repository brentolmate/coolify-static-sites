/**
 * Living Knowledge Graph Engine
 * Core 3D visualization engine for Obsidian vault
 */

import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { SacredGeometry } from '../visualization/SacredGeometry';
import { BandColorizer } from '../visualization/BandColorizer';
import { AnimationEngine } from '../visualization/AnimationEngine';
import { GraphDataProcessor } from '../data/GraphDataProcessor';

interface GraphNode {
  id: string;
  name: string;
  path: string;
  band: number;
  x?: number;
  y?: number;
  z?: number;
  connections: number;
  content?: string;
  lastModified?: Date;
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
  type: string;
}

export class GraphEngine {
  private container: HTMLElement;
  private graph: any;
  private renderer: THREE.WebGLRenderer;
  private cssRenderer: CSS2DRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private nodes: Map<string, GraphNode> = new Map();
  private links: GraphLink[] = [];
  private sacredGeometry: SacredGeometry;
  private colorizer: BandColorizer;
  private animationEngine: AnimationEngine;
  private dataProcessor: GraphDataProcessor;
  
  // Sacred timing constants (ms)
  private readonly SACRED_DELAYS = {
    instant: 88,
    quick: 144,
    standard: 233,
    thoughtful: 377,
    deep: 610
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.sacredGeometry = new SacredGeometry();
    this.colorizer = new BandColorizer();
    this.animationEngine = new AnimationEngine();
    this.dataProcessor = new GraphDataProcessor();
    
    this.initializeGraph();
    this.setupLighting();
    this.setupPostProcessing();
  }

  private initializeGraph(): void {
    // Initialize ForceGraph3D with custom settings
    this.graph = ForceGraph3D()(this.container)
      .backgroundColor('#000011')
      .nodeLabel('name')
      .nodeColor((node: any) => this.colorizer.getBandColor(node.band || 1))
      .nodeOpacity(0.9)
      .nodeResolution(16)
      .nodeVal((node: any) => Math.pow(node.connections || 1, 0.5) * 10)
      .linkColor(() => '#ffffff')
      .linkOpacity(0.3)
      .linkWidth(1)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(0.01)
      .linkDirectionalParticleWidth(2)
      .onNodeClick(this.handleNodeClick.bind(this))
      .onNodeHover(this.handleNodeHover.bind(this))
      .d3Force('charge', null) // Disable charge force
      .d3Force('center', null) // Disable center force
      .d3Force('collision', null); // Disable collision

    // Access Three.js objects
    this.scene = this.graph.scene();
    this.camera = this.graph.camera();
    this.renderer = this.graph.renderer();

    // Enable shadows for mystical effect
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add CSS2D renderer for labels
    this.cssRenderer = new CSS2DRenderer();
    this.cssRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';
    this.cssRenderer.domElement.style.pointerEvents = 'none';
    this.container.appendChild(this.cssRenderer.domElement);

    // Custom force simulation
    this.setupCustomForces();
  }

  private setupCustomForces(): void {
    // Apply sacred geometry patterns to node positions
    this.graph.d3Force('sacred', (alpha: number) => {
      const nodes = this.graph.graphData().nodes;
      const pattern = this.sacredGeometry.getCurrentPattern();
      
      nodes.forEach((node: any, i: number) => {
        if (pattern === 'metatron') {
          const pos = this.sacredGeometry.getMetatronPosition(i, nodes.length);
          node.vx += (pos.x - node.x) * alpha * 0.1;
          node.vy += (pos.y - node.y) * alpha * 0.1;
          node.vz += (pos.z - node.z) * alpha * 0.1;
        } else if (pattern === 'flower') {
          const pos = this.sacredGeometry.getFlowerOfLifePosition(i, nodes.length);
          node.vx += (pos.x - node.x) * alpha * 0.1;
          node.vy += (pos.y - node.y) * alpha * 0.1;
          node.vz += (pos.z - node.z) * alpha * 0.1;
        }
      });
    });

    // Band-based clustering force
    this.graph.d3Force('band', (alpha: number) => {
      const nodes = this.graph.graphData().nodes;
      const bandClusters = this.organizeBandClusters(nodes);
      
      nodes.forEach((node: any) => {
        const cluster = bandClusters.get(node.band || 1);
        if (cluster) {
          node.vx += (cluster.x - node.x) * alpha * 0.05;
          node.vy += (cluster.y - node.y) * alpha * 0.05;
          node.vz += (cluster.z - node.z) * alpha * 0.05;
        }
      });
    });
  }

  private organizeBandClusters(nodes: any[]): Map<number, THREE.Vector3> {
    const clusters = new Map<number, THREE.Vector3>();
    
    // Arrange bands in ascending spiral
    for (let band = 1; band <= 33; band++) {
      const angle = (band / 33) * Math.PI * 2 * 3; // 3 full rotations
      const radius = 100 + band * 20;
      const height = (band - 17) * 30; // Center around band 17
      
      clusters.set(band, new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      ));
    }
    
    return clusters;
  }

  private setupLighting(): void {
    // Ambient light for base visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Sacred golden light from above
    const goldenLight = new THREE.DirectionalLight(0xffd700, 1);
    goldenLight.position.set(0, 1000, 0);
    goldenLight.castShadow = true;
    goldenLight.shadow.camera.far = 2000;
    goldenLight.shadow.camera.left = -500;
    goldenLight.shadow.camera.right = 500;
    goldenLight.shadow.camera.top = 500;
    goldenLight.shadow.camera.bottom = -500;
    this.scene.add(goldenLight);

    // Rotating consciousness lights (Band 33 activation)
    const consciousnessColors = [0xff00ff, 0x00ffff, 0xffff00];
    consciousnessColors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 0.5, 1000);
      light.position.set(0, 200, 0);
      this.scene.add(light);
      
      // Animate in sacred pattern
      this.animationEngine.addAnimation({
        target: light,
        duration: this.SACRED_DELAYS.deep * 10,
        props: {
          position: {
            x: () => Math.cos(Date.now() * 0.001 + i * Math.PI * 2 / 3) * 300,
            z: () => Math.sin(Date.now() * 0.001 + i * Math.PI * 2 / 3) * 300
          },
          intensity: () => 0.5 + Math.sin(Date.now() * 0.002) * 0.3
        }
      });
    });
  }

  private setupPostProcessing(): void {
    // Add bloom effect for consciousness glow
    const composer = new THREE.EffectComposer(this.renderer);
    
    const renderPass = new THREE.RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);
    
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // Strength
      0.4, // Radius
      0.85  // Threshold
    );
    composer.addPass(bloomPass);
  }

  public async loadVaultData(vaultPath: string): Promise<void> {
    try {
      // Process vault data into graph format
      const graphData = await this.dataProcessor.processVault(vaultPath);
      
      // Store nodes and links
      graphData.nodes.forEach(node => this.nodes.set(node.id, node));
      this.links = graphData.links;
      
      // Apply sacred delay before rendering
      await this.applySacredDelay('thoughtful');
      
      // Update graph
      this.graph.graphData({
        nodes: Array.from(this.nodes.values()),
        links: this.links
      });
      
      // Trigger initial animation
      this.animateInitialFormation();
      
    } catch (error) {
      console.error('Failed to load vault data:', error);
    }
  }

  private async applySacredDelay(timing: keyof typeof this.SACRED_DELAYS): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, this.SACRED_DELAYS[timing]);
    });
  }

  private animateInitialFormation(): void {
    // Nodes start from center and expand to positions
    const nodes = this.graph.graphData().nodes;
    
    nodes.forEach((node: any, i: number) => {
      // Store target position
      const targetX = node.x;
      const targetY = node.y;
      const targetZ = node.z;
      
      // Start from center
      node.x = 0;
      node.y = 0;
      node.z = 0;
      
      // Animate to position with sacred timing
      setTimeout(() => {
        this.animationEngine.animateTo(node, {
          x: targetX,
          y: targetY,
          z: targetZ
        }, this.SACRED_DELAYS.deep);
      }, i * this.SACRED_DELAYS.instant);
    });
  }

  private handleNodeClick(node: any): void {
    // Open note in Obsidian
    const obsidianUrl = `obsidian://open?vault=${encodeURIComponent('LoopwalkerVault')}&file=${encodeURIComponent(node.path)}`;
    window.open(obsidianUrl, '_blank');
    
    // Pulse connected nodes
    this.pulseConnectedNodes(node.id);
  }

  private handleNodeHover(node: any): void {
    if (node) {
      // Highlight connections
      this.highlightConnections(node.id);
      
      // Show tooltip with note info
      this.showNodeTooltip(node);
    } else {
      // Clear highlights
      this.clearHighlights();
      this.hideTooltip();
    }
  }

  private pulseConnectedNodes(nodeId: string): void {
    const connectedNodes = new Set<string>();
    
    // Find all connected nodes
    this.links.forEach(link => {
      if (link.source === nodeId) connectedNodes.add(link.target);
      if (link.target === nodeId) connectedNodes.add(link.source);
    });
    
    // Pulse animation
    connectedNodes.forEach(id => {
      const node = this.nodes.get(id);
      if (node) {
        this.animationEngine.pulse(node, {
          scale: 2,
          duration: this.SACRED_DELAYS.standard,
          color: this.colorizer.getBandColor(node.band)
        });
      }
    });
  }

  private highlightConnections(nodeId: string): void {
    // Dim all nodes and links
    this.graph.nodeOpacity(0.3);
    this.graph.linkOpacity(0.1);
    
    // Highlight connected elements
    const connected = new Set([nodeId]);
    
    this.links.forEach(link => {
      if (link.source === nodeId || link.target === nodeId) {
        connected.add(link.source);
        connected.add(link.target);
      }
    });
    
    // Restore opacity for connected nodes
    this.graph.nodeOpacity((node: any) => connected.has(node.id) ? 0.9 : 0.3);
    this.graph.linkOpacity((link: any) => 
      (link.source.id === nodeId || link.target.id === nodeId) ? 0.6 : 0.1
    );
  }

  private clearHighlights(): void {
    this.graph.nodeOpacity(0.9);
    this.graph.linkOpacity(0.3);
  }

  private showNodeTooltip(node: any): void {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'node-tooltip';
    tooltip.innerHTML = `
      <h3>${node.name}</h3>
      <p>Band ${node.band} Consciousness</p>
      <p>${node.connections} connections</p>
      <p class="path">${node.path}</p>
    `;
    
    // Position tooltip
    const coords = this.graph.graph2ScreenCoords(node.x, node.y, node.z);
    tooltip.style.left = `${coords.x}px`;
    tooltip.style.top = `${coords.y - 100}px`;
    
    this.container.appendChild(tooltip);
  }

  private hideTooltip(): void {
    const tooltip = this.container.querySelector('.node-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  public updateNode(nodeData: Partial<GraphNode>): void {
    if (nodeData.id && this.nodes.has(nodeData.id)) {
      const node = this.nodes.get(nodeData.id)!;
      Object.assign(node, nodeData);
      
      // Trigger re-render with animation
      this.animationEngine.glow(node, {
        duration: this.SACRED_DELAYS.quick,
        intensity: 2
      });
    }
  }

  public addNode(node: GraphNode): void {
    this.nodes.set(node.id, node);
    
    // Update graph data
    this.graph.graphData({
      nodes: Array.from(this.nodes.values()),
      links: this.links
    });
    
    // Animate new node appearance
    this.animationEngine.appearanceAnimation(node, this.SACRED_DELAYS.standard);
  }

  public addLink(link: GraphLink): void {
    this.links.push(link);
    
    // Update graph data
    this.graph.graphData({
      nodes: Array.from(this.nodes.values()),
      links: this.links
    });
    
    // Animate new connection
    this.animationEngine.connectionAnimation(link, this.SACRED_DELAYS.quick);
  }

  public setPattern(pattern: 'metatron' | 'flower' | 'tree' | 'spiral'): void {
    this.sacredGeometry.setPattern(pattern);
    
    // Re-heat simulation to apply new pattern
    this.graph.d3ReheatSimulation();
  }

  public exportImage(): void {
    // Render current view to image
    this.renderer.render(this.scene, this.camera);
    const dataUrl = this.renderer.domElement.toDataURL('image/png');
    
    // Download image
    const link = document.createElement('a');
    link.download = `knowledge-graph-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }

  public dispose(): void {
    this.animationEngine.dispose();
    this.graph._destructor();
    this.cssRenderer.domElement.remove();
  }
}