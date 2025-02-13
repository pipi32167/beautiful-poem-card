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

    const getTextSize = (lines: number) => {
        if (lines <= 4) return 28;
        if (lines <= 8) return 24;
        if (lines <= 12) return 20;
        return 18;
    };

    const splitPoem = (poem: string) => {
        // 保留空行，但在渲染时将空行转换为空格
        return poem.split('\n').map((line) => line.trim());
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
        <div
            className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8"
            data-oid="umnh3lq"
        >
            <style data-oid="6.uuddf">{styles}</style>
            <div className="max-w-4xl mx-auto space-y-8" data-oid="_31m7od">
                <h1
                    className="text-4xl font-bold text-center text-purple-800 mb-8"
                    data-oid="3w56ga9"
                >
                    诗歌卡片生成器
                </h1>

                <div className="bg-white rounded-xl shadow-xl p-8 space-y-6" data-oid="5e8mbdz">
                    <div className="space-y-4" data-oid="hzoxz47">
                        <label
                            className="block text-lg font-medium text-gray-700"
                            data-oid="0k2z-gz"
                        >
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
                                data-oid="hjg85jc"
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

                        <label
                            className="block text-lg font-medium text-gray-700"
                            data-oid="h5ftz4d"
                        >
                            诗歌内容
                            <textarea
                                value={poem}
                                onChange={(e) => setPoem(e.target.value)}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                    focus:border-purple-500 focus:ring-purple-500
                                    p-2 border h-32"
                                placeholder="输入诗歌内容..."
                                data-oid="qolncq2"
                            />
                        </label>
                    </div>

                    <div className="flex justify-center" data-oid="af51j6c">
                        <button
                            onClick={exportToPNG}
                            className="px-6 py-3 bg-purple-600 text-white rounded-full
                                hover:bg-purple-700 transition-colors duration-200
                                font-semibold shadow-lg hover:shadow-xl"
                            data-oid="xqn27lj"
                        >
                            导出为PNG
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-8" data-oid="x4z6ccr">
                    <svg
                        ref={svgRef}
                        id="svgElementId"
                        width="450"
                        height="800"
                        className="w-full h-auto max-w-md mx-auto"
                        viewBox="0 0 450 800"
                        style={{ width: '450px', height: '800px' }} // 添加固定尺寸
                        xmlns="http://www.w3.org/1999/xhtml" // 添加命名空间
                        data-oid="gf:swny"
                    >
                        <defs data-oid="fv7o4p-">
                            <clipPath id="roundedRect" data-oid="pb-c7p.">
                                <rect
                                    x="0"
                                    y="0"
                                    width="450"
                                    height="800"
                                    rx="20"
                                    ry="20"
                                    data-oid="s_10rhs"
                                />
                            </clipPath>
                        </defs>

                        <g clipPath="url(#roundedRect)" data-oid="r7djpue">
                            {image && (
                                <image
                                    href={image}
                                    width="450"
                                    height="800"
                                    preserveAspectRatio="xMidYMid slice"
                                    data-oid="5-6j4og"
                                />
                            )}
                            <rect
                                x="0"
                                y="0"
                                width="450"
                                height="800"
                                fill="rgba(0,0,0,0.4)"
                                data-oid="gcxmrhp"
                            />

                            {poem && (
                                <text
                                    x="225"
                                    y="400"
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontFamily="serif"
                                    fontWeight="300"
                                    letterSpacing="0.05em"
                                    data-oid="242ax_a"
                                >
                                    {splitPoem(poem).map((line, index, array) => {
                                        const lineCount = array.length;
                                        const fontSize = getTextSize(lineCount);
                                        const lineHeight = fontSize * 1.8; // 增加行高
                                        const totalHeight = lineCount * lineHeight;
                                        const startY = 400 - totalHeight / 2 + lineHeight / 2;

                                        return (
                                            <tspan
                                                key={index}
                                                x="225"
                                                dy={index === 0 ? startY - 400 : lineHeight}
                                                fontSize={fontSize}
                                                opacity={line.trim() === '' ? 0 : 1} // 空行保持间距但不显示
                                                data-oid="wfskzy."
                                            >
                                                {line.trim() === '' ? ' ' : line}
                                                {/* 空行显示空格以保持间距 */}
                                            </tspan>
                                        );
                                    })}
                                </text>
                            )}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
