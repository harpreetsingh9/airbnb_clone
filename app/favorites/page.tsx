import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const FavoritesPage = async () => {
  const listings = await getFavoriteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return <FavoriteClient currentUser={currentUser} listings={listings} />;
};

export default FavoritesPage;
