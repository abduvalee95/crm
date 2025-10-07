import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Search } from 'lucide-react'

// Шапка сайта
const Header = () => (
  <header className="bg-[#0F1115] h-16 flex items-center justify-between px-6 border-b border-gray-800">
     <div className="flex items-center">
        {/* Search bar for larger screens */}
        <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input placeholder="Поиск клиентов, сделок..." className="w-64 lg:w-96 pl-10 bg-[#1B1E23] border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
        <Bell />
      </Button>
      {/* User Nav will be here */}
    </div>
  </header>
);