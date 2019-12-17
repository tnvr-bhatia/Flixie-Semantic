import React from "react";
import styled from "styled-components";
import TitleCard from "../../../containers/TitleCard/TitleCard";
import { Grid, Segment } from "semantic-ui-react";
//import { Col } from "antd";

const Slider = styled.div`
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const TouchSlider = ({ data, children, isFetching }) => {
	console.log("TCL: TouchSlider -> isFetching", isFetching);

	return (
		<>
			<Slider>{children}</Slider>
		</>
	);
};

export default TouchSlider;
