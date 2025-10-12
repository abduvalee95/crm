# Dynamic Search Configuration

Bu papka turli sahifalar uchun search va filter konfiguratsiyalarini o'z ichiga oladi.

## Qanday ishlatish

### 1. SearchBar komponentini ishlatish

```tsx
import SearchBar from '@/features/search/search';
import { clientSearchConfig } from '@/lib/config/searchConfigs';

const MyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  return (
    <SearchBar 
      onSearchChange={setSearchTerm}
      onStatusFilter={setStatusFilter}
      onSortChange={setSortBy}
      config={clientSearchConfig}
    />
  );
};
```

### 2. Yangi konfiguratsiya yaratish

```tsx
export const myCustomSearchConfig: SearchConfig = {
  placeholder: "Mening maxsus qidiruv...",
  searchFields: ['field1', 'field2', 'field3'],
  showStatusFilter: true,
  showSortOptions: true,
  statusOptions: [
    {
      value: 'all',
      label: 'Barchasi',
    },
    {
      value: 'active',
      label: 'Faol',
      badge: <Badge>Faol</Badge>,
    },
  ],
  sortOptions: [
    { value: 'name', label: 'Ism bo\'yicha' },
    { value: 'date', label: 'Sana bo\'yicha' },
  ],
};
```

### 3. Header komponentida filterlarni ko'rsatish

```tsx
<HeaderClient 
  searchTerm={searchTerm}
  statusFilter={statusFilter}
  sortBy={sortBy}
/>
```

## Mavjud konfiguratsiyalar

- `clientSearchConfig` - Klientlar uchun
- `dealSearchConfig` - Sotuvlar uchun  
- `taskSearchConfig` - Vazifalar uchun
- `employeeSearchConfig` - Xodimlar uchun

## Xususiyatlar

- ✅ **Dynamic placeholder** - Har bir sahifa uchun alohida
- ✅ **Flexible status options** - Turli statuslar va badge'lar
- ✅ **Custom sort options** - Har xil tartiblash variantlari
- ✅ **Header integration** - Faol filterlarni ko'rsatish
- ✅ **TypeScript support** - To'liq type safety
- ✅ **Reusable** - Har qanday sahifada ishlatish mumkin
