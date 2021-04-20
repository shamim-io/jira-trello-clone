import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MoreIcon from "@material-ui/icons/MoreVert";
import CreateButton from "./CreateButton";
import axios from "../axios";

// import data2 from "./Board/data.json";
import "./Board/board.css";
import Board from "react-trello";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function AppDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const dragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    let newType;
    if (targetLaneId === "PLANNED") {
      newType = "Planned Tasks";
    } else if (targetLaneId === "WIP") {
      newType = "Work in Progress";
    } else if (targetLaneId === "BLOCKED") {
      newType = "Blocked";
    } else if (targetLaneId === "COMPLETED") {
      newType = "Completed";
    }

    try {
      axios.patch("/" + cardId, {
        type: newType,
      });
    } catch (error) {
      console.log("error is >>>>>>", error);
      alert("error is >>>>>>", error);
    }
  };

  const onCardDelete = (cardId, laneId) => {
    try {
      axios.delete("/" + cardId).then(alert("The post has been deleted."));
    } catch (err) {
      console.log("error is >>>>>>", err);
      alert("error is >>>>>>", err);
    }
  };

  const onCardClick = (cardId, metadata, laneId) => {
    console.log(metadata);
    console.log(laneId);
    console.log(cardId);
  };

  useEffect(() => {
    const myFinaldata = () => {
      axios
        .get("/")
        .then((response) => {
          const data = {
            lanes: [
              {
                id: "PLANNED",
                title: "Planned Tasks",
                label: "",
                style: {
                  backgroundColor: "#3179ba",
                  width: 280,
                  boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
                  color: "#fff",
                },
                cards: [],
              },
              {
                id: "WIP",
                title: "Work in Progress",
                label: "",
                style: {
                  backgroundColor: "#fc8c03",
                  width: 280,
                  boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
                  color: "#fff",
                },
                cards: [],
              },
              {
                id: "BLOCKED",
                title: "Blocked",
                label: "",
                style: {
                  backgroundColor: "red",
                  width: 280,
                  boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
                  color: "#fff",
                },
                cards: [],
              },
              {
                id: "COMPLETED",
                title: "Completed",
                label: "",
                style: {
                  backgroundColor: "green",
                  width: 280,
                  boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
                  color: "#fff",
                },
                cards: [],
              },
            ],
          };
          response.data.map((item) => {
            const obj = {
              id: item._id,
              title: item.summary,
              label: item.project,
              description: item.description,
            };
            if (item.type === "Planned Tasks") {
              data.lanes[0].cards.push(obj);
            } else if (item.type === "Work in Progress") {
              data.lanes[1].cards.push(obj);
            } else if (item.type === "Blocked") {
              data.lanes[2].cards.push(obj);
            } else if (item.type === "Completed") {
              data.lanes[3].cards.push(obj);
            }
          });
          setCard(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    // console.log("Card >>>>>>>>>>>>>>>>", card);
    myFinaldata();
  }, []);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Plutomac
          </Typography>
          <CreateButton />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Roadmap", "Backlog", "Board", "Code"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Project pages", "Add item", "Project settings"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="board">
          {card && (
            <Board
              onCardClick={onCardClick}
              handleDragEnd={dragEnd}
              onCardDelete={onCardDelete}
              style={{ backgroundColor: "#e7f1fb" }}
              data={card}
              draggable
            />
          )}
        </div>
      </main>
    </div>
  );
}
