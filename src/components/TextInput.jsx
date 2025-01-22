const TextInput = ({ text, setText }) => {
  return (
    <div className="w-full">
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
        Enter text to remix
      </label>
      <textarea
        id="content"
        rows={6}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Paste your content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default TextInput; 