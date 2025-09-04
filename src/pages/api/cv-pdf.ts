import type { APIRoute } from 'astro';
import { getCVData } from '../../utils/cv';

export const GET: APIRoute = async ({ request }) => {
  try {
    // For now, return JSON data that can be used with external PDF generation
    // In production, you'd use Puppeteer or similar to generate actual PDF
    const cvData = getCVData();
    
    // Format data for PDF generation
    const pdfData = {
      ...cvData,
      generatedAt: new Date().toISOString(),
      url: new URL(request.url).origin + '/cv'
    };

    return new Response(JSON.stringify(pdfData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to generate PDF data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
