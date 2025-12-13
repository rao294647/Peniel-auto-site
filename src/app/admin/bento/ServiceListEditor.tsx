
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ServiceListEditor({ services, onChange }: { services: { name: string; time: string }[], onChange: (s: any[]) => void }) {
    const [newName, setNewName] = useState("");
    const [newTime, setNewTime] = useState("");

    const handleAdd = () => {
        if (newName && newTime) {
            onChange([...services, { name: newName, time: newTime }]);
            setNewName("");
            setNewTime("");
        }
    };

    return (
        <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="font-medium text-church-gold">Service Timings</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Service Name (e.g. Sunday Worship)"
                    className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-church-gold/50 outline-none"
                />
                <div className="flex gap-2">
                    <input
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        placeholder="Time (e.g. 10:00 AM)"
                        className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white flex-1 focus:border-church-gold/50 outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="bg-church-gold text-black p-2 rounded-lg hover:bg-yellow-400 shrink-0"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div className="space-y-2 mt-2 max-h-40 overflow-y-auto custom-scrollbar">
                {services.length === 0 && <p className="text-xs text-white/40 italic">No services added.</p>}

                {/* Reorder requires the whole list to be Reorder.Group; simplification for now: just list */}
                {services.map((svc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                        <div className="flex-1">
                            <p className="font-medium text-white text-sm">{svc.name}</p>
                            <p className="text-xs text-white/50">{svc.time}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const newSvcs = [...services];
                                newSvcs.splice(idx, 1);
                                onChange(newSvcs);
                            }}
                            className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
