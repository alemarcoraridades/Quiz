import React from 'react';

interface ProductMapping {
  questionId: string;
  answer: string;
  product: {
    imageUrl: string;  // This will now store the Base64 URL
    checkoutLink: string;
    finalmessage: string;
  };
}

interface ProductMappingEditorProps {
  productMappings: ProductMapping[];
  questions: { id: string; title: string; options?: string[] }[]; // Add questions prop
  onChange: (index: number, field: string, value: any) => void;
}

export const ProductMappingEditor: React.FC<ProductMappingEditorProps> = ({
  productMappings,
  questions,
  onChange,
}) => {

   // Function to handle file selection
  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the file to a Base64 URL
      const base64Url = reader.result as string;
      onChange(index, 'product', { imageUrl: base64Url });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {productMappings.map((mapping, index) => {
        const selectedQuestion = questions.find((q) => q.id === mapping.questionId);
        const answerOptions = selectedQuestion?.options || [];

        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg">Product Mapping {index + 1}</h3>
            <div className="mt-2 space-y-2">
              {/* Question ID Dropdown */}
              <select
                value={mapping.questionId}
                onChange={(e) => onChange(index, 'questionId', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a Question</option>
                {questions.map((question) => (
                  <option key={question.id} value={question.id}>
                    {question.title}
                  </option>
                ))}
              </select>

              {/* Answer Dropdown */}
              <select
                value={mapping.answer}
                onChange={(e) => onChange(index, 'answer', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an Answer</option>
                {answerOptions.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Product Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  accept="image/*" // Allow only image files
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(index, file);
                    }
                  }}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
                {mapping.product.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={mapping.product.imageUrl}
                      alt="Product Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>



              {/* Product Checkout Link */}
              <input
                type="text"
                placeholder="Product Checkout Link"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={mapping.product.checkoutLink}
                onChange={(e) => onChange(index, 'product', { checkoutLink: e.target.value })}
              />
              {/* Final Message */}
              <input
                type="text"
                placeholder="Este produto foi feito para você"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={mapping.product.finalmessage}
                onChange={(e) => onChange(index, 'product', { finalmessage: e.target.value })}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
};
