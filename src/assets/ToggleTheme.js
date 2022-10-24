import React, { useState } from 'react';

export const ToggleTheme = ({setToggleDark,size={w:null, h:null}}) => {
  
  const [themeDark, setThemeDark]= useState(false)
  const handletheme=()=>{
    setThemeDark(prevState => !prevState)
    setToggleDark(prevState => !prevState)
  }
  const LightIcon =()=> (
    <svg className='icon-light' width={size.w||"28"} height={size.h||"28"} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1_20)">
    <ellipse cx="19.6364" cy="20" rx="8.36364" ry="8.38095" fill="#FFCD6C"/>
    </g>
    <g filter="url(#filter1_bdf_1_20)">
    <line y1="-0.5" x2="5.26646" y2="-0.5" transform="matrix(0.690476 0.723356 -0.690476 0.723356 8.36364 7.80952)" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter2_bdf_1_20)">
    <line y1="-0.5" x2="5.26646" y2="-0.5" transform="matrix(0.690476 0.723356 -0.690476 0.723356 28 26.8571)" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter3_bdf_1_20)">
    <line x1="4" y1="19.5" x2="8.36364" y2="19.5" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter4_bdf_1_20)">
    <line x1="31.6364" y1="19.5" x2="36" y2="19.5" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter5_bdf_1_20)">
    <line x1="20.5" y1="4" x2="20.5" y2="9.33333" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter6_bdf_1_20)">
    <line x1="20.5" y1="30.6667" x2="20.5" y2="36" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter7_bdf_1_20)">
    <line y1="-0.5" x2="5.26646" y2="-0.5" transform="matrix(-0.690476 0.723356 -0.690476 -0.723356 31.6364 7.80952)" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter8_bdf_1_20)">
    <line y1="-0.5" x2="5.26646" y2="-0.5" transform="matrix(-0.690476 0.723356 -0.690476 -0.723356 31.6364 7.80952)" stroke="#E6B91A"/>
    </g>
    <g filter="url(#filter9_bdf_1_20)">
    <line y1="-0.5" x2="5.26646" y2="-0.5" transform="matrix(-0.690476 0.723356 -0.690476 -0.723356 11.2727 26.8571)" stroke="#E6B91A"/>
    </g>
    <defs>
    <filter id="filter0_d_1_20" x="2.27273" y="2.61905" width="34.7273" height="34.7619" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1_20"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="4"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.600183 0 0 0 0 0.130833 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20" result="shape"/>
    </filter>
    <filter id="filter1_bdf_1_20" x="-21.6364" y="-22.9138" width="64.3268" height="64.5329" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter2_bdf_1_20" x="-2" y="-3.86621" width="64.3268" height="64.5329" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter3_bdf_1_20" x="-26" y="-11" width="64.3636" height="61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter4_bdf_1_20" x="1.63637" y="-11" width="64.3636" height="61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter5_bdf_1_20" x="-10" y="-26" width="61" height="65.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter6_bdf_1_20" x="-10" y="0.666664" width="61" height="65.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter7_bdf_1_20" x="-1.99999" y="-22.1905" width="64.3268" height="64.5329" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter8_bdf_1_20" x="-1.99999" y="-22.1905" width="64.3268" height="64.5329" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    <filter id="filter9_bdf_1_20" x="-22.3636" y="-3.14285" width="64.3268" height="64.5329" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImage" stdDeviation="15"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_20"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.873867 0 0 0 0 0.426667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="effect1_backgroundBlur_1_20" result="effect2_dropShadow_1_20"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_20" result="shape"/>
    <feGaussianBlur stdDeviation="0.5" result="effect3_foregroundBlur_1_20"/>
    </filter>
    </defs>
    </svg>



  )
  const DarkIcon =()=> (
   <svg className='icon-dark' width={size.w||"28"} height={size.h||"28"} viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.06967 24.8575C4.65861 26.1326 8.42389 26.8381 10.447 27.3797C12.4701 27.9213 14.5871 28.0465 16.6388 27.746C18.6905 27.4456 20.6235 26.7272 22.2925 25.6449C23.9615 24.5626 25.3231 23.1446 26.2749 21.4975C27.2267 19.8504 27.7438 18.017 27.7876 16.1352C27.8313 14.2534 27.4004 12.3722 26.5273 10.633C25.6542 8.89374 24.3616 7.34177 22.7468 6.09376C21.1319 4.84574 12.6019 -0.498759 15.71 1.94299C19.7109 7.94891 20.9857 10.633 19.7134 16.3069C18.4411 21.9809 10.983 24.1723 3.06967 24.8575Z" fill="#FCFF70"/>
<path d="M9.23051 4.54546C9.68769 6.04222 10.3871 6.46122 11.917 6.94068C10.4769 7.05534 9.99725 7.46607 9.98588 9.09091C9.59304 7.42931 9.02628 6.88133 7.29936 6.69568C8.83716 6.36096 9.20076 5.85195 9.23051 4.54546Z" fill="#FCFF70"/>
<path d="M1.93115 6.36363C2.38833 7.8604 3.08776 8.27939 4.61767 8.75886C3.17757 8.87352 2.69789 9.28425 2.68651 10.9091C2.29368 9.24748 1.72691 8.6995 -1.38631e-07 8.51386C1.5378 8.17913 1.9014 7.67012 1.93115 6.36363Z" fill="#FCFF70"/>
<path d="M4.66841 11.8182C5.12559 13.3149 5.82502 13.7339 7.35492 14.2134C5.91483 14.3281 5.43515 14.7388 5.42377 16.3636C5.03094 14.702 4.46417 14.154 2.73726 13.9684C4.27506 13.6337 4.63866 13.1247 4.66841 11.8182Z" fill="#FCFF70"/>
</svg>


  )
  

  return(
    <p 
    className="toggleTheme__wrapper" 
    onClick={()=>handletheme()}
    style={{ margin: '0px 0px 0px 2px' }}
    >
      {
        themeDark ?
        <DarkIcon/>
        : <LightIcon/>
      }
      
    </p>
  )
};
