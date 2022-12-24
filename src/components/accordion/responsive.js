export function responsive(borderSelectionList) {
	return {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1536 },
			items: Math.ceil(borderSelectionList.length / 2),
			slidesToSlide: Math.ceil(borderSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		desktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 1536, min: 900 },
			items: Math.ceil(borderSelectionList.length / 2),
			slidesToSlide: Math.ceil(borderSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: Math.ceil(borderSelectionList.length / 3),
			slidesToSlide: Math.ceil(borderSelectionList.length / 3) // optional, default to 1.
			// partialVisibilityGutter: 50
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: Math.ceil(borderSelectionList.length /2.5),
			slidesToSlide: Math.ceil(borderSelectionList.length /2.5) // optional, default to 1.
			// partialVisibilityGutter: 80
		}
	};
}
