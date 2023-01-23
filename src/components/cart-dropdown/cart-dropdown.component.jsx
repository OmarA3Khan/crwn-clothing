import './cart-dropdown.styles.scss';

import Button from '../button/button.component.jsx';

export const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container '>
            <div className='cart-items'></div>
            <Button>To Checkout</Button>
        </div>
    );
};

export default CartDropdown;