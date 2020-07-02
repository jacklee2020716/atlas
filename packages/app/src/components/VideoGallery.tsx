import React, { useCallback, useState } from "react";
import { css, SerializedStyles } from "@emotion/core";

import { Gallery, VideoPreview } from "@joystream/components";

type VideoGalleryProps = {
	title: string;
	action: string;
};

const videoPlaceholders = [
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/57d7/47bd/e40e51d45107656c92b3c9d982e76c6e?Expires=1593993600&Signature=Q34ageNdR3Y48K5lG8HW1KOgMGCi94qmWOK5yO~cK6XzgyO2nCJB6Pjoaa~gQX7zMVSHIkxlVt-9CHz~H9iXmA7r0LfTm90sNlTZ8ZspvU9TWgCGdPMj1A-SzTIAmeiDrZ0DrSzILQdJOMwaP-DeYKpFN6zvG6h56XHznX5lEiawRqeObL0g4SAHNG5tiO0Rdjwtckeuz~diwLVBOUqPaeDGOABlpUJQFoy~Dx7FxK65MyPXUZ7CtUVqjKkyl-jfnl0DwIpOiI9K2HJjtV7FlPbc28C4JeniafBr0nUkoWAjzcyyOr37v0xNw2EBy91mBc33kDUlwbqom9f-leRPZQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/bd94/067c/4750be7f93ae65cf6828daa25ae301f0?Expires=1593388800&Signature=ItXPW-xlNDLNziv7Maamv-n6HRo4UNRnfaQGBGUhHQUKZYplg2RtRlf198c-U5rDBU0Oe9UBbC8JUAMZRs1jnKs1I~UTBS0Dpq-qn1wR-q0ZJZRNmUHmiOjQ9j9GekidMJHEq-rh7qZB38ttdI72Db46WOeuA6NxvRYqe8j1CUXKpgNL-nfLcvofSYQWpTZ6n1aA4IpzlzT2ginbOhesp2yJHkgBbkIQm9It~SnTl7EoVzzDErD5KjmltO4nUBWTKYmgEdf0zEaNPQn8fF2vtKUQtz9TkdwyeVjHqhSd9aptH2vdKSZhbm8KO15BIs1ZczuQ05YQJ2RJfU8fbu5NUg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		createdAt: "2 weeks ago",
		views: "345k",
		poster:
			"https://s3-alpha-sig.figma.com/img/8e21/18b4/c0d8f1114b47062b35c47fb568fb48a5?Expires=1593388800&Signature=ZaBi7Wf9-bGZbtyqlbCl-TNCZDiWaaoiO3tMyYJVliHhuCvafyheMpBUPn8XSZQsntvmSW2A1rfLfPw-e-t1tCUw6uBIOWexRRhoNDfHWvXLUy4bcij2-D54Mo7LyL1ASLLzoTTDVCLoESNFEb3X8ntBWNOOVIy-1qLYuBdeP1vdJmcov5I4U46ge0sSPvetv0SS~3wW4CYO7zZ8Wi1CrA8mxQiMsnXCl97Vat5ngT46QZzZwVOtcmXH8KxQcn-e0MWBZFMAB5vzs2SdAX~l~3z7McrULM9-wPavJiw7dH4fUbVH7qQ-oS9dZ0t2sod3dRPGTj73Su3WVL2RlnQUqg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/f712/25ac/62a18f581f6a5aae66ac4e9b7b21fafc?Expires=1593388800&Signature=YO2e7eBwPVF05C4tlUeWVmq5o3KOpo9yyoM1khSbywLj1Kv1BIIFdjD6IBLO9Oifm8A-Ws2IlypjWuykVe9nydcoCp28VzQ~ifYtfr97plLxVcOYiYMu7HDIEpPK4UKZi3AFSvqdIAUrr-YBu2noRt8Kg-BbzMG2DV3zKTAga2zMJ-cYu5-xiW6gctEr8nl6QF7luvBYZkHTYRaMTXpsRdN-b2VoW7BX1mxm1FDWyhZ9aaEqZ8dIE3ct8t6J2ybxryrMVxLpjP-T0124N27Z9Xp4WzSTOSjfBjn~Q7mtqHk141~pq1-dQe1dO2V7JQN3AvTt4eEeCvpXQqbA0VMPnw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/4baa/8670/e77491e871584e97b955d728627020f3?Expires=1593388800&Signature=LkSz8F8wftV81dxfumpYE5CToghiq5a3hvwywrhwVAXFwQvNzfymCImBCY9wIxILX4nnOlaNX0g~~iZ2RXD104VvLn6q967Hlg0uAH1h3eutIZzb4sQ0i4R-wXUw5ZNy2QjLCOIlKuCXMXSO1UiI8t8CJtdel9XaSqm1u~JsPFhRjRlO60RCi2cM2pJ~8G~kofCMT6J3NMgyRruVLUDY9FPGh5dI5XRFmeKbMThO2IT5KfUGsPDLb98i8gBrkLe2EKMx2DxHlDxcA3j2LVtf4yaGG-EmeDrQflknjdoAY0BKfC8Mob10ldGsYnJsMHOraz971POWOVpWTuoF0h6nNg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/4baa/8670/e77491e871584e97b955d728627020f3?Expires=1593388800&Signature=LkSz8F8wftV81dxfumpYE5CToghiq5a3hvwywrhwVAXFwQvNzfymCImBCY9wIxILX4nnOlaNX0g~~iZ2RXD104VvLn6q967Hlg0uAH1h3eutIZzb4sQ0i4R-wXUw5ZNy2QjLCOIlKuCXMXSO1UiI8t8CJtdel9XaSqm1u~JsPFhRjRlO60RCi2cM2pJ~8G~kofCMT6J3NMgyRruVLUDY9FPGh5dI5XRFmeKbMThO2IT5KfUGsPDLb98i8gBrkLe2EKMx2DxHlDxcA3j2LVtf4yaGG-EmeDrQflknjdoAY0BKfC8Mob10ldGsYnJsMHOraz971POWOVpWTuoF0h6nNg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/e0d6/4163/147cd1502ba0a99ea7258f31be9812b3?Expires=1593388800&Signature=av5e4oaaYXVDxA9U0DAQKuwA-vyC4VRaGYz2lO5IIaz-CP55B717sXn-V6H6JzMNZ7JavA9q8~uMK-r9jd-yxoia1UopEiUeSkZgQlbBhd4DEVBPoMhMF3nC--mZ4bQnVvK9xN933TCm9z46jkAOZ7U8UYp5TlA829Rnmgw3QkaNlPLW5UkgU04k6pAae5Y3t9pAnwErmDCDjHuaXKrCjCuG0zwk84f0JQAcZt4VojD8kVDFCf0IOHdZtIQMUk47CQfdWJ2KDBkm1oOcVAweTSHXdwzpiFQ~o1i-hZVYtgzIiGTE6IqW3qsksqiLtWwMsui2dvWXVu2actRRwR~OTg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/63ab/b514/2a10cf17ceaf00972e7c12c18cacd832?Expires=1593388800&Signature=WRk44Vxkc1mYbXSdGroHP8Hvd4dfhtWMukS~2yfNlY6KSb94ZzeFaKID8dMj4wznZo-sSp~lAagV7NJMFO9QLCEw0E7YeX3TnOWeFDrx63wkc388h-srSxxrNVUpB6WUCfkPtdusDrfKOx2HvM6zZLlSgYs4-McX2VTJ-g7bKx2Pzt64mox6wTGlbXWREkV2sbLSBSF6P0fpwge3VPt5jX1E~vDJ8X4mtZgN1DRIQMtc2dfZhZhyL1jNeIZe5WJyOcY9b2E3KL54pWt13UGsI08nTzloqOPFAt~fHwbwUbwWeelbjkzSABh55KYVNePerISUIy~esGJ11px7l9oWTw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
	{
		title: "Sample Video Title",
		channel: "Channel Name",
		showChannel: true,
		views: "345k",
		createdAt: "2 weeks ago",
		poster:
			"https://s3-alpha-sig.figma.com/img/b327/39be/143853e8ca345927ee54a7ca9acaed0c?Expires=1593388800&Signature=G1vikiLUBwdBdrzS3RC1WScSJSAAD7FEteNX4bfPf0VQL0w9fsMfha31S-l6EHxU~WTh3GAic8X5furwHjwLbE2nVUIiA0q6Rizxfd8kT97Z-9uQzPbCkla6a1qIX-7wq19t2evAVST--Sz7wfEYVCUTdZaEmqgBsJnYI3fl7nzrwLhaaTTN3liOTltgvlQn8btRClliTWENyHBwu6cwvMHuX6ePt5swhIj4gz34F0MyY~PtnsFbBHFerShd3t2DYsMqDv8CEB089v6IYZh87Rnqk7jJFZC2ZBULhjlwKQpboJOI35cov3aGOnuTe5vcmULLSfEXuV5kWJrtzJnQlA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
	},
];

