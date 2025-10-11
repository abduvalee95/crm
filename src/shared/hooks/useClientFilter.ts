import { useState, useMemo } from 'react';
import { Client } from '@/lib/types/types';
import { recentClients } from '@/lib/data/client';

export const useClientFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Client['status'] | 'all'>('all');
  // const [sortBy, setSortBy] = useState<'name' | 'company' | 'status'>('name');

  const filteredClients = useMemo(() => {
    let filtered = recentClients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.number.includes(searchTerm)
      );
    }

    // // Filter by status
    // if (statusFilter !== 'all') {
    //   filtered = filtered.filter(client => client.status === statusFilter);
    // }

    // // Sort clients
    // filtered.sort((a, b) => {
    //   switch (sortBy) {
    //     case 'name':
    //       return a.name.localeCompare(b.name);
    //     case 'company':
    //       return a.company.localeCompare(b.company);
    //     case 'status':
    //       return a.status.localeCompare(b.status);
    //     default:
    //       return 0;
    //   }
    // });

    return filtered;
  }, [searchTerm, statusFilter]);//sortBy

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    // sortBy,
    // setSortBy,
    filteredClients,
    totalClients: recentClients.length,
    filteredCount: filteredClients.length
  };
};
