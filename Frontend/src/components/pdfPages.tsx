import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";

interface PdfPage {
  pageNumber: number;
  selected: boolean;
  dataUrl?: string;

}

export default function PdfPages() {
  const { pdfId } = useParams<{ pdfId: string }>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [pdfData, setPdfData] = useState<{ filePath: string; pageCount: number } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchPdfData = async () => {
      try {
        const response = await axiosInstance.get(`/pdf/user-pdfs`);
        const pdf = response.data.pdfs.find((p: any) => p._id === pdfId);
        if (pdf) {
          setPdfData({ filePath: pdf.filePath, pageCount: pdf.pageCount });
        }
      } catch (error) {
        console.error("Failed to fetch PDF data:", error);
      }
    };

    fetchPdfData();
  }, [pdfId, isAuthenticated, navigate]);

  useEffect(() => {
    if (pdfData) {
      const loadPdf = async () => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js";
        const pdfDoc = await pdfjsLib.getDocument(`/uploads/${pdfData.filePath}`).promise;
        setPdf(pdfDoc);
        setPages(
          Array.from({ length: pdfData.pageCount }, (_, i) => ({
            pageNumber: i + 1,
            selected: false,
          }))
        );
      };
      loadPdf();
    }
  }, [pdfData]);

  const handleCheckboxChange = (pageNumber: number) => {
    setPages((prev) =>
      prev.map((page) =>
        page.pageNumber === pageNumber ? { ...page, selected: !page.selected } : page
      )
    );
  };

  const renderPage = async (pageNumber: number) => {
    if (!pdf) return;
    const page = await pdf.getPage(pageNumber);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const viewport = page.getViewport({ scale: 0.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context!, viewport }).promise;
    return canvas.toDataURL();
  };

  useEffect(() => {
    const renderPages = async () => {
      if (!pdf) return;
      const pageCanvases = await Promise.all(
        pages.map(async (page) => ({
          pageNumber: page.pageNumber,
          dataUrl: await renderPage(page.pageNumber),
        }))
      );
      setPages((prev) =>
        prev.map((page) => {
          const canvas = pageCanvases.find((c) => c.pageNumber === page.pageNumber);
          return { ...page, dataUrl: canvas?.dataUrl };
        })
      );
    };
    renderPages();
  }, [pdf]);

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Select PDF Pages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {pages.map((page) => (
          <div key={page.pageNumber} className="relative border rounded-lg p-2">
            <input
              type="checkbox"
              checked={page.selected}
              onChange={() => handleCheckboxChange(page.pageNumber)}
              className="absolute top-2 left-2 h-5 w-5"
            />
            {page.dataUrl ? (
              <img src={page.dataUrl} alt={`Page ${page.pageNumber}`} className="w-full h-auto" />
            ) : (
              <div>Loading page {page.pageNumber}...</div>
            )}
            <p className="text-center text-sm mt-2">Page {page.pageNumber}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => {
            const selectedPages = pages.filter((p) => p.selected).map((p) => p.pageNumber);
            console.log("Selected pages:", selectedPages);
            // TODO: Implement logic to create new PDF with selected pages
          }}
          className="bg-primary text-primary-foreground"
        >
          Create PDF
        </Button>
      </div>
    </div>
  );
}