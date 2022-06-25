import {makeStyles} from '@material-ui/core/styles';
import {alpha} from "@mui/material/styles";

const useStyle = makeStyles((theme) => ({
    navbar: {
        // background: 'linear-gradient(45deg, #1cb5e0 30%, #021b79 90%)',
        backgroundColor: " #000016",
        '& a': {
            color: '#ffffff',
            marginLeft: 10,
        },
        zIndex: 999,
    },
    layoutSearchIcon: {
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.between("lg")]: {
            display: "none",
        },
    },
    layoutBrand: {
        fontWeight: 'bold',
        fontSize: '2rem',
        cursor: 'pointer',
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.between("lg")]: {
            display: "none",
        },
    },
    globalText: {
        fontWeight: '700',
        fontSize: '2rem',
        color: '#111827FF',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem'
        },

    },
    brand: {
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: '2rem',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
        [theme.breakpoints.between("lg")]: {
            display: "block",
        },

    },
    brandR: {
        color: '#faaf00'
    },
    gridMenu: {
        color: '#ffffff',
    },
    mt1: {marginTop: '1rem'},
    cardImage: {
        width: "100%",
        height: "210px",
        padding: "10px",
        objectFit: "cover",
        borderRadius: "5px"
    },
    grow: {
        flexGrow: "2"
    },
    // Cart
    card: {
        marginTop: "2rem"
    },
    cartBtns: {
        width: "10px"
    },
    cardTitleIcon: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
        [theme.breakpoints.between("lg")]: {
            display: "block",
        },
    },
    navbarIcons: {
        paddingLeft: '2em',
        width: '100%',
        position: 'fixed',
        top: '43rem',
        bottom: '0',
        left: 0,
        right: 0,
        backgroundColor: '#4F7CA1',
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.between("lg")]: {
            display: "none",
        },
    },
    // Cart
    cartTableContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    cartPrice: {
        color: ' #696969',
        fontSize: '.8rem',
        fontWeight: 400,
        letterSpacing: 0,
        lineHeight: '1.5em',
    },
    cartDel: {
        cursor: "pointer"
    },
    cartMd: {
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
    },
    cartTableBodyMd: {
        width: '100%'
    },

    section: {
        marginTop: "6rem"
    },
    iconSvg: {
        color: "#F6F9FC",
        [theme.breakpoints.down('md')]: {
            marginLeft: '1.5rem'
        },
    },
    badge: {
        color: "#F6F9FC",
    },
    priceFavoriteIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 0
    },
    cartScreen: {
        marginTop: "7rem"
    },
    cartQuantity: {
        fontSize: "18px",
        margin: 5
    },
    form: {
        width: '100%',
        maxWidth: "500px",
        margin: "0 auto",
        // height: "8"
    },

    navbarBtn: {
        color: "#fff",
        textTransform: "initial",
    },
    step: {
        display: "flex",
        justifyContent: "center",
        margin: "20px 0"
    },
    stepLabel: {
        margin: "1rem 4rem",
    },
    transparentBackground: {
        backgroundColor: 'transparent',
    },
    placeOrder: {
        marginTop: "1rem"
    },
    icon: {
        fontSize: "25px"
    },
    burger: {
        fontSize: "30px",
    },
    searchSection: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
        [theme.breakpoints.between("lg")]: {
            display: "block",
        },

    },
    searchForm: {
        width: "400px",
        border: 'none',
        backgroundColor: alpha(theme.palette.common.white, 0.20),
    },
    searchInput: {
        border: "none",
        background: "none",
        outline: "none",
        width: "360px",
        paddingLeft: "5px",
        padding: "10px",
        color: '#fff',
        '&::placeholder': {
            color: alpha(theme.palette.common.white, .9),
        },
    },
    iconButton: {
        padding: "6px",
        borderRadius: "4px",
        color: '#fff',
    },
    navbarButton: {
        color: '#ffffff',
        textTransform: 'initial',
    },
    textField: {
        height: "60px",
        "&::label": {
            padding: "30px",
            margin: "0"
        }
    },

    reviewForm: {
        maxWidth: 800,
        width: '100%',
    },
    // ContactPage
    contactPagePhone: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1384E2',
        marginRight: 2,
        padding: "5px",
        borderRadius: '50%'
    },
    contactPageWhatsapp: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2FB350',
        fontSize: '10px',
        marginRight: 2,
        padding: "5px",
        marginLeft: 4,
        borderRadius: '50%'
    },
    contactPageInstagram: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C13584',
        fontSize: '10px',
        marginRight: 2,
        padding: "5px",
        marginLeft: 4,
        borderRadius: '50%'
    },
    //About Us
    about: {
        padding: 4,
        position: "relative",
    },
    aboutLine: {
        padding: "30px",
        borderLeft: "1px solid #7582EBFF",
        borderBottom: "1px solid #7582EBFF"
    },
    aboutLineFirstPoint: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 5,
        backgroundColor: '#7582EBFF',
        borderRadius: "50%",
    },
    aboutLineSecondPoint: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 5,
        backgroundColor: '#7582EBFF',
        borderRadius: "50%",
    },
    aboutBrand: {
        margin: 0,
        fontWeight: 700,
        fontSize: '50px',
    },
    //GlobalColor
    globalColor: {
        color: '#203040'
    },
    globalColorYellow: {
        background: '#eeeeee'
    },
    // advertising
    advertisingH1: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: '#203040'
    },

    //ShopTitle
    shopTitle: {
        color: '#203040',
        fontSize: 16,
        fontWeight: 400
    },

    //TypographyH1
    typographyh1: {
        fontSize: '2.2rem',
        color: '#203040'
    },


    // Burger menu Ul
    menu: {
        paddingTop: 8,
        cursor: 'pointer'
    },
    proFileBtns: {
        marginTop: "6rem",
        marginBottom: '2rem'
    },
    profileItems: {
        paddingRight: '2rem',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: 'black',
    },
    profileAvatar: {
        padding: '1rem',
        display: "flex",
        alignItems: "center"
    },
    profileAvatarImg: {
        position: 'relative'
    },
    avatar: {
        width: '5rem',
        height: '5rem'
    },
    // avatarCaemera
    avatarCaemera: {
        position: 'absolute',
        left: '4rem',
        bottom: '1.5rem'
    },
