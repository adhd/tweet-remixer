const RemixButton = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
    >
      {isLoading ? 'Remixing...' : 'Remix Content'}
    </button>
  );
};

export default RemixButton; 