import * as pdfjsLib from 'pdfjs-dist';
// Import pdfjs worker URL directly via Vite to avoid CORS and external CDN failures
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

/**
 * Converts a PDF File into an array of base64 PNG Data URLs (one per page)
 */
export async function convertPdfToImages(
  file: File,
  onProgress?: (renderedPages: number, totalPages: number) => void
): Promise<string[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;
    const pageImages: string[] = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      
      // Higher scale (1.8 - 2.0) ensures high-fidelity text recognition & visual quality
      const viewport = page.getViewport({ scale: 1.8 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Canvas 2D context creation failed');
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext: any = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      const dataUrl = canvas.toDataURL('image/png');
      pageImages.push(dataUrl);

      if (onProgress) {
        onProgress(pageNum, totalPages);
      }
    }

    return pageImages;
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    throw new Error(`Failed to render PDF pages: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Reads an image file (PNG/JPEG/WEBP) and converts it into a base64 Data URL
 */
export function convertImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image as Data URL'));
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
