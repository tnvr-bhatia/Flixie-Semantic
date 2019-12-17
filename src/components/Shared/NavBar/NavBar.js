import React from "react";
import { Menu } from "semantic-ui-react";

const NavBar = () => {
	return (
		<Menu borderless secondary stackable widths="5">
			<Menu.Item key="1" active>
				Home
			</Menu.Item>
			<Menu.Item key="2">Discover</Menu.Item>
			<Menu.Item key="3">Movies</Menu.Item>
			<Menu.Item key="4">Tv</Menu.Item>
			<Menu.Item key="5">People</Menu.Item>
		</Menu>
		// <Header className="header" style={{ height: "auto", padding: "0 16px" }}>
		// 	<Row type="flex">
		// 		<Col xs={24} sm={24} md={18} lg={20} xl={20}>
		// 			<Col xs={24} sm={24} md={6} lg={6} xl={6}>
		// 				<Logo></Logo>
		// 			</Col>
		// 			<Col
		// 				xs={24}
		// 				sm={24}
		// 				md={0}
		// 				lg={0}
		// 				xl={0}
		// 				style={{
		// 					position: "fixed",
		// 					bottom: 0,
		// 					left: 0,
		// 					zIndex: 4,
		// 					width: "100%"
		// 				}}
		// 			>
		// 				<Menu
		// 					theme="dark"
		// 					mode="horizontal"
		// 					selectedKeys={"1"}
		// 					style={{
		// 						lineHeight: "64px",
		// 						display: "flex",
		// 						justifyContent: "space-between"
		// 					}}
		// 				>
		// 					<Menu.Item key="1">Home</Menu.Item>
		// 					<Menu.Item key="2" disabled>
		// 						Discover
		// 					</Menu.Item>
		// 					<Menu.Item key="3" disabled>
		// 						Movies
		// 					</Menu.Item>
		// 					<Menu.Item key="4" disabled>
		// 						Tv
		// 					</Menu.Item>
		// 					<Menu.Item key="5" disabled>
		// 						People
		// 					</Menu.Item>
		// 				</Menu>
		// 			</Col>
		// 			<Col xs={0} sm={0} md={18} lg={18} xl={18}>
		// 				<Menu
		// 					theme="dark"
		// 					mode="horizontal"
		// 					selectedKeys={"1"}
		// 					style={{ lineHeight: "64px" }}
		// 				>
		// 					<Menu.Item key="1">Home</Menu.Item>
		// 					<Menu.Item key="2" disabled>
		// 						Discover
		// 					</Menu.Item>
		// 					<Menu.Item key="3" disabled>
		// 						Movies
		// 					</Menu.Item>
		// 					<Menu.Item key="4" disabled>
		// 						Tv
		// 					</Menu.Item>
		// 					<Menu.Item key="5" disabled>
		// 						People
		// 					</Menu.Item>
		// 				</Menu>
		// 			</Col>
		// 		</Col>
		// 		<Col xs={24} sm={24} md={6} lg={4} xl={4}>
		// 			<CountrySelect
		// 				data={data}
		// 				placeholder={placeholder}
		// 				style={style}
		// 				defaultValue={defaultValue}
		// 				onChange={onChange}
		// 			></CountrySelect>
		// 		</Col>
		// 	</Row>
		// </Header>
	);
};

export default NavBar;
