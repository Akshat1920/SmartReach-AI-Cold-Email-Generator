import React, { useState } from 'react'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const ResultCard = ({title , content , type}) => {

    const [copied , setCopied] = useState('');

     const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(''), 2000);
    };

  return (
     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">{title}</h3>
                <button
                    onClick={() => copyToClipboard(content, type)}
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    title="Copy"
                >
                    {copied === type ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{content}</p>
        </div>
  )
}

export default ResultCard
