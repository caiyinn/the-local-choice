import { Grid, IconButton, Divider, CircularProgress } from "@mui/material";
import { CartContext } from "../CardContext";
import { useContext } from "react";
import store from "../store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Slices/cartSlice";
import { TableRow, TableCell } from "@mui/material";

const CartProduct = (props) => {
    const { name, _id, quantity, price, image } = props;
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <TableRow>
            <TableCell>
                <IconButton>
                    <DeleteOutlinedIcon
                        onClick={() => removeFromCartHandler(_id)}
                    />
                </IconButton>
            </TableCell>
            <TableCell>
                <img
                    src={image}
                    alt={name}
                    style={{ width: "100px" }}
                />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              {price ? `$${price.toFixed(2)}` : "$0.00"}
            </TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>
              {(quantity && price) ? `$${(quantity * price).toFixed(2)}` : "$0.00"}
            </TableCell>
        </TableRow>
    );
}
export default CartProduct;
