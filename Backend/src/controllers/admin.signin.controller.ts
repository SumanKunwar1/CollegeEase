import { RequestHandler } from 'express';
import User from '../models/user';
import exceljs from 'exceljs';

export const getAllRegisteredUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v -refreshToken');
    
    // Ensure consistent response structure
    res.status(200).json({
      status: 'success',
      data: {
        users: users.map(user => ({
          ...user.toObject(),
          // Safe handling of createdAt
          createdAt: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString(),
          // Ensure documents array exists
          supportDocuments: user.supportDocuments || []
        }))
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

export const exportUsersToExcel: RequestHandler = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v -refreshToken');

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Registered Users');

    // Add headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'User Type', key: 'userType', width: 15 },
      { header: 'Organization', key: 'organizationName', width: 30 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Registered At', key: 'createdAt', width: 20 },
      { header: 'Documents Count', key: 'documentsCount', width: 15 }
    ];

    // Add data rows with improved formatting and null checks
    users.forEach(user => {
      worksheet.addRow({
        id: user._id.toString(),
        email: user.email,
        userType: user.userType,
        organizationName: user.organizationName || 'N/A',
        location: user.location || 'N/A',
        // Safe handling of createdAt
        createdAt: user.createdAt 
          ? user.createdAt.toLocaleDateString() 
          : new Date().toLocaleDateString(),
        documentsCount: user.supportDocuments?.length || 0
      });
    });

    // Style header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=users_export_${new Date().toISOString().split('T')[0]}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to export users',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};