const articleStyles = css`
	max-width: 320px;
	margin-right: 1.25rem;
`;

const VideoGallery: React.FC<Partial<VideoGalleryProps>> = ({ title, action }) => {
	const videos = videoPlaceholders.concat(videoPlaceholders).concat(videoPlaceholders);
	const [controlsTop, setControlsTop] = useState<SerializedStyles>(css``);

	const CAROUSEL_WHEEL_HEIGHT = 48;
	const imgRef = useCallback((node: HTMLImageElement) => {
		if (node != null) {
			setControlsTop(css`
				top: calc(${Math.round(node.clientHeight) / 2}px - ${CAROUSEL_WHEEL_HEIGHT / 2}px);
			`);
		}
	}, []);
	return (
		<Gallery title={title} action={action} leftControlCss={controlsTop} rightControlCss={controlsTop}>
			{videos.map((video, idx) => (
				<article css={articleStyles} key={`${title}- ${video.title} - ${idx}`}>
					<VideoPreview
						title={video.title}
						channel={video.channel}
						showChannel={video.showChannel}
						views={video.views}
						createdAt={video.createdAt}
						imgRef={idx === 0 ? imgRef : null}
						poster={video.poster}
						showMeta={true}
					/>
				</article>
			))}
		</Gallery>
	);
};

export default VideoGallery;
