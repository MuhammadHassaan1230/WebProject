import React, { useState } from 'react';

const UploadResource = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState('file'); // 'file' or 'link'
  const [file, setFile] = useState(null);
  const [articleLink, setArticleLink] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      description,
      resourceType,
      file,
      articleLink,
    });
    alert('Resource submitted successfully!');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Upload Resource</h2>

      <form onSubmit={handleSubmit}>
        {/* Resource Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Resource Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter resource name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Resource Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder="Provide a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Resource Type Selection */}
        <div className="mb-4">
          <label className="font-medium mb-2 block text-gray-700">Resource Type</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="file">File (PDF/Video)</option>
            <option value="link">Article Link</option>
          </select>
        </div>

        {/* File Upload Input */}
        {resourceType === 'file' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-600"
            />
          </div>
        )}

        {/* Article Link Input */}
        {resourceType === 'link' && (
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 font-medium mb-2">
              Article URL
            </label>
            <input
              id="link"
              type="url"
              placeholder="Paste the article link"
              value={articleLink}
              onChange={(e) => setArticleLink(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 rounded-md mt-4 hover:bg-indigo-700 transition"
        >
          Submit Resource
        </button>
      </form>
    </div>
  );
};

export default UploadResource;
