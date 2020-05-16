import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";
// state = {
//   loading: true,
// };
// unsubscribeFromSnapshot = null;

// componentDidMount() {

//   const { updateCollections } = this.props;
//   const collectionRef = firestore.collection("collections");

//   collectionRef.onSnapshot((snapshot) => {
//     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//     updateCollections(collectionsMap);
//     this.setState({ loading: false });
//   });
//   collectionRef.get().then((snapshot) => {
//     console.log(snapshot)
//     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//     updateCollections(collectionsMap);
//     this.setState({ loading: false });
//   });
//   fetch('https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents/collections')
//     .then(response => response.json())
//     .then(collectios => console.log(collectios))
// }

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
