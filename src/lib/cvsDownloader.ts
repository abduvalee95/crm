interface CSVData {
  [key: string]: string | number | boolean | null | undefined;
}

interface CSVDownloadOptions {
  filename?: string;
  delimiter?: string;
  includeHeaders?: boolean;
}

const csvDownloader = (
  data: CSVData[],
  options: CSVDownloadOptions = {}
): void => {
  const {
    filename = 'data.csv',
    delimiter = ',',
    includeHeaders = true
  } = options;

  if (!data || data.length === 0) {
    console.warn('No data provided for CSV download');
    return;
  }

  // Get headers from the first object's keys
  const headers = Object.keys(data[0]);
  
  // Convert data to CSV format
  let csvContent = '';
  
  // Add headers if requested
  if (includeHeaders) {
    csvContent += headers.join(delimiter) + '\n';
  }
  
  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Handle null/undefined values
      if (value === null || value === undefined) {
        return '';
      }
      // Escape values that contain delimiter, quotes, or newlines
      const stringValue = String(value);
      if (stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvContent += values.join(delimiter) + '\n';
  });

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export default csvDownloader;

// Export additional utility functions
export const downloadCSV = csvDownloader;

export const formatCSVData = (
  data: CSVData[],
  options: CSVDownloadOptions = {}
): string => {
  const {
    delimiter = ',',
    includeHeaders = true
  } = options;

  if (!data || data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]);
  let csvContent = '';
  
  if (includeHeaders) {
    csvContent += headers.join(delimiter) + '\n';
  }
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) {
        return '';
      }
      const stringValue = String(value);
      if (stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvContent += values.join(delimiter) + '\n';
  });

  return csvContent;
};