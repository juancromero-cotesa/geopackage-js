import { CanvasAdapter } from './canvasAdapter';

export class Canvas {
  private static adapter: CanvasAdapter = undefined;

  static registerCanvasAdapter (adapter: any) {
    Canvas.adapter = new adapter();
  }

  static adapterInitialized (): boolean {
    return Canvas.adapter != null && Canvas.adapter.isInitialized();
  }

  static async initializeAdapter () {
    if (!Canvas.adapter.isInitialized()) {
      await Canvas.adapter.initialize();
    }
  }

  static checkCanvasAdapter() {
    if (!Canvas.adapter) {
      throw new Error('Canvas adapter not registered.');
    }
    if (!Canvas.adapter.isInitialized()) {
      throw new Error('Canvas adapter not initialized.');
    }
  }

  static create (width, height) {
    Canvas.checkCanvasAdapter();
    return Canvas.adapter.create(width, height);
  }

  static async createImage (data: any, contentType: string = 'image/png'): Promise<{image: any, width: number, height: number}> {
    Canvas.checkCanvasAdapter();
    return Canvas.adapter.createImage(data, contentType);
  }

  static createImageData (width, height) {
    Canvas.checkCanvasAdapter();
    return Canvas.adapter.createImageData(width, height);
  }

  static disposeCanvas(canvas) {
    Canvas.checkCanvasAdapter();
    Canvas.adapter.disposeCanvas(canvas);
  }

  static measureText(context: CanvasRenderingContext2D, fontFace: string, fontSize: number, text: string): number {
    Canvas.checkCanvasAdapter();
    return Canvas.adapter.measureText(context, fontFace, fontSize, text);
  }

  static drawText(context: CanvasRenderingContext2D, text: string, location: number[], fontFace: string, fontSize: number, fontColor: string) {
    Canvas.checkCanvasAdapter();
    return Canvas.adapter.drawText(context, text, location, fontFace, fontSize, fontColor);
  }

  static scaleImage(image: {image: any, width: number, height: number}, scale: number) {
    Canvas.checkCanvasAdapter();
    return Canvas.adapter.scaleImage(image, scale);
  }
}