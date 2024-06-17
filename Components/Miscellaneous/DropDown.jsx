import * as React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DropDown({ array, name }) {
	const nav = useNavigate();
	const createHandleMenuClick = (e) => {
		return () => {
			nav(`/${e.route}`);
		};
	};

	return (
		<Dropdown>
			<MenuButton sx={{ fontSize: "16px" }}>{name}</MenuButton>
			<Menu slots={{ listbox: Listbox }}>
				{array.map((option) => (
					<MenuItem onClick={createHandleMenuClick(option)} key={option.id}>
						<button>{option.label}</button>
					</MenuItem>
				))}
			</Menu>
		</Dropdown>
	);
}

const blue = {
	200: "#99CCF3",
	600: "#0072E6",
};

const grey = {
	50: "#F3F6F9",
	100: "#E5EAF2",
	200: "#DAE2ED",
	300: "#C7D0DD",
	400: "#B0B8C4",
	500: "#9DA8B7",
	600: "#6B7A90",
	700: "#434D5B",
	800: "#303740",
	900: "#1C2025",
};

const Listbox = styled("ul")(
	({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
		theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
	};
  z-index: 1;
  `
);

const MenuItem = styled(BaseMenuItem)(
	({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
	({ theme }) => `
    font-weight:400;
    font-size:1.4rem;
    transition: all 150ms ease;
`
);
