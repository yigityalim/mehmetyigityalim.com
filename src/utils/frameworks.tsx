import { VercelProject } from 'lib/types/vercel'
import React from 'react'

// veriler şuradan çekilmiştir: https://api-frameworks.vercel.sh/framework-logos
export default [
    {
        framework: 'nextjs',
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 48 48' fill='none'>
                <mask
                    id='mask'
                    style={{
                        maskType: 'alpha',
                    }}
                    maskUnits='userSpaceOnUse'
                    x='0'
                    y='0'
                    width='48'
                    height='48'
                >
                    <circle cx='24' cy='24' r='24' fill='#000' />
                </mask>
                <g mask='url(#mask)'>
                    <circle cx='24' cy='24' r='23.2' fill='#000' stroke='#000' strokeWidth='1.6' />
                    <path
                        d='M39.8687 42.0055L18.4378 14.4H14.3999V33.592H17.6302V18.5023L37.333 43.9587C38.222 43.3637 39.069 42.7108 39.8687 42.0055Z'
                        fill='url(#gradient0)'
                    />
                    <rect x='30.6667' y='14.4' width='3.2' height='19.2' fill='url(#gradient1)' />
                </g>
                <defs>
                    <linearGradient
                        id='gradient0'
                        x1='29.0666'
                        y1='31.0667'
                        x2='38.5332'
                        y2='42.8'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#fff' />
                        <stop offset='1' stopColor='#fff' stopOpacity='0' />
                    </linearGradient>
                    <linearGradient
                        id='gradient1'
                        x1='32.2667'
                        y1='14.4'
                        x2='32.2132'
                        y2='28.5001'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#fff' />
                        <stop offset='1' stopColor='#fff' stopOpacity='0' />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        framework: 'remix',
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800' fill='none'>
                <path
                    d='M700 0H100C44.772 0 0 44.772 0 100v600c0 55.228 44.772 100 100 100h600c55.228 0 100-44.772 100-100V100C800 44.772 755.228 0 700 0Z'
                    fill='#212121'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M587.947 527.768c4.254 54.65 4.254 80.268 4.254 108.232H465.756c0-6.091.109-11.663.219-17.313.342-17.564.699-35.88-2.147-72.868-3.761-54.152-27.08-66.185-69.957-66.185H195v-98.525h204.889c54.16 0 81.241-16.476 81.241-60.098 0-38.357-27.081-61.601-81.241-61.601H195V163h227.456C545.069 163 606 220.912 606 313.42c0 69.193-42.877 114.319-100.799 121.84 48.895 9.777 77.48 37.605 82.746 92.508Z'
                    fill='#fff'
                />
                <path d='M195 636v-73.447h133.697c22.332 0 27.181 16.563 27.181 26.441V636H195Z' fill='#fff' />
                <path
                    d='M194.5 636v.5h161.878v-47.506c0-5.006-1.226-11.734-5.315-17.224-4.108-5.515-11.059-9.717-22.366-9.717H194.5V636Z'
                    stroke='#fff'
                    strokeOpacity='.8'
                />
            </svg>
        ),
    },
    {
        framework: 'astro',
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='1280' height='1280' viewBox='0 0 1280 1280' fill='none'>
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M815.039 94.6439C824.758 106.709 829.714 122.99 839.626 155.553L1056.17 866.901C976.107 825.368 889.072 795.413 797.281 779.252L656.29 302.798C653.983 295.002 646.822 289.654 638.693 289.654C630.542 289.654 623.368 295.03 621.08 302.853L481.795 779.011C389.579 795.1 302.146 825.109 221.741 866.793L439.347 155.388L439.348 155.388C449.291 122.882 454.262 106.629 463.982 94.5853C472.562 83.9531 483.723 75.6958 496.4 70.6002C510.76 64.8284 527.756 64.8284 561.749 64.8284H717.174C751.212 64.8284 768.23 64.8284 782.603 70.6123C795.292 75.7184 806.459 83.9923 815.039 94.6439Z'
                    fill='url(#paint0_linear_709_110)'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M840.951 900.754C805.253 931.279 734.002 952.097 651.929 952.097C551.197 952.097 466.767 920.737 444.363 878.561C436.354 902.732 434.558 930.396 434.558 948.068C434.558 948.068 429.281 1034.84 489.636 1095.2C489.636 1063.86 515.042 1038.46 546.381 1038.46C600.097 1038.46 600.036 1085.32 599.987 1123.34C599.986 1124.48 599.984 1125.61 599.984 1126.73C599.984 1184.44 635.255 1233.91 685.416 1254.77C677.924 1239.36 673.721 1222.05 673.721 1203.77C673.721 1148.73 706.034 1128.23 743.588 1104.41L743.588 1104.41C773.469 1085.46 806.668 1064.41 829.548 1022.17C841.486 1000.13 848.265 974.893 848.265 948.068C848.265 931.573 845.702 915.676 840.951 900.754Z'
                    fill='#FF5D01'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M840.951 900.754C805.253 931.279 734.002 952.097 651.929 952.097C551.197 952.097 466.767 920.737 444.363 878.561C436.354 902.732 434.558 930.396 434.558 948.068C434.558 948.068 429.281 1034.84 489.636 1095.2C489.636 1063.86 515.042 1038.46 546.381 1038.46C600.097 1038.46 600.036 1085.32 599.987 1123.34C599.986 1124.48 599.984 1125.61 599.984 1126.73C599.984 1184.44 635.255 1233.91 685.416 1254.77C677.924 1239.36 673.721 1222.05 673.721 1203.77C673.721 1148.73 706.034 1128.23 743.588 1104.41L743.588 1104.41C773.469 1085.46 806.668 1064.41 829.548 1022.17C841.486 1000.13 848.265 974.893 848.265 948.068C848.265 931.573 845.702 915.676 840.951 900.754Z'
                    fill='url(#paint1_linear_709_110)'
                />
                <defs>
                    <linearGradient
                        id='paint0_linear_709_110'
                        x1='882.997'
                        y1='27.1132'
                        x2='638.955'
                        y2='866.902'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#000014' />
                        <stop offset='1' stopColor='#150426' />
                    </linearGradient>
                    <linearGradient
                        id='paint1_linear_709_110'
                        x1='1001.68'
                        y1='652.45'
                        x2='790.326'
                        y2='1094.91'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#FF1639' />
                        <stop offset='1' stopColor='#FF1639' stop-opacity='0' />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        framework: 'angular',
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='none'>
                <path d='M24 1L3 8.636l3.203 28.313L24 47l17.797-10.051L45 8.636 24 1z' fill='#DA0B36' />
                <path d='M24 1v5.106-.023V47l17.797-10.051L45 8.636 24 1z' fill='#C10933' />
                <path
                    d='M24.022 6L11 36h4.855l2.618-6.713h11.054L32.145 36H37L24.022 6zm3.804 19.15H20.22l3.803-9.403 3.804 9.402z'
                    fill='#fff'
                />
            </svg>
        ),
    },
    {
        framework: 'create-react-app',
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='none'>
                <g clipPath='url(#clip0)'>
                    <path d='M24 28.631a4.278 4.278 0 1 0 0-8.556 4.278 4.278 0 0 0 0 8.556z' fill='#61DAFB' />
                    <path
                        d='M24 33.118c12.678 0 22.956-3.924 22.956-8.765 0-4.84-10.278-8.765-22.956-8.765-12.679 0-22.957 3.924-22.957 8.765 0 4.841 10.278 8.765 22.957 8.765z'
                        stroke='#61DAFB'
                    />
                    <path
                        d='M16.409 28.736c6.34 10.98 14.877 17.918 19.07 15.498 4.191-2.42 2.451-13.284-3.888-24.264C25.25 8.99 16.714 2.053 12.52 4.473 8.33 6.892 10.07 17.756 16.41 28.736z'
                        stroke='#61DAFB'
                    />
                    <path
                        d='M16.409 19.97c-6.34 10.98-8.08 21.843-3.887 24.264 4.192 2.42 12.73-4.518 19.069-15.498 6.34-10.98 8.08-21.843 3.887-24.264-4.192-2.42-12.73 4.519-19.069 15.498z'
                        stroke='#61DAFB'
                    />
                </g>
                <defs>
                    <clipPath id='clip0'>
                        <path fill='#fff' transform='translate(0 3)' d='M0 0H48V42.706H0z' />
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        framework: 'vite',
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 410 404' fill='none'>
                <path
                    d='M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z'
                    fill='url(#paint0_linear)'
                />
                <path
                    d='M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z'
                    fill='url(#paint1_linear)'
                />
                <defs>
                    <linearGradient
                        id='paint0_linear'
                        x1='6.00017'
                        y1='32.9999'
                        x2='235'
                        y2='344'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#41D1FF' />
                        <stop offset='1' stopColor='#BD34FE' />
                    </linearGradient>
                    <linearGradient
                        id='paint1_linear'
                        x1='194.651'
                        y1='8.81818'
                        x2='236.076'
                        y2='292.989'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#FFEA83' />
                        <stop offset='0.0833333' stopColor='#FFDD35' />
                        <stop offset='1' stopColor='#FFA800' />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
] as Frameworks[]

type Frameworks = {
    framework: VercelProject['projects'][0]['framework']
    icon: React.ReactNode
}
