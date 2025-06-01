// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Frontend\src\components\UserPdfsPage.tsx
import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
  Button,
} from "@nextui-org/react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Checkbox,
  Grid2,
} from "@mui/material";
import { EditIcon } from "../../components/EditIcon";
import { DeleteIcon } from "../../components/DeleteIcon";
import { EyeIcon } from "../../components/EyeIcon";
import { URL } from "../../utlis/constants";
import { commonRequest } from "../../utlis/commonRequest";
import WebViewer from "@pdftron/webviewer";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { PDFDocument } from "pdf-lib";

const UserPdfsPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [instance, setInstance] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const viewerRef = useRef(null);
  const navigate = useNavigate();

  // Function to extract original file name
  const extractOriginalFileName = (filename) => {
    const parts = filename.split("-");
    const originalNameWithExtension = parts.slice(1).join("-");
    return originalNameWithExtension.replace(".pdf", "").trim();
  };

  // Function to fetch PDF data
  const fetchPdf = async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  // Fetch user PDFs on component mount
  useEffect(() => {
    const fetchUserPdfs = async () => {
      try {
        const response = await commonRequest("GET", "/user-pdfs", {
          withCredentials: true,
        });
        setPdfs(response.data);
      } catch (err) {
        setError("Failed to load PDFs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPdfs();
  }, []);

  // Initialize WebViewer when a PDF is selected
  useEffect(() => {
    if (selectedPdf && viewerRef.current) {
      WebViewer(
        {
          path: "/lib",
          initialDoc: `${URL}/${selectedPdf}`,
        },
        viewerRef.current
      ).then((instance) => {
        setInstance(instance);

        instance.Core.documentViewer.addEventListener("documentLoaded", () => {
          const doc = instance.Core.documentViewer.getDocument();
          if (doc) {
            setPageCount(doc.getPageCount());
          }
        });
      });
    }
  }, [selectedPdf]);

  // Handle view PDF action
  const handleView = (pdf) => {
    setSelectedPdf(pdf.path);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedPdf(null);
    setSelectedPages([]);
  };

  // Handle edit PDF action
  const handleEdit = (pdf) => {
    setSelectedPdf(pdf.path);
    setSelectedPages([]);
  };

  // Handle delete PDF action
  const handleDelete = async (pdf) => {
    // Implement delete functionality here
  };

  // Toggle page selection
  const togglePageSelection = (pageNumber) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((page) => page !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const downloadSelectedPages = async () => {
    if (!instance) {
      console.error("WebViewer instance is not available.");
      return;
    }

    const docViewer = instance.Core.documentViewer;
    const doc = docViewer.getDocument();

    if (!doc) {
      console.error("Document is not available.");
      return;
    }

    try {
      const pdfData = await doc.getFileData({ downloadType: "pdf" });
      const pdfBytes = new Uint8Array(pdfData);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const newPdfDoc = await PDFDocument.create();

      for (const pageNumber of selectedPages) {
        const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(page);
      }

      const pdfBytesNew = await newPdfDoc.save();
      const blob = new Blob([pdfBytesNew], { type: "application/pdf" });

      // Fallback using FileReader if URL.createObjectURL is unavailable
      const reader = new FileReader();
      reader.onloadend = function () {
        const downloadLink = document.createElement("a");
        downloadLink.href = reader.result;
        downloadLink.download = "extracted-pages.pdf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error extracting or exporting PDF:", error);
      setError("Failed to download selected pages. Please try again.");
    }
  };

  // Render page selection checkboxes
  const renderPageSelection = () => {
    if (pageCount === 0) return null;

    return (
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" className="text-black-200">
          Select Pages:
        </Typography>
        <div className="flex flex-wrap gap-4 mt-2">
          {Array.from({ length: pageCount }, (_, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                checked={selectedPages.includes(index + 1)}
                onChange={() => togglePageSelection(index + 1)}
                sx={{
                  color: "black.400",
                  "&.Mui-checked": { color: "red.500" },
                }}
              />
              <Typography className="text-black-200 ml-2">
                Page {index + 1}
              </Typography>
            </div>
          ))}
        </div>
      </Box>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-8">
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Box
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={24} className="text-red-400 mr-2" />
          <Typography variant="h6" className="text-red-400">
            Back
          </Typography>
        </Box>

        <Typography
          variant="h4"
          className="text-white mb-6 bg-gradient-to-r from-slate-200 via-black-300 to-slate-400 bg-clip-text text-transparent"
        >
          My Uploaded PDFs
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center">
            <Spinner color="warning" />
          </Box>
        )}
        {error && <Typography className="text-red-400 mb-4">{error}</Typography>}
        <Paper
          className="bg-black-800/60 backdrop-blur-lg border border-black-700/50"
          elevation={3}
          sx={{ padding: 3 }}
        >
          <Table
            aria-label="Uploaded PDFs Table"
            className="bg-transparent"
            css={{ background: "transparent" }}
          >
            <TableHeader>
              <TableColumn className="text-black-200 font-semibold">
                PDF Name
              </TableColumn>
              <TableColumn className="text-black-200 font-semibold text-center">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody items={pdfs}>
              {(item) => (
                <TableRow key={item._id} className="hover:bg-black-700/50">
                  <TableCell className="text-black-300">
                    {extractOriginalFileName(item.filename)}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={5} justifyContent="center">
                      <Tooltip content="View PDF">
                        <div
                          className="text-black-300 hover:text-red-400 cursor-pointer"
                          onClick={() => handleView(item)}
                        >
                          <EyeIcon />
                        </div>
                      </Tooltip>
                      <Tooltip content="Edit PDF">
                        <div
                          className="text-black-300 hover:text-red-400 cursor-pointer"
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </div>
                      </Tooltip>
                      <Tooltip content="Delete PDF">
                        <div
                          className="text-black-300 hover:text-red-400 cursor-pointer"
                          onClick={() => handleDelete(item)}
                        >
                          <DeleteIcon />
                        </div>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {selectedPdf && (
            <Box className="mt-4">
              <Box
                className="webviewer bg-black-900/50 border border-black-600 rounded-lg"
                ref={viewerRef}
                sx={{ height: 600, marginTop: 2 }}
              ></Box>

              {/* Page selection */}
              {renderPageSelection()}

              {/* Button container */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  sx={{ marginTop: 2 }}
                  onClick={downloadSelectedPages}
                >
                  Download Selected Pages
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  sx={{ marginTop: 2 }}
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default UserPdfsPage;