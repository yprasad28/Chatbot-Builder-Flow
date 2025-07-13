import { Handle } from '@xyflow/react';
import { FaUser } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';

export default function UserInputNode({ data }) {
  return (
    <div className="bg-white border border-green-200 rounded-xl shadow-lg min-w-[240px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-green-100 rounded-t-xl px-3 py-1 border-b border-green-200">
        <span className="flex items-center gap-1">
          <FaUser style={{ color: 'green', fontSize: '11px' }} />
          <span className="font-bold text-green-800" style={{fontSize:'11px'}}>Send Message</span>
        </span>
        <BsWhatsapp style={{ color: 'green', fontSize: '10px' }} />
      </div>
      {/* Body */}
      <div className="px-4 py-3 text-gray-800">
        {data.label || "User response here..."}
      </div>
      {/* Input handle for connecting from previous node */}
      <Handle type="target" position="top" className="!bg-green-400" />
      {/* Output handle for connecting to next node */}
      <Handle type="source" position="bottom" className="!bg-green-400" />
    </div>
  );
} 