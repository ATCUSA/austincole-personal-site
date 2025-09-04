import type { APIRoute } from 'astro';
import { getCVData } from '../../utils/cv';

export const GET: APIRoute = async () => {
  try {
    // PDF generation with PDFKit is not compatible with Cloudflare Workers
    // For now, redirect to the static PDF or return JSON data for external PDF generation
    const cvData = getCVData();
    
    // Return structured data that can be used by external PDF generators
    const pdfData = {
      ...cvData,
      generatedAt: new Date().toISOString(),
      message: 'PDF generation via browser API is not available in this environment. Use the scripts/generate-pdf.ts script locally.'
    };
    
    return new Response(JSON.stringify(pdfData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=300'
      }
    });
  } catch (error) {
    console.error('PDF data error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
