import React, { useEffect, useState } from "react";
import config from "../../Config/ImageConfig";
// import { Collapse, Panel } from "../CollapsePanel/CollapsePanel.styled";
// import ListCard from "../ListCard/ListCard";
// import { CustomCard } from "../../components/Shared/CustomCard/CustomCard";
import Image from "../../components/Shared/Image/Image";
import { useClientRect, getItemCount } from "../../helper";
// import { Col, Row, Button, Spin } from "antd";
import { getNowPlayingMovies, getComingSoonMovies } from "../../Api";
import { Accordion, Icon, Grid } from "semantic-ui-react";

const MovieWidget = React.memo(props => {
	const [widgetList, setWidgetList] = useState({
		"Now Playing": [],
		"Coming Soon": []
	});
	const [movie, setMovie] = useState({});
	const [backdropPath, setBackdropPath] = useState("");
	const [isFetching, setIsFetching] = useState(true);
	const [isComplete, setIsComplete] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [parentSize, parentRef] = useClientRect();
	const [childSize, childRef] = useClientRect();
	const isCancelled = React.useRef(false);

	const handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;
		setActiveIndex(newIndex);
	};

	const sortByPopularity = arr => {
		return arr.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
	};

	useEffect(() => {
		isCancelled.current = false;

		const nowPlaying = getNowPlayingMovies(props.defaultCountry);

		const comingSoon = getComingSoonMovies(props.defaultCountry);

		Promise.all([nowPlaying, comingSoon]).then(
			([nowPlayingResponse, comingSoonResponse, popularResponse]) => {
				if (!isCancelled.current) {
					console.log(props.defaultCountry);
					setMovie({
						"Now Playing": sortByPopularity(nowPlayingResponse.data.results),
						"Coming Soon": sortByPopularity(comingSoonResponse.data.results)
					});

					setIsFetching(false);
				}
			}
		);
		console.log("MovieWidget api call useEffect");
		return () => {
			isCancelled.current = true;
		};
	}, [props.defaultCountry]);

	useEffect(() => {
		if (movie["Now Playing"] !== undefined) {
			const backdropPath =
				config.images.base_url +
				config.images.poster_sizes[3] +
				(movie["Now Playing"][0].poster_path ||
					movie["Now Playing"][1].poster_path);

			setBackdropPath(backdropPath);
			setIsComplete(true);
		}
		console.log("MovieWidget backdrop set useEffect");
	}, [movie]);

	useEffect(() => {
		if (parentSize != null && childSize != null) {
			const count = getItemCount(
				parentSize,
				childSize,
				{ height: 55, width: 0 },
				32,
				"height"
			);
			console.log("TCL: count", count);
			const obj = {};

			Object.keys(movie).map(header => {
				Object.assign(obj, { [header]: movie[header].slice(0, count) });
			});

			setWidgetList(obj);
		}
		console.log("MovieWidget parent child set useEffect");
	}, [parentSize, childSize, movie]);

	return isFetching === false && isComplete === true ? (
		<>
			<div ref={parentRef}>
				<div ref={childRef}>
					<Image
						alt="Movie Poster"
						src={backdropPath}
						style={{
							width: "100%",
							height: "200px",
							borderRadius: "1rem",
							objectFit: "cover",
							objectPosition: "0% 0%"
						}}
					/>

					<Accordion>
						{Object.keys(widgetList).map((header, index) => (
							<>
								<Accordion.Title
									active={activeIndex === index}
									index={index}
									onClick={handleClick}
								>
									{header}
									<Icon name="dropdown"></Icon>
								</Accordion.Title>
								<Accordion.Content active={activeIndex === index}>
									{widgetList[header].map((item, index) => item.title)}
								</Accordion.Content>
							</>
						))}
					</Accordion>
				</div>
			</div>
			{/* <CustomCard ref={parentRef}>
				<Row ref={childRef} gutter={[16, 16]}>
					<Col style={{ height: "216px" }}>
						<Image
							alt="Movie Poster"
							src={backdropPath}
							style={{
								width: "100%",
								height: "200px",
								borderRadius: "1rem",
								objectFit: "cover",
								objectPosition: "0% 0%"
							}}
						/>
					</Col>
					<Col>
						<Collapse
							accordion={true}
							defaultActiveKey={["0"]}
							// expandIcon={({ isActive }) =>
							// 	isActive ? <Icon type="minus" /> : <Icon type="plus" />
							// }
							bordered={false}
							expandIconPosition="right"
						>
							{Object.keys(widgetList).map((header, index) => (
								<Panel header={header} key={index} textTransform="uppercase">
									{widgetList[header].map((item, index) => (
										<ListCard
											avatar={
												config.images.base_url +
												config.images.logo_sizes[0] +
												item.poster_path
											}
											title={item.title}
											rating={item.vote_average}
											key={index}
										></ListCard>
									))}
									<Row type="flex" justify="center">
										<Button
											block
											type="link"
											aria-label="More Results"
											style={{
												margin: "4px",
												textTransform: "uppercase",
												fontSize: "inherit",
												color: "white",
												fontWeight: "bold"
											}}
										>
											More results
										</Button>
									</Row>
								</Panel>
							))}
						</Collapse>
					</Col>
				</Row>
			</CustomCard> */}
		</>
	) : (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				height: "100%",
				width: "100%"
			}}
		>
			Loading
		</div>
	);
});

export default MovieWidget;
