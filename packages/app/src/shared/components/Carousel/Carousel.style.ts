import { StyleFn, makeStyles } from "../../utils"
import { spacing, breakpoints } from "../../theme"

export type CarouselStyleProps = {}

const container: StyleFn = () => ({
	position: "relative",
	display: "flex"
})
const outerItemsContainer: StyleFn = () => ({
	overflow: "hidden"
})

const innerItemsContainer: StyleFn = () => ({
	display: "flex"
})

const navBase: StyleFn = () => ({
	minWidth: spacing.xxxxl,
	minHeight: spacing.xxxxl,
	width: spacing.xxxxl,
	height: spacing.xxxxl,
	position: "absolute"
})

const navLeft: StyleFn = (styles) => ({
	...styles,
	left: 0,
	top: `calc(50% - ${Math.round((parseInt(spacing.xxxxl) + 1) / 2)}px)`
})

const navRight: StyleFn = (styles) => ({
	...styles,
	right: 0,
	top: `calc(50% - ${Math.round((parseInt(spacing.xxxxl) + 1) / 2)}px)`
})

export const useCSS = (props: CarouselStyleProps) => ({
	container: makeStyles([container])(props),
	outerItemsContainer: makeStyles([outerItemsContainer])(props),
	innerItemsContainer: makeStyles([innerItemsContainer])(props),
	navLeft: makeStyles([navBase, navLeft])(props),
	navRight: makeStyles([navBase, navRight])(props)
})
