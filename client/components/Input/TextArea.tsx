import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = 
({ label, error, ...props }, ref) => {
  return (
    <div className="relative w-full mx-auto">
        {
        label && 
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        }
        <textarea
            {...props}
            ref={ref}
            className={`mt-1 block w-full h-[100px] rounded-md border 
              ${error ? 'border-red-600' : 'border-gray-600'} 
              shadow-sm focus:border-blue-500 focus:ring 
              focus:ring-blue-200 focus:ring-opacity-50 p-2 resize-none`}
        />
        {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default React.forwardRef(TextArea);
