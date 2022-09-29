import React from 'react'

export const SaveIcon = ({onClick, size={w:null, h:null}}) => (
    <p
    style={{ margin: '0px 0px 0px 2px' }}
    onClick={onClick}
    >
      <svg id="#save-svg"  width={size.w||"28"} height={size.h||"28"} viewBox="0 0 256 256">
        <g  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
          <path d="M 89 90 H 1 c -0.552 0 -1 -0.447 -1 -1 V 1 c 0 -0.552 0.448 -1 1 -1 h 67.324 c 0.266 0 0.52 0.105 0.707 0.293 l 20.676 20.675 C 89.895 21.156 90 21.41 90 21.675 V 89 C 90 89.553 89.553 90 89 90 z M 2 88 h 86 V 22.089 L 67.91 2 H 2 V 88 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
          <path d="M 72.465 90 h -54.93 c -0.552 0 -1 -0.447 -1 -1 V 48.226 c 0 -0.553 0.448 -1 1 -1 h 54.93 c 0.553 0 1 0.447 1 1 V 89 C 73.465 89.553 73.018 90 72.465 90 z M 18.535 88 h 52.93 V 49.226 h -52.93 V 88 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
          <path d="M 54.646 20.06 H 17.535 c -0.552 0 -1 -0.448 -1 -1 V 1 c 0 -0.552 0.448 -1 1 -1 h 37.111 c 0.553 0 1 0.448 1 1 v 18.06 C 55.646 19.612 55.199 20.06 54.646 20.06 z M 18.535 18.06 h 35.111 V 2 H 18.535 V 18.06 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
          <path d="M 89 90 H 1 c -0.552 0 -1 -0.447 -1 -1 V 1 c 0 -0.552 0.448 -1 1 -1 h 67.324 c 0.266 0 0.52 0.105 0.707 0.293 l 20.676 20.675 C 89.895 21.156 90 21.41 90 21.675 V 89 C 90 89.553 89.553 90 89 90 z M 2 88 h 86 V 22.089 L 67.91 2 H 2 V 88 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
          <path d="M 63.118 59.612 H 26.882 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 36.236 c 0.553 0 1 0.447 1 1 S 63.671 59.612 63.118 59.612 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
          <path d="M 63.118 69.612 H 26.882 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 36.236 c 0.553 0 1 0.447 1 1 S 63.671 69.612 63.118 69.612 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
          <path d="M 63.118 79.612 H 26.882 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 36.236 c 0.553 0 1 0.447 1 1 S 63.671 79.612 63.118 79.612 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        </g>
      </svg>
    </p>
  )

export default SaveIcon