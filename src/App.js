import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductGrid from './components/ProductGrid';
import CartTable from './components/CartTable';
import { fetchProducts } from './state/product/actions';
import { fetchCart, addToCart } from './state/cart/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCart();
  }

  addToCart = (product) => {
    this.props.addToCart(product._id, 1);
  }

  render() {
    const {
      isProductsLoading,
      products,
      cart 
    } = this.props;

    if(isProductsLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <h1>Shop application</h1>
        <ProductGrid
          products={products}
          addToCart={this.addToCart}
        />
        <h1>
          <CartTable cart={cart}/>
        </h1>
      </div>
    );
  }
}

const getProductById = (products, productId) => products.find(p => p._id === productId);

const populateCartItems = (cart, products) => ({
...cart,
items: cart.items.map(item => ({
  ...item,
  product: getProductById(products, item.productId)
}))
});
const mapStateToProps = (state) => {
  return {
  isProductsLoading: state.product.isLoading,
  products: state.product.products,
  cart: populateCartItems(state.cart.cart, state.product.products)
  }
};

const mapDispatchToProps = {
  fetchProducts,
  fetchCart,
  addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
