import React, { useEffect, useState, lazy, Suspense } from "react";
import MovieWidget from "./containers/MoviesWidget/MovieWidget";
import { getPopularTv, getPopularMovies, getCountries } from "./Api";
import TouchSlider from "./components/Shared/Slider/TouchSlider";
import NavBar from "./components/Shared/NavBar/NavBar";
import { Grid, Loader, Segment, Card } from "semantic-ui-react";
import TitleCard from "./containers/TitleCard/TitleCard";
import { useClientRect } from "./helper";
//import { Button } from "antd";
import CountrySelect from "./components/CountrySelect/CountrySelect";

// const MovieWidget = lazy(() => import("./containers/MoviesWidget/MovieWidget"));
// const CountrySelect = lazy(() =>
// 	import("./components/CountrySelect/CountrySelect")
// );

// const TouchSlider = lazy(() =>
// 	import("./components/Shared/Slider/TouchSlider")
// );

const App = () => {
	const [parentSize, parentRef] = useClientRect();
	const theme = {
		primaryColor: "#F8A901",
		secondaryColor: "#0D090A",
		textColor: "#fafafa",
		ratingColor: "#DBA442",
		secondaryTextColor: "#252525"
	};

	const [popular, setPopular] = useState({ Movies: [], Tv: [] });
	const [country, setCountry] = useState([]);
	const [defaultCountry, setDefaultCountry] = useState("US");
	const [isFetching, setIsFetching] = useState(true);
	const [placeholderArray, setPlaceHolderArray] = useState([]);

	useEffect(() => {
		const popularMovies = getPopularMovies(defaultCountry);
		const popularTv = getPopularTv();
		const country = getCountries();

		Promise.all([popularMovies, popularTv, country]).then(
			([popularMovieResponse, popularTvResponse, countryResponse]) => {
				setPopular({
					Movies: popularMovieResponse.data.results,
					Tv: popularTvResponse.data.results
				});

				setCountry(countryResponse.data);
				setIsFetching(false);
			}
		);
	}, [defaultCountry]);

	useEffect(() => {
		if (parentSize) {
			setPlaceHolderArray(
				new Array(Math.floor(parentSize.width / 150)).fill(0)
			);
		}
	}, [parentSize]);

	const handleChange = (e, { value }) => {
		setDefaultCountry(value);
	};

	return isFetching ? (
		// <Loader active inline="centered" />
		<div>Loading</div>
	) : (
		<Grid padded>
			<Grid.Row stretched>
				<Grid.Column width={2}>
					<div
						style={{ width: "100%", height: "32px", background: "#4caf5033" }}
					></div>
				</Grid.Column>
				<Grid.Column width={8}>
					<NavBar></NavBar>
				</Grid.Column>
				<Grid.Column width={4} floated="right">
					<Suspense fallback={<Loader active inline="centered" />}>
						<CountrySelect
							data={country}
							placeholder="Select a Country"
							defaultValue={defaultCountry}
							onChange={handleChange}
						></CountrySelect>
					</Suspense>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={3}>
					<Suspense fallback={<Loader active inline="centered" />}>
						<MovieWidget defaultCountry={defaultCountry}></MovieWidget>
					</Suspense>
				</Grid.Column>
				<Grid.Column width={13}>
					<Grid.Row>
						<Grid.Column width={16}>
							<Segment>
								<TouchSlider>
									{popular["Movies"].map((item, index) => (
										<Grid.Column style={{ flex: "0 0 auto", margin: "8px" }}>
											<TitleCard data={item}></TitleCard>
										</Grid.Column>
									))}
								</TouchSlider>
							</Segment>
						</Grid.Column>
						<Grid.Column width={16}>
							<Segment>
								<TouchSlider>
									{popular["Tv"].map((item, index) => (
										<Grid.Column style={{ flex: "0 0 auto", margin: "8px" }}>
											<TitleCard data={item}></TitleCard>
										</Grid.Column>
									))}
								</TouchSlider>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
	// <ThemeProvider theme={theme}>
	// 	<Layout style={{ background: "#ffffff", height: "100%" }}>
	// 		<NavBar
	// 			data={country}
	// 			placeholder="Select a Country"
	// 			style={{ width: "100%" }}
	// 			defaultValue={defaultCountry}
	// 			onChange={handleChange}
	// 		></NavBar>

	// 		<Content style={{ padding: "16px", margin: "16px 0px" }}>
	// 			<Row style={{ height: "100%" }} type="flex" gutter={[16, 16]}>
	// 				<Col xs={0} sm={0} md={8} lg={6} xl={5}>
	// 					<Suspense fallback={<span>Lazily Loading</span>}>
	// 						<MovieWidget defaultCountry={defaultCountry}></MovieWidget>
	// 					</Suspense>
	// 				</Col>
	// 				<Col xs={24} sm={24} md={16} lg={18} xl={19}>
	// 					<Row>
	// 						<Col span={24}>
	// 							<Suspense fallback={<span>Lazily Loading</span>}>
	// 								<Header title="Movies"></Header>
	// 								{isFetching ? (
	// 									<Skeleton></Skeleton>
	// 								) : (
	// 									<TouchSlider data={popular["Movies"]}></TouchSlider>
	// 								)}
	// 							</Suspense>
	// 						</Col>

	// 						<Col span={24}>
	// 							<Suspense fallback={<span>Lazily Loading</span>}>
	// 								<Header title="Tv"></Header>
	// 								{isFetching ? (
	// 									<Skeleton></Skeleton>
	// 								) : (
	// 									<TouchSlider data={popular["Tv"]}></TouchSlider>
	// 								)}
	// 							</Suspense>
	// 						</Col>
	// 					</Row>
	// 				</Col>
	// 			</Row>
	// 		</Content>
	// 	</Layout>
	// </ThemeProvider>
};
export default App;
