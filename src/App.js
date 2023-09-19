import './App.css';
import Header from './components/Header/Header';
import Slide from './components/Slide/Slide';
import ProductCard from './components/ProductCard/ProductCard';
import products from './productsData'; // Import the product data

function App() {
  return (
    <>
    <div id='content-container'>
      <Header/>
      <Slide />
      <div className="product-card-container">
        <ProductCard products={products} />
      </div> 
      </div>
    </>
  );
}

export default App;