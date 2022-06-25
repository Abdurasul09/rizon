import * as React from 'react';
import NextLink from "next/link";
import {GridMenu} from "../../../Utils/svg";
import useStyle from "../../../Utils/styles";
import {Typography} from "@material-ui/core";

export default function Burger({active, setActive}) {
    const classes = useStyle();

    return (
        <div>
            <div className={classes.flex}>
                <div
                    onClick={() => setActive(!active)}
                    className={classes.menu}
                >
                    <GridMenu/>
                </div>
                <NextLink href="/" passHref>
                    <Typography className={classes.brand}>
                        <span className={classes.brandR}>r</span>izon
                    </Typography>
                </NextLink>
            </div>
        </div>
    );
}
