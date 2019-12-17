import React from "react";
import styled from "styled-components";
import { Label, Icon } from "semantic-ui-react";

const Rating = ({ type, children, attached }) => {
	const TextRating = styled.span`
		color: ${props => props.theme.ratingColor};
		font-weight: bold;
	`;
	return (
		<>
			{type && attached ? (
				<TextRating>{children}</TextRating>
			) : (
				<>
					{/* <Icon
						type="star"
						theme="filled"
						style={{ color: "#ffcc5c", padding: "0 5px" }}
					/> */}
					<Label
						basic
						attached={attached}
						size="tiny"
						style={{ border: 0, padding: 0 }}
					>
						<Icon name="star" style={{ margin: 2 }} />
						{children}
					</Label>
				</>
			)}
		</>
	);
};

export default Rating;
