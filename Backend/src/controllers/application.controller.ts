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
  let formData;
  try {
    formData = JSON.parse(req.body.data);
  } catch (error) {
    throw new ApiError(400, 'Invalid form data format');
  }

  const files = req.files as Express.Multer.File[];
  
  // Process files into documents array
  const documents: Array<{
    type: string;
    fileName: string;
    filePath: string;
  }> = [];

  if (files && files.length > 0) {
    files.forEach(file => {
      // Extract the document type from the fieldname
      const type = file.fieldname;
      documents.push({
        type,
        fileName: file.originalname,
        filePath: file.path
      });
    });
  }

  // Create application with all form data
  const application = await Application.create({
    collegeName,
    studentName: formData.studentName,
    email: formData.email,
    phone: formData.phone,
    program: formData.program,
    level: formData.level,
    intake: formData.intake,
    status: 'pending',
    // Personal Info
    firstName: formData.firstName,
    lastName: formData.lastName,
    dob: formData.dob,
    nationality: formData.nationality,
    // Test Scores
    testType: formData.testType,
    testScore: formData.testScore,
    testDate: formData.testDate,
    // Additional Info
    projects: formData.projects,
    publications: formData.publications,
    researchExperience: formData.researchExperience,
    workExperience: formData.workExperience,
    statementOfPurpose: formData.statementOfPurpose,
    // Education History
    previousEducation: formData.previousEducation,
    // Documents
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

  if (!application.documents || application.documents.length === 0) {
    throw new ApiError(400, 'No documents available for download');
  }

  const archive = archiver('zip', { zlib: { level: 9 } });
  
  // Set proper headers for zip file download
  res.attachment(`${application.studentName}_${application.program}_documents.zip`);
  archive.pipe(res);

  let filesAdded = false;

  // Process each document
  for (const doc of application.documents) {
    try {
      // Construct absolute file path
      const absolutePath = path.resolve(__dirname, '../../', doc.filePath);
      
      if (fs.existsSync(absolutePath)) {
        // Read file as buffer and append to archive
        const fileBuffer = fs.readFileSync(absolutePath);
        archive.append(fileBuffer, { name: doc.fileName });
        filesAdded = true;
      } else {
        console.warn(`File not found: ${absolutePath}`);
      }
    } catch (error) {
      console.error(`Error processing file ${doc.fileName}:`, error);
    }
  }

  if (!filesAdded) {
    throw new ApiError(400, 'No valid documents found to download');
  }

  // Finalize the archive
  await archive.finalize();
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