function getIconDimensions(iconName) {
	return iconName.match(/(\d+)x(\d+)$/).splice(1);
}

export function vanillaIcon(iconName) {
	const [width, height] = getIconDimensions(iconName);
	return `
		<svg width="${ width }" height="${ height }" viewBox="0 0 ${ width } ${ height }">
			<use xlink:href="/assets/sprite.svg#${ iconName }" />
		</svg>
	`.trim();
}

export function Icon({name, className, style}) {
	const [width, height] = getIconDimensions(name);
	return (
		<svg 
      className={className}
      width={width} 
      height={height} 
      viewBox={`0 0 ${ width } ${ height }`}
      style={style}
    >
			<use xlinkHref={ `/assets/sprite.svg#${ name }` } style={{ fill: 'currentColor' }} />
		</svg>
	);
}
