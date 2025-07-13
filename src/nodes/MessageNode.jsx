import { Handle } from '@xyflow/react';
import { BsWhatsapp } from 'react-icons/bs';
import { BiMessageRoundedDetail } from 'react-icons/bi';

export default function MessageNode({ data }) {
  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow-lg min-w-[240px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-teal-100 rounded-t-xl px-3 py-1 border-b border-blue-200">
        <span className="flex items-center gap-1">
          <BiMessageRoundedDetail style={{ color: 'green', fontSize: '13px' }} />
          <span className="font-bold text-teal-800" style={{fontSize:'11px'}}>Send Message</span>
        </span>
        <BsWhatsapp style={{ color: 'green', fontSize: '10px' }} />
      </div>
      {/* Body */}
      <div className="px-4 py-3 text-gray-800">
        {data.label}
      </div>
      {/* Output handle for connecting to next node */}
      <Handle type="source" position="bottom" className="!bg-blue-400" />
      {/* Input handle for connecting from previous node */}
      <Handle type="target" position="top" className="!bg-blue-400" />
    </div>
  );
} 