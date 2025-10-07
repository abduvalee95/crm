import React, { useState } from "react";
import { useClients } from "../../shared/lib/hooks/useClients";
import { Input } from "../../shared/ui/Input";
import { ClientCard } from "./ClientCard";

export const ClientList: React.FC = () => {
  const [q, setQ] = useState("");
  const { data: clients, isLoading } = useClients(q);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search clients..." />
      </div>

      {isLoading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients?.map(c => <ClientCard key={c.id} client={c} />)}
        </div>
      )}
    </div>
  );
};
