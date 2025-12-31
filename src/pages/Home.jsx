import { Link } from "react-router-dom";
import './styles/Home.css'

const Home = () => {
    const categories = [
        { name: 'Musique', img: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000' },
        { name: 'Art', img: 'https://images.unsplash.com/photo-1544967082-d9d3fbc1c13d?q=80&w=1000' },
        { name: 'Spectacle', img: 'https://images.unsplash.com/photo-1507676184212-d03ab07a11d0?q=80&w=1000' },
        { name: 'Football', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000' },
        { name: 'Conférence', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000' }
    ];

    return (
        <div className="fade-in home-container">
            <Link to= "/admin" className="admin-shortcut" title="Admin Access">
                ⚙️
            </Link>

            {/* hero section */}
            <section className="hero-section">
                <h1 className="hero-title">
                    Découvrez Des <span>Expériences Inoubliables</span>

                </h1>
                <p className="hero-text">
                    EventSphere est votre portail vers les meilleurs événements de musique, d'art, de sport et bien plus encore.
                    Réservez vos places dès maintenant.
                </p>
                <Link to= '/events' className="btn-hero-btn">Voir les Evénements</Link>
            </section>

            <section>
                <h2 className="section-title">Parcourir Par catégorie</h2>
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <Link to={`/events?category= ${cat.name}`} key={cat.name} className="category-card">
                            <div style={{backgroundImage: `url(${cat.img})`}} className="category-bg"></div>
                            <h3 className="category-name">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home