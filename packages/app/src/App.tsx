import React from "react";
import { Router } from "@reach/router";
import { Provider } from "react-redux";

import store from "./store";
import { Layout, VideoGallery, Hero, Tags, SeriesGallery, ChannelGallery } from "./components";

const backgroundImg =
	"https://s3-alpha-sig.figma.com/img/351c/9556/7bd65e79c56d66e273279ce04f8574aa?Expires=1593388800&Signature=PAvJw8izjlFlZRMv9V9zMNkyZPimYsj4PzJGXk0Q6mDPlV6Z87PLAT9xyImbi~p263Mu7bMcT8jdqjayXQq3iEgn1JxdYVCrHSyXgCrfmwxmWMZktEY-4kyO9M1RSWBlF9fsd19a45m0L9NtesyDU0IYz51tfYwE2OUE21TJmi4vdjiilPg6kRhPA3Z2N-Vj9ir9of7PtidoQwF-8b9fPejs7nDAHs3AX6YpIYTA36v2TGtS1emtxOCrO6JaRkr61yEdERo1RAVIeK36TeWXcCNE~mIIVoy~A9Abics4O2yQc0oxspu0Ac987NC-kGAHQS8FNeiAxWy7Ux49oNEMfQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

export default function App() {
	return (
		<main className="main-section">
			<Provider store={store}>
				<Layout>
					<Hero backgroundImg={backgroundImg} />
					<VideoGallery title="Continue Watching" log />
					<VideoGallery title="Top Trending Videos" />
					<SeriesGallery title="Top Trending Series" />
					<VideoGallery title="Featured Videos" />
					<Tags title="Top Categories" />
					<ChannelGallery title="Trending Channels" />
					<VideoGallery title="Top Trending Playlist" />
					<VideoGallery title="Newest Videos" />
				</Layout>
			</Provider>
		</main>
	);
}
