import "./pokedex.skeleton.css";
import { Layout } from "../pokedex.layout";

interface PokedexSkeletonProps {
  cardCount: number;
}

export const PokedexSkeleton = ({ cardCount }: PokedexSkeletonProps) => {
  return (
    <Layout>
      <div data-testID="pokedex-skeleton" className="pokedex__search-bar">
        <div className="search-bar-skeleton pulse"></div>
      </div>

      <div className="pokemon-list-skeleton">
        {Array.from({ length: cardCount }).map((_, index) => (
          <div key={index} className="pokemon-card-skeleton">
            <div className="pokemon-card-skeleton__image pulse"></div>
            <div className="pokemon-card-skeleton__content">
              <div className="pokemon-card-skeleton__title pulse"></div>
              <div className="pokemon-card-skeleton__subtitle pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
