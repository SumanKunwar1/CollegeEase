import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, message, Tag } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  email: string;
  userType: string;
  organizationName?: string;
  location?: string;
  createdAt: string;
  supportDocuments?: string[];
}

const AdminSignIn = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const navigate = useNavigate();

  // Create axios instance with credentials
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  // Add response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        message.error('Session expired. Please login again.');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  // Add this debug useEffect to check the received data
  useEffect(() => {
    console.log('Users data:', users); // Add this to verify data
  }, [users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/registered-users');
      console.log('API Response:', response.data); // Debug log
      
      // Ensure proper data structure
      if (response.data && response.data.data && response.data.data.users) {
        setUsers(response.data.data.users);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Received unexpected data format');
      }
    } catch (error) {
      console.error('Detailed fetch error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        if (error.response?.status !== 401) {
          message.error(`Failed to fetch users: ${error.message}`);
        }
      } else {
        message.error('Failed to fetch users');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleExport = async () => {
    try {
      setExportLoading(true);
      const response = await api.get('/admin/export-users', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'registered_users.xlsx');
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      link.parentNode?.removeChild(link);
      
      message.success('Export successful');
    } catch (error) {
      console.error('Error exporting users:', error);
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Failed to export users');
      }
    } finally {
      setExportLoading(false);
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch(userType) {
      case 'institute': return 'purple';
      case 'industry': return 'blue';
      case 'scholarship': return 'green';
      case 'mentor': return 'orange';
      default: return 'gray';
    }
  };

  const columns: ColumnType<User>[] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'userType',
      render: (userType: string) => (
        <Tag color={getUserTypeColor(userType)} className="capitalize">
          {userType}
        </Tag>
      ),
      filters: [
        { text: 'Institute', value: 'institute' },
        { text: 'Industry', value: 'industry' },
        { text: 'Scholarship', value: 'scholarship' },
        { text: 'Mentor', value: 'mentor' },
      ],
      onFilter: (value, record) => record.userType === value,
    },
    {
      title: 'Organization',
      dataIndex: 'organizationName',
      key: 'organizationName',
      render: (org) => org || 'N/A',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (loc) => loc || 'N/A',
    },
    {
      title: 'Registered Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Documents',
      dataIndex: 'supportDocuments',
      key: 'documents',
      render: (docs: string[] | undefined) => (
        <div className="flex flex-wrap gap-1">
          {docs?.map((doc: string, i: number) => (
            <a 
              key={i} 
              href={`${import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '')}/uploads/${doc.split('/').pop()}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xs"
            >
              Doc {i+1}
            </a>
          )) || 'None'}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registered Users</h1>
        <Space>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            loading={exportLoading}
          >
            Export to Excel
          </Button>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={fetchUsers} 
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      </div>
      
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AdminSignIn;