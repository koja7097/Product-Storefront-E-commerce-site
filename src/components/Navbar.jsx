import { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer, Box, List, ListItem, ListItemText, Button, Divider
 } from "@mui/material";
 import { Link } from "react-router-dom";
 import { ShoppingCart } from "@mui/icons-material";
 import {CartContext} from "../context/CartContext";

 function Navbar() {
    const {cartItems, removeFromCart, getCartTotal} = useContext(CartContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };


    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6"
                component={Link} to="/"
                sx={{flexGrow: 1, textDecoration: "none", color: "white"}}
                >Food Store</Typography>

                {/* Navigation Link */}

                 <Button color="inherit" component={Link} to="/">Home</Button>

                <Button color="inherit" component={Link} to="/products">Products</Button>

                <IconButton color="inherit" onClick={toggleDrawer(true)}>
                    <Badge badgeContent={cartItems.length} color="secondary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{width: 350, p: 2}}>
            <Typography variant="h6">Your Cart</Typography>
            <Divider sx={{mt: 1}}/>

            {cartItems.length === 0 && <Typography>Your Cart Is Empty.</Typography>}

            <List>
                {cartItems.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <Button color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
                    }>
                        <img src={item.image} alt={item.title} width={50} height={50} />
                        <ListItemText
                        primary={`${item.name} X ${item.quantity}`}
                        secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                        primaryTypographyProps={{
                            fontSize: "0.9rem",
                            noWrap: true,
                              sx: {maxWidth: "180px"}
                        }}
                      secondaryTypographyProps={{
                        fontSize: "0.8rem",
                        color: "textSecondary"
                      }}
                        />
                    </ListItem>
                ))}
            </List>
            {cartItems.length > 0 && (
                <>
                <Divider sx={{my: 1}}/>
                <Typography variant="h6">Total: ${getCartTotal().toFixed(2)}</Typography>
                <Button component={Link} to="/checkout" variant="contained" sx={{mt: 2}}
                onClick={toggleDrawer(false)}>Checkout</Button>
                </>
            )}
        </Box>
      </Drawer>



        </>
    )
 }

 export default Navbar