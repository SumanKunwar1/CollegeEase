import { Request, Response } from 'express';
import Application from '../models/application.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/apiError';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const submitApplication = asyncHandler(async (req: Request, res: Response) => {
  const { collegeName } = req.params;
  
  // Parse the form data
  const formData = JSON.parse(req.body.data);
  const files = req.files as Express.Multer.File[];
  
  if (!files || Object.keys(files).length === 0) {
    throw new ApiError(400, 'No documents uploaded');
  }
  
  // Process files into documents array
  const documents: Array<{
    type: string;
    fileName: string;
    filePath: string;
  }> = [];
  
  Object.entries(files).forEach(([fieldName, fileArray]) => {
    if (Array.isArray(fileArray)) {
      fileArray.forEach(file => {
        documents.push({
          type: fieldName,
          fileName: file.originalname,
          filePath: file.path
        });
      });
    }
  });
  
  const application = await Application.create({
    collegeName,
    ...formData,
    documents
  });
  
  res.status(201).json(new ApiResponse(201, application, 'Application submitted successfully'));
});

const getApplications = asyncHandler(async (req: Request, res: Response) => {
  const { collegeName } = req.params;
  
  const applications = await Application.find({ collegeName }).sort({ createdAt: -1 });
  
  res.status(200).json(new ApiResponse(200, applications));
});

const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, interviewDate, score } = req.body;

  const application = await Application.findByIdAndUpdate(
    id,
    { status, ...(interviewDate && { interviewDate }), ...(score && { score }) },
    { new: true }
  );

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  res.status(200).json(new ApiResponse(200, application, 'Application status updated'));
});

const downloadDocuments = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  if (application.documents.length === 0) {
    throw new ApiError(400, 'No documents to download');
  }

  const zip = archiver('zip', { zlib: { level: 9 } });
  res.attachment(`${application.studentName}_${application.program}_documents.zip`);

  zip.pipe(res);

  application.documents.forEach(doc => {
    const filePath = path.join(__dirname, '../../', doc.filePath);
    if (fs.existsSync(filePath)) {
      zip.file(filePath, { name: doc.fileName });
    }
  });

  await zip.finalize();
});

const downloadSelectedDocuments = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { documentTypes } = req.body;

  if (!documentTypes || !Array.isArray(documentTypes)) {
    throw new ApiError(400, 'Invalid document types');
  }

  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  const selectedDocs = application.documents.filter(doc => 
    documentTypes.includes(doc.type)
  );

  if (selectedDocs.length === 0) {
    throw new ApiError(400, 'No matching documents found');
  }

  const zip = archiver('zip', { zlib: { level: 9 } });
  res.attachment(`${application.studentName}_${application.program}_selected_documents.zip`);

  zip.pipe(res);

  selectedDocs.forEach(doc => {
    const filePath = path.join(__dirname, '../../', doc.filePath);
    if (fs.existsSync(filePath)) {
      zip.file(filePath, { name: doc.fileName });
    }
  });

  await zip.finalize();
});

export {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  downloadDocuments,
  downloadSelectedDocuments
};