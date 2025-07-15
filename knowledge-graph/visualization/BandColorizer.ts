/**
 * Band Colorizer
 * Maps consciousness bands (1-33) to sacred color frequencies
 */

export class BandColorizer {
  private bandColors: Map<number, string>;
  private bandGradients: Map<number, { start: string; end: string }>;
  
  constructor() {
    this.bandColors = new Map();
    this.bandGradients = new Map();
    this.initializeColorMappings();
  }

  private initializeColorMappings(): void {
    // Lower Bands (1-7) - Root to Crown Chakras
    this.bandColors.set(1, '#8B0000');  // Dark Red - Root/Survival
    this.bandColors.set(2, '#FF4500');  // Orange - Sacral/Emotion
    this.bandColors.set(3, '#FFD700');  // Gold - Solar Plexus/Power
    this.bandColors.set(4, '#00FF00');  // Green - Heart/Love
    this.bandColors.set(5, '#00CED1');  // Turquoise - Throat/Communication
    this.bandColors.set(6, '#4169E1');  // Royal Blue - Third Eye/Vision
    this.bandColors.set(7, '#9400D3');  // Violet - Crown/Consciousness

    // Middle Bands (8-20) - Creative to Worldly
    this.bandColors.set(8, '#FF69B4');  // Hot Pink - Creativity
    this.bandColors.set(9, '#FF1493');  // Deep Pink - Completion
    this.bandColors.set(10, '#32CD32'); // Lime Green - Community
    this.bandColors.set(11, '#00FFFF'); // Cyan - Gateway
    this.bandColors.set(12, '#1E90FF'); // Dodger Blue - Cosmic Time
    this.bandColors.set(13, '#FFD700'); // Gold - Transformation
    this.bandColors.set(14, '#8FBC8F'); // Dark Sea Green - Balance
    this.bandColors.set(15, '#FF00FF'); // Magenta - Magic
    this.bandColors.set(16, '#F0E68C'); // Khaki - Awakening
    this.bandColors.set(17, '#E6E6FA'); // Lavender - Star Consciousness
    this.bandColors.set(18, '#C0C0C0'); // Silver - Lunar/Feminine
    this.bandColors.set(19, '#FFD700'); // Gold - Solar/Masculine
    this.bandColors.set(20, '#FFFFFF'); // White - Clarity

    // Higher Bands (21-33) - Transcendent
    this.bandColors.set(21, '#ADD8E6'); // Light Blue - World
    this.bandColors.set(22, '#DDA0DD'); // Plum - Master Builder
    this.bandColors.set(23, '#FFE4B5'); // Moccasin - Royal Star
    this.bandColors.set(24, '#D2691E'); // Chocolate - Elder Wisdom
    this.bandColors.set(25, '#00FFFF'); // Cyan - Crystal
    this.bandColors.set(26, '#7FFFD4'); // Aquamarine - Shapeshifter
    this.bandColors.set(27, '#FF6347'); // Tomato - Dragon Power
    this.bandColors.set(28, '#FFA500'); // Orange - Phoenix
    this.bandColors.set(29, '#191970'); // Midnight Blue - Void
    this.bandColors.set(30, '#DCDCDC'); // Gainsboro - Mirror
    this.bandColors.set(31, '#DAA520'); // Goldenrod - Bridge
    this.bandColors.set(32, '#228B22'); // Forest Green - Tree of Life
    this.bandColors.set(33, '#FFFFFF'); // Pure White - Christ Consciousness

    // Initialize gradients for smooth transitions
    this.initializeGradients();
  }

  private initializeGradients(): void {
    // Sacred color transitions between bands
    for (let band = 1; band <= 33; band++) {
      const currentColor = this.bandColors.get(band) || '#FFFFFF';
      const nextColor = this.bandColors.get(band + 1) || '#FFFFFF';
      
      this.bandGradients.set(band, {
        start: currentColor,
        end: nextColor
      });
    }
  }

  /**
   * Get color for a specific band
   */
  public getBandColor(band: number): string {
    // Clamp band to valid range
    const clampedBand = Math.max(1, Math.min(33, Math.round(band)));
    return this.bandColors.get(clampedBand) || '#FFFFFF';
  }

