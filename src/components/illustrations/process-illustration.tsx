import type { SVGProps } from 'react';

const ProcessIllustration = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 160 320" xmlns="http://www.w3.org/2000/svg" {...props}>
        <style>
            {`.font { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 8px; text-anchor: middle; }`}
        </style>
        {/* Astronaut and Rocket */}
        <g id="astronaut-group" transform="translate(35 0)">
            {/* Rocket */}
            <g id="rocket" transform="translate(45 28) rotate(-20)">
                <path d="M 0 13 L -5 16 L -5 10 Z" fill="hsl(var(--primary))"/>
                <path d="M 12 8 L 17 5 L 17 11 Z" fill="hsl(var(--primary))"/>
                <path d="M 0 13 L 12 8 L 8 13 L 12 18 L 0 13" fill="white" stroke="#111" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="8" cy="10.5" r="1.5" stroke="#111" strokeWidth="1" />
                <path d="M -5 10 L -10 10 L -8 13 L -10 16 L -5 16" fill="hsl(var(--destructive))" stroke="#111" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
            </g>
            {/* Astronaut */}
            <g id="astronaut">
                {/* Body */}
                <path d="M 40 45 C 30 50, 30 75, 40 80 L 70 80 C 80 75, 80 50, 70 45 Z" fill="white" stroke="#111" strokeWidth="1" strokeLinejoin="round"/>
                {/* Legs */}
                <path d="M 42 80 L 45 95 L 55 95 L 52 80" fill="white" stroke="#111" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M 68 80 L 65 95 L 75 95 L 72 80" fill="white" stroke="#111" strokeWidth="1" strokeLinejoin="round"/>
                {/* Shoes */}
                <path d="M 43 95 L 42 100 L 58 100 L 57 95" fill="white" stroke="#111" strokeLinejoin="round"/>
                <path d="M 63 95 L 62 100 L 78 100 L 77 95" fill="white" stroke="#111" strokeLinejoin="round"/>
                {/* Helmet */}
                <circle cx="55" cy="40" r="15" fill="white" stroke="#111" strokeWidth="1"/>
                <rect x="50" y="32" width="10" height="12" rx="2" fill="#111" />
                {/* Arms */}
                <path d="M 40 55 C 25 55, 25 70, 40 70" fill="none" stroke="#111" strokeWidth="1"/>
                <path d="M 70 55 C 85 55, 85 70, 70 70" fill="none" stroke="#111" strokeWidth="1"/>
                {/* Details */}
                <rect x="52" y="58" width="16" height="8" rx="2" fill="hsl(var(--primary))" stroke="#111" strokeWidth="1"/>
                <path d="M 40 45 L 42 55" stroke="hsl(var(--primary))" strokeWidth="2" />
                <path d="M 70 45 L 68 55" stroke="hsl(var(--primary))" strokeWidth="2" />
                <path d="M 45 80 L 48 85" stroke="#008080" strokeWidth="2" />
                <path d="M 65 80 L 62 85" stroke="#008080" strokeWidth="2" />
            </g>
        </g>
        {/* Process Steps */}
        <g id="steps" transform="translate(0 100)">
            <g id="step-1">
                <rect x="40" y="0" width="80" height="20" rx="4" fill="white" stroke="#111" strokeWidth="1.5" />
                <text x="80" y="8" className="font">
                    <tspan x="80">Free Consultation</tspan>
                    <tspan x="80" dy="9">&amp; Discovery</tspan>
                </text>
                <g transform="translate(30 10)">
                    <circle r="5" fill="#10B981" />
                    <path d="M -2 0 L 0 2 L 3 -2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
            </g>
            <path d="M 35 15 C 15 25, 15 45, 35 55" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            <g id="step-2" transform="translate(0 40)">
                <rect x="40" y="0" width="80" height="20" rx="4" fill="white" stroke="#111" strokeWidth="1.5" />
                <text x="80" y="8" className="font">
                    <tspan x="80">Strategy &amp;</tspan>
                    <tspan x="80" dy="9">Concept</tspan>
                </text>
                 <g transform="translate(130 10)">
                    <circle r="5" fill="#F59E0B" />
                    <path d="M -2 0 L 0 2 L 3 -2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
            </g>
            <path d="M 125 55 C 145 65, 145 85, 125 95" stroke="#111" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            <g id="step-3" transform="translate(0 80)">
                <rect x="40" y="0" width="80" height="20" rx="4" fill="white" stroke="#111" strokeWidth="1.5" />
                <text x="80" y="8" className="font">
                    <tspan x="80">Development</tspan>
                    <tspan x="80" dy="9">&amp; Testing</tspan>
                </text>
                <g transform="translate(30 10)">
                    <circle r="5" fill="#10B981" />
                    <path d="M -2 0 L 0 2 L 3 -2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
            </g>
             <path d="M 35 95 C 15 105, 15 125, 35 135" stroke="#111" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            <g id="step-4" transform="translate(0 120)">
                <rect x="40" y="0" width="80" height="20" rx="4" fill="white" stroke="#111" strokeWidth="1.5" />
                <text x="80" y="8" className="font">
                    <tspan x="80">Launch &amp;</tspan>
                    <tspan x="80" dy="9">Handover</tspan>
                </text>
                 <g transform="translate(130 10)">
                    <circle r="5" fill="#F59E0B" />
                    <path d="M -2 0 L 0 2 L 3 -2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
            </g>
            <path d="M 125 135 C 145 145, 145 165, 125 175" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            <g id="step-5" transform="translate(0 160)">
                <rect x="40" y="0" width="80" height="20" rx="4" fill="white" stroke="#111" strokeWidth="1.5" />
                <text x="80" y="8" className="font">
                    <tspan x="80">Growth &amp;</tspan>
                    <tspan x="80" dy="9">Optimization</tspan>
                </text>
                 <g transform="translate(30 10)">
                    <circle r="5" fill="#10B981" />
                    <path d="M -2 0 L 0 2 L 3 -2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
            </g>
        </g>
        {/* Diamond */}
        <g id="diamond" transform="translate(0 200)">
            <g transform="translate(80 90)">
                <circle r="15" stroke="#111" strokeWidth="1.5" fill="white"/>
                <path d="M -7 0 L 0 10 L 7 0 L 0 -10 Z" fill="hsl(var(--primary))" stroke="#111" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M -7 0 L -3 3 L 0 -10" stroke="white" strokeWidth="0.5" />
                <path d="M 7 0 L 3 3 L 0 -10" stroke="white" strokeWidth="0.5" />
                <path d="M -3 3 L 0 10 L 3 3" stroke="white" strokeWidth="0.5" />
            </g>
        </g>
    </svg>
);

export default ProcessIllustration;
