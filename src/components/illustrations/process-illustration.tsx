'use client';
import { useState, useEffect } from 'react';

export default function ProcessIllustration({ className }: { className?: string }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const steps = [
        { y: 100, label: "01" },
        { y: 220, label: "02" },
        { y: 340, label: "03" },
        { y: 460, label: "04" },
        { y: 580, label: "05" },
    ];
    
    return (
        <svg
            viewBox="0 0 300 680"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                {`
                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes pop-in {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .draw-line {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                    animation: draw 2s ease-out forwards;
                }
                .pop-in {
                    transform-origin: center;
                    animation: pop-in 0.5s ease-out forwards;
                }
                `}
            </style>
            
            {isMounted && (
                <g>
                    {/* Vertical Connecting Line */}
                    <path
                        d="M 150 100 V 580"
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                        fill="none"
                        className="draw-line"
                        style={{ animationDelay: '0s' }}
                    />
                    
                    {/* Dashed lines radiating outwards */}
                    {steps.map((step, i) => (
                        <g key={i}>
                             <path
                                d={`M 150 ${step.y} h ${i % 2 === 0 ? -60 : 60}`}
                                stroke="hsl(var(--primary) / 0.5)"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                fill="none"
                                className="draw-line"
                                style={{ animationDelay: `${0.5 + i * 0.3}s` }}
                            />
                        </g>
                    ))}

                    {/* Nodes */}
                    {steps.map((step, i) => (
                        <g key={`node-${i}`} className="pop-in" style={{ animationDelay: `${0.2 + i * 0.3}s` }}>
                            <circle
                                cx="150"
                                cy={step.y}
                                r="24"
                                fill="hsl(var(--background))"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                            />
                            <text
                                x="150"
                                y={step.y}
                                dy=".3em"
                                textAnchor="middle"
                                fontSize="18"
                                fontWeight="bold"
                                fill="hsl(var(--primary))"
                            >
                                {step.label}
                            </text>
                        </g>
                    ))}
                </g>
            )}
        </svg>
    );
}
