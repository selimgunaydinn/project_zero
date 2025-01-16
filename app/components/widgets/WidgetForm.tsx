import React from 'react';
import { IWidget } from '@/app/models/Widget';
import { Editor } from '@monaco-editor/react';
import { Input } from '@nextui-org/react';

interface WidgetFormProps {
  widget?: IWidget;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const WidgetForm: React.FC<WidgetFormProps> = ({ widget, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    name: widget?.name || '',
    type: 'Custom',
    isActive: widget?.isActive ?? true,
    data: {
      componentName: widget?.data?.componentName || '',
      code: widget?.data?.code || '',
      generatedComponent: widget?.data?.generatedComponent || ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Widget Adı
        </label>
        <Input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bileşen Adı
        </label>
        <Input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.data.componentName}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            data: { ...prev.data, componentName: e.target.value }
          }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          JSX/TSX Kodu
        </label>

        <Editor
        height="400px"
        defaultLanguage="html"
        value={formData.data.code}
        onChange={(value) => setFormData(prev => ({ 
          ...prev, 
          data: { ...prev.data, code: value }
        }))}
        theme="vs-dark"
        className="mb-4"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          lineNumbers: "on",
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          />
          <span className="ml-2 text-sm text-gray-600">Aktif</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onCancel}
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default WidgetForm; 