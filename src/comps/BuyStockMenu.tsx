import '../style/BuyStockMenu.css'


const BuyStockMenu = () => {
    const show_menu = false;

    if (show_menu){
    return (
        <div className="BSMBackground">
            <div className="BSMMenu">
                <div className="BSMMenuTopBar">
                    <img
                        src="/grandma.png"
                        className="BSMMenuImg"
                    />

                    <p>Buy/Sell Stocks</p>
                </div>
            </div>
        </div>
    )}
    else {return null;}
};

export default BuyStockMenu;
