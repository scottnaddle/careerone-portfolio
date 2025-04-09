declare module 'jspdf' {
  interface jsPDFOptions {
    orientation?: 'portrait' | 'landscape';
    unit?: 'pt' | 'mm' | 'cm' | 'in';
    format?: string | [number, number];
    hotfixes?: string[];
    encryption?: any;
    compress?: boolean;
    precision?: number;
    filters?: any;
  }

  interface jsPDFStatic {
    new(options?: jsPDFOptions): jsPDFInstance;
  }

  interface ImageProperties {
    width: number;
    height: number;
  }

  interface jsPDFInstance {
    internal: {
      pageSize: {
        getWidth: () => number;
        getHeight: () => number;
      };
    };
    addImage: (imageData: string, format: string, x: number, y: number, width: number, height: number) => void;
    save: (filename: string) => void;
    getImageProperties: (imageData: string) => ImageProperties;
  }

  const jsPDF: jsPDFStatic;
  export default jsPDF;
}

declare module 'html2canvas' {
  interface Html2CanvasOptions {
    scale?: number;
    width?: number;
    height?: number;
    logging?: boolean;
    proxy?: string;
    allowTaint?: boolean;
    removeContainer?: boolean;
    backgroundColor?: string;
    foreignObjectRendering?: boolean;
    useCORS?: boolean;
  }

  interface HTMLCanvasElement {
    toDataURL(type?: string, quality?: any): string;
  }

  function html2canvas(element: HTMLElement, options?: Html2CanvasOptions): Promise<HTMLCanvasElement>;
  export default html2canvas;
} 