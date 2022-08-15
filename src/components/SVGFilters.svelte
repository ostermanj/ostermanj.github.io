<svg width="0" height="0">
  <filter id="noise">
    <feTurbulence type="turbulence" baseFrequency="0.01 0.4"
        numOctaves="2" result="NOISE"/>
    <feDisplacementMap in2="NOISE" in="SourceGraphic"
        scale="15" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
