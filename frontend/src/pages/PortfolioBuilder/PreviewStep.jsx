import { useState } from "react";

export default function PreviewStep({ formData }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('portfolio');

    const generatePortfolio = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/portfolio/generate-portfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate portfolio');
            }

            const data = await response.json();
            setGeneratedContent(data.generatedContent);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadFile = (content, filename) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const openPortfolioPreview = () => {
        const newWindow = window.open();
        newWindow.document.write(generatedContent.portfolioHTML);
        newWindow.document.close();
    };

    if (!generatedContent) {
        return (
            <div className="space-y-6">
                {/* Preview Summary */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Preview Your Information</h3>
                    
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Name</p>
                            <p className="text-sm text-gray-900">{formData.fullName || 'Not provided'}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Title</p>
                            <p className="text-sm text-gray-900">{formData.title || 'Not provided'}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Bio</p>
                            <p className="text-sm text-gray-900">{formData.bio || 'Not provided'}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Skills</p>
                            <p className="text-sm text-gray-900">{formData.skills || 'Not provided'}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Projects</p>
                            <p className="text-sm text-gray-900">
                                {formData.projects.filter(p => p.name).length} project(s)
                            </p>
                        </div>
                    </div>
                </div>

                {/* What Will Be Generated */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">✨ What Will Be Generated</h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-indigo-600 font-bold">1</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Portfolio Website</p>
                                <p className="text-sm text-gray-600">A beautiful, responsive single-page portfolio</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-purple-600 font-bold">2</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">GitHub Profile README</p>
                                <p className="text-sm text-gray-600">Professional README with stats and badges</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-pink-600 font-bold">3</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Project READMEs</p>
                                <p className="text-sm text-gray-600">Detailed documentation for each project</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={generatePortfolio}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl
                             hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating... This may take 30-60 seconds
                        </span>
                    ) : (
                        '🚀 Generate My Portfolio'
                    )}
                </button>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-sm text-red-600">❌ {error}</p>
                    </div>
                )}
            </div>
        );
    }

    // Results View
    return (
        <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-700 font-semibold">✅ Portfolio generated successfully!</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`px-4 py-2 font-medium text-sm transition border-b-2 ${
                        activeTab === 'portfolio'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Portfolio Website
                </button>
                <button
                    onClick={() => setActiveTab('readme')}
                    className={`px-4 py-2 font-medium text-sm transition border-b-2 ${
                        activeTab === 'readme'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    GitHub README
                </button>
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`px-4 py-2 font-medium text-sm transition border-b-2 ${
                        activeTab === 'projects'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Project READMEs
                </button>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                {activeTab === 'portfolio' && (
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <button
                                onClick={openPortfolioPreview}
                                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                            >
                                👁️ Preview in New Tab
                            </button>
                            <button
                                onClick={() => downloadFile(generatedContent.portfolioHTML, 'portfolio.html')}
                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                            >
                                ⬇️ Download HTML
                            </button>
                        </div>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                            {generatedContent.portfolioHTML.substring(0, 500)}...
                        </pre>
                    </div>
                )}

                {activeTab === 'readme' && (
                    <div className="space-y-4">
                        <button
                            onClick={() => downloadFile(generatedContent.githubReadme, 'README.md')}
                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                            ⬇️ Download README.md
                        </button>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
                            {generatedContent.githubReadme}
                        </pre>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="space-y-4">
                        {generatedContent.projectExplanations.map((proj, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-900">{proj.projectName}</h4>
                                    <button
                                        onClick={() => downloadFile(proj.readme, `${proj.projectName.replace(/\s+/g, '-')}-README.md`)}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition"
                                    >
                                        ⬇️ Download
                                    </button>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap max-h-48">
                                    {proj.readme}
                                </pre>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Generate Another */}
            <button
                onClick={() => {
                    setGeneratedContent(null);
                    setError(null);
                }}
                className="w-full bg-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-300 transition"
            >
                🔄 Generate Another Portfolio
            </button>
        </div>
    );
}