// Menu
    submenu: {
        marginTop: theme.spacing(-14.5),
        marginLeft: "5px"
    },
    title: {
        flexGrow: 5,
    },
    moreArrow: {
        marginRight: theme.spacing(10),
    },
    cascadingSubmenu: {
        marginRight: "10px",
    },
    menuButton: {padding: 0},


//    Hero
    hero: {
        height: "80vh"
    },

//    Advertising
    adversitings: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },

    bg: {
        backgroundColor: 'red'
    },

    profileTypography: {
        fontSize: 14,
        letterSpacing: 1,
        fontWeight: 300
    },
    deleteProfile: {
        margin: "2rem 0",
    },

//    Modal
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        backgroundColor: '#F6F9FC',
        border: 'none',
        boxShadow: 24,
        padding: 10,
        borderRadius: 4
    },
//    FavoriteBorderIcon
    favoriteBorderIconHover: {
        color: '#919EAB',
        cursor: 'pointer',
        transition: ".2s all",
        '&:hover': {
            color: "#DC143C",
        }
    },
//    SubMenu
    subMenu: {
        display: "flex",
        flexDirection: "column"
    },
    //    GlobalFlex
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    flexCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    },
    flexStart: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
    },
    //outlined
    outlined: {
        width: "100%",
        margin: "10px 0",
        height: 2,
        background: "#ccc",
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },

    },
    //Categories
    categoryChildren: {
        padding: 10,
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between"
    },
    cardActionArea: {
        marginTop: 60,
        width: 300,
        height: 300,
    },
// ProductDiscount
    productDiscount: {
        position: "absolute",
        backgroundColor: "#7582EBFF",
        padding: 5,
        color: "#ffffff",
        fontSize: "1em",
        top: 10,
        left: 0,
    },

    // productTitle
    productTitle: {
        fontSize: 15,
        color: "gray"
    },

    //ProductImage
    productImage: {
        width: "100%",
        height: 350,
    },
//    SizeProducts
    sizeProducts: {
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #e8e8e8",
        boxShadow: "inset 0 0 0 1px #fff",
        textAlign: "center",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        cursor: "pointer",
        padding: "6px 14px 8px",
        borderRadius: 4,
        transition: ".2s all",
        marginRight: 5,
        "&:hover": {
            backgroundColor: "#e8e8e8",
        }
    },
//idProductGlobalImg
    idSmalImage: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    idBigImage: {
        [theme.breakpoints.down('md')]: {
            padding: 0
        },
    },
    idSizes: {
        [theme.breakpoints.down('md')]: {
            padding: 0
        },
    },
    idProductGlobalImg: {
        width: "400px",
        height: "540px",
        [theme.breakpoints.down('md')]: {
            width: "380px",
            height: "520px",
        },
    },
    idProdDescriptions: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    idProdDescriptionsMd: {
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
    },

    idProductColorSize: {
        color: "gray",
        fontSize: "1.1rem"
    },
    idProductStore:{
        marginTop: '1.5rem'
    },
    idProductStoreArticle:{
        fontSize: '1rem',
        padding: '5px 0'
    },

    // marginTopGlobal
    marginTopGlobal: {
        marginTop: '5.4rem'
    },

    // CommentDataYear
    dataYear: {
        fontSize: 12,
        color: "gray",
        paddingLeft: 5
    },
    comDesc: {
        paddingLeft: "4rem",
        [theme.breakpoints.down('md')]: {
            padding: 0
        },

    },

    // globalColorStyle

    globalColorStyle: {
        color: "#bdbdbd",
        cursor: "pointer",
        fontSize: 31,
        transition: '.4 all',
        "&:hover": {
            color: 'crimson'
        }
    },

// childComment
    childComment: {
        padding: "0 10px",
        marginLeft: "3rem",
        borderRadius: 5
    },
    //globalStyleImage

    globalStyleImage: {
        width: "100%",
        borderRadius: 5
    },
    // Address Location

    address: {
        border: "1px solid blue",
        padding: '10px',
        borderRadius: 5
    },
    reviewItem: {
        marginTop: '1.5rem',
        marginRight: '4rem',
        borderRight: '1px #808080 solid',
        [theme.breakpoints.down('md')]: {
            marginRight: '2rem',
            marginLeft: "2rem"
        },
    },
    delivery: {
        fontSize: 16,
        fontWeight: 500,
        marginTop: 10,
        border: '1px solid rgba(0,150,136,0.56)',
        color: 'rgba(0,150,136,0.95)',
        padding: "5px 10px",
        borderRadius: 5,
        cursor: 'pointer',
    },
    exclamatory: {
        fontSize: "14px",
        border: '1px solid red',
        textAlign: 'center',
        color: "red",
        padding: '4px 10px',
        borderRadius: "50%"
    },
    payCartTitle: {
        fontSize: '.7rem'
    },


    transparentBackgroud: {
        width: "600px",
        padding: "0",
        backgroundColor: 'transparent',
    },

    stepper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: '1rem 0'
    }
}))

export default useStyle;

