'use client';
import { useState, useRef } from 'react';
import canvg from 'canvg';
import { toPng } from 'html-to-image';

// Add custom styles to hide scrollbar
const styles = `
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;

export default function Page() {
    const [image, setImage] = useState(null);
    const [poem, setPoem] = useState('');
    const [theme, setTheme] = useState('');
    const svgRef = useRef(null);

    const getTextSize = (text: string) => {
        const lines = text.split('\n').length;
        if (lines <= 4) return 'text-2xl';
        if (lines <= 8) return 'text-xl';
        if (lines <= 12) return 'text-lg';
        return 'text-base';
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // const exportToPNG = async () => {
    //     if (!svgRef.current) return;

    //     const svgData = new XMLSerializer().serializeToString(svgRef.current);
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');

    //     canvas.width = 450;
    //     canvas.height = 800;

    //     // Use Canvg to render SVG to Canvas
    //     const v = await canvg.Canvg.fromString(ctx, svgData);
    //     await v.render();

    //     const a = document.createElement('a');
    //     a.href = canvas.toDataURL('image/png');
    //     a.download = 'poem-card.png';
    //     a.click();
    // };

    const exportToPNG = () => {
        const svgElement = document.getElementById('svgElementId');
        if (svgElement) {
            toPng(svgElement, {
                width: 450, // 指定宽度
                height: 800, // 指定高度
                pixelRatio: 2, // 提高输出质量
                style: {
                    // 确保导出时使用正确的尺寸
                    width: '450px',
                    height: '800px',
                },
                backgroundColor: 'transparent', // 设置背景为透明
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'poem.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((error) => {
                    console.error('导出图片失败:', error);
                });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
            <style>{styles}</style>
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
                    诗歌卡片生成器
                </h1>

                <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700">
                            上传图片
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-2 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-purple-50 file:text-purple-700
                                    hover:file:bg-purple-100"
                            />
                        </label>
                        {/* 
              <label
              className="block text-lg font-medium text-gray-700"
              data-oid="45tdfgl"
              >
              卡片主题
              <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-purple-500 focus:ring-purple-500
              p-2 border"
              placeholder="输入卡片主题..."
              data-oid="_gkvk1:"
              />
              </label> */}

                        <label className="block text-lg font-medium text-gray-700">
                            诗歌内容
                            <textarea
                                value={poem}
                                onChange={(e) => setPoem(e.target.value)}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                    focus:border-purple-500 focus:ring-purple-500
                                    p-2 border h-32"
                                placeholder="输入诗歌内容..."
                            />
                        </label>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={exportToPNG}
                            className="px-6 py-3 bg-purple-600 text-white rounded-full
                                hover:bg-purple-700 transition-colors duration-200
                                font-semibold shadow-lg hover:shadow-xl"
                        >
                            导出为PNG
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-8">
                    <svg
                        ref={svgRef}
                        id="svgElementId"
                        width="450"
                        height="800"
                        className="w-full h-auto max-w-md mx-auto"
                        viewBox="0 0 450 800"
                        style={{ width: '450px', height: '800px' }} // 添加固定尺寸
                        xmlns="http://www.w3.org/1999/xhtml" // 添加命名空间
                    >
                        <defs>
                            <clipPath id="roundedRect">
                                <rect x="0" y="0" width="450" height="800" rx="20" ry="20" />
                            </clipPath>
                        </defs>

                        <g clipPath="url(#roundedRect)">
                            {image && (
                                <image
                                    href={image}
                                    width="450"
                                    height="800"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            )}
                            <rect x="0" y="0" width="450" height="800" fill="rgba(0,0,0,0.4)" />

                            <foreignObject x="40" y="100" width="370" height="600">
                                <div
                                    xmlns="http://www.w3.org/1999/xhtml"
                                    className="h-full flex flex-col justify-center"
                                >
                                    <p
                                        className={`text-white text-center whitespace-pre-line leading-relaxed ${getTextSize(poem)}`}
                                    >
                                        {poem}
                                    </p>
                                </div>
                            </foreignObject>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
