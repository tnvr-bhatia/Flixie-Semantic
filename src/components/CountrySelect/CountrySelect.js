import React from "react";
import { Dropdown } from "semantic-ui-react";

const CountrySelect = ({ data, defaultValue, onChange }) => {
	const countryOptions = data.map((option, index) => ({
		key: option["iso_3166_1"],
		text: `${option["english_name"]} (${option["iso_3166_1"]})`,
		value: option["iso_3166_1"]
	}));
	return (
		<Dropdown
			placeholder="Select Country"
			fluid
			search
			selection
			options={countryOptions}
			onChange={onChange}
			value={defaultValue}
		/>
	);
};

export default CountrySelect;