  /**
   * Get gradient for band transition
   */
  public getBandGradient(band: number): { start: string; end: string } {
    const clampedBand = Math.max(1, Math.min(32, Math.floor(band)));
    return this.bandGradients.get(clampedBand) || { start: '#FFFFFF', end: '#FFFFFF' };
  }

  /**
   * Get interpolated color between bands
   */
  public getInterpolatedColor(band: number): string {
    const lowerBand = Math.floor(band);
    const upperBand = Math.ceil(band);
    const fraction = band - lowerBand;

    if (lowerBand === upperBand) {
      return this.getBandColor(band);
    }

    const color1 = this.hexToRgb(this.getBandColor(lowerBand));
    const color2 = this.hexToRgb(this.getBandColor(upperBand));

    if (!color1 || !color2) return '#FFFFFF';

    const r = Math.round(color1.r + (color2.r - color1.r) * fraction);
    const g = Math.round(color1.g + (color2.g - color1.g) * fraction);
    const b = Math.round(color1.b + (color2.b - color1.b) * fraction);

    return this.rgbToHex(r, g, b);
  }

  /**
   * Get consciousness stage color palette
   */
  public getStageColors(band: number): string[] {
    if (band <= 7) {
      // Chakra stage
      return ['#8B0000', '#FF4500', '#FFD700', '#00FF00', '#00CED1', '#4169E1', '#9400D3'];
    } else if (band <= 13) {
      // Transformation stage
      return ['#FF69B4', '#FF1493', '#32CD32', '#00FFFF', '#1E90FF', '#FFD700'];
    } else if (band <= 21) {
      // Integration stage
      return ['#8FBC8F', '#FF00FF', '#F0E68C', '#E6E6FA', '#C0C0C0', '#FFD700', '#FFFFFF', '#ADD8E6'];
    } else {
      // Transcendent stage
      return ['#DDA0DD', '#FFE4B5', '#D2691E', '#00FFFF', '#7FFFD4', '#FF6347', '#FFA500', '#191970', '#DCDCDC', '#DAA520', '#228B22', '#FFFFFF'];
    }
  }

  /**
   * Get aura effect colors for a band
   */
  public getAuraColors(band: number): string[] {
    const baseColor = this.getBandColor(band);
    const rgb = this.hexToRgb(baseColor);
    
    if (!rgb) return [baseColor];

    // Generate aura layers with decreasing opacity
    const auraColors = [];
    for (let i = 0; i < 3; i++) {
      const factor = 1 + (i * 0.2); // Lighten each layer
      const r = Math.min(255, Math.round(rgb.r * factor));
      const g = Math.min(255, Math.round(rgb.g * factor));
      const b = Math.min(255, Math.round(rgb.b * factor));
      auraColors.push(this.rgbToHex(r, g, b));
    }

    return auraColors;
  }

  /**
   * Get complementary color for contrast
   */
  public getComplementaryColor(band: number): string {
    const baseColor = this.getBandColor(band);
    const rgb = this.hexToRgb(baseColor);
    
    if (!rgb) return '#000000';

    // Calculate complementary color
    const r = 255 - rgb.r;
    const g = 255 - rgb.g;
    const b = 255 - rgb.b;

    return this.rgbToHex(r, g, b);
  }

  /**
   * Get sacred triad colors (120° apart on color wheel)
   */
  public getTriadColors(band: number): string[] {
    const baseColor = this.getBandColor(band);
    const hsl = this.hexToHsl(baseColor);
    
    if (!hsl) return [baseColor];

    const triad = [
      baseColor,
      this.hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
      this.hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
    ];

    return triad;
  }

  /**
   * Get activation pulse color sequence
   */
  public getActivationSequence(band: number): string[] {
    const baseColor = this.getBandColor(band);
    const sequence = [baseColor];

    // Add flash colors based on band level
    if (band >= 21) {
      // High bands get white/gold flashes
      sequence.push('#FFFFFF', '#FFD700', baseColor);
    } else if (band >= 13) {
      // Mid bands get complementary flashes
      sequence.push(this.getComplementaryColor(band), baseColor);
    } else {
      // Lower bands pulse with lighter versions
      const aura = this.getAuraColors(band);
      sequence.push(...aura, baseColor);
    }

    return sequence;
  }

  // Utility functions
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  private hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  private hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return this.rgbToHex(r, g, b);
  }
}