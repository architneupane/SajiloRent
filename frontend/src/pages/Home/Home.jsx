import './Home.css';

function Home() {
  return (
    <div >
      <div className="home-container">
        <header className="hero-section">
          <h1>Welcome to Sajilo Rent!</h1>
          <span id="tagline">Your Trusted Partner in Smart and Convenient Renting.</span>
          <h3>Rent Smart. Save More. Own Less, Live Free!</h3>
          <p>
            Your one-stop shop for all your needs. Explore our collection of products and enjoy great deals!
          </p>
        </header>

        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="featured-products-list">
            <div className="product-card">
              <h3>Equipments</h3>
              <p>Useful machines like driller, vaccum, oven for household and services</p>
              <button>View Details</button>
            </div>
            <div className="product-card">
              <h3>Electronics</h3>
              <p>Latest gadgets and appliances for your daily needs.</p>
              <button>View Details</button>
            </div>
            <div className="product-card">
              <h3>Travel Gear</h3>
              <p>Backpacks, tents, and more for your next adventure.</p>
              <button>View Details</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
