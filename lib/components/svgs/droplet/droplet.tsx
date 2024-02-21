import * as React from 'react';

type DropletSvgProps = {
  fill?: string;
} & React.SVGProps<SVGSVGElement>;

const DropletSvg = ({ fill = '#176b87', ...props }: DropletSvgProps) => (
  <div className="h-max rotate-30">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={25}
      preserveAspectRatio="none"
      viewBox="591.843 409.469 58.678 69.93"
      {...props}>
      <style>
        {
          '.aa4qw3agIkjcolor{fill:#fff;fill-opacity:1}.aD6z1nYkhcolor{fill:#176b87;fill-opacity:1}.icon3-str{stroke:#797468;stroke-opacity:1}'
        }
      </style>
      <svg
        width={44.968}
        height={64.274}
        x={600}
        y={410}
        preserveAspectRatio="none"
        transform="rotate(29.7 619.599 401.761)"
        rotate="29.7"
        viewBox="39.5 10 121 180"
        {...props}>
        <defs>
          <path
            id="id-KB1-yO5E8"
            d="M157.307 112.881C145.592 85.859 99.863 10 99.863 10S54.415 85.891 42.716 112.881c-2.644 6.099-3.216 12.062-3.216 16.724C39.5 162.954 66.587 190 100.001 190s60.499-27.091 60.499-60.437c0-4.646-.549-10.587-3.193-16.682z"
          />
        </defs>
        <path
          d="M157.307 112.881C145.592 85.859 99.863 10 99.863 10S54.415 85.891 42.716 112.881c-2.644 6.099-3.216 12.062-3.216 16.724C39.5 162.954 66.587 190 100.001 190s60.499-27.091 60.499-60.437c0-4.646-.549-10.587-3.193-16.682z"
          style={{
            strokeWidth: 0,
            stroke: '#d24848',
            strokeOpacity: 1,
            fill: `${fill}`,
            fillOpacity: 1
          }}
        />
      </svg>
    </svg>
  </div>
);
export default DropletSvg;
