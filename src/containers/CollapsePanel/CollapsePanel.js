import React, { useContext } from "react";
import { Icon } from "antd";
import {CaretRightOutline} from '../../icons'
import { Collapse, Panel } from "./CollapsePanel.styled";

const CollapsePanel = props => {
	const { accordion, defaultActiveKey, headers } = props;

	return (
		<>
			<Collapse
				accordion={accordion}
				bordered={false}
				expandIconPosition="right"
				defaultActiveKey={defaultActiveKey}
				expandIcon={({ isActive }) => (
					<Icon type={CaretRightOutline} rotate={isActive ? 90 : 0} />
				)}
			>
				{headers.map((header, index) => (
					<Panel header={header} key={index}>
						{props.render}
					</Panel>
				))}
			</Collapse>
		</>
	);
};

export default CollapsePanel;
