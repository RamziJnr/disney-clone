import styled from "styled-components";
import React, { useEffect } from 'react';
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore methods
import db from '../firebase'; // Make sure this imports correctly from your firebase.js file
import { setMovies } from "../features/movie/movieSlice";
import { selectUsername } from "../features/user/userSlice";

function Home(props) {
    const dispatch = useDispatch();
    const username = useSelector(selectUsername);
    let recommends = [];
    let newDisney = [];
    let originals = [];
    let trending = [];
  
    useEffect(() => {
      const moviesCollectionRef = collection(db, 'movies');
      onSnapshot(moviesCollectionRef, (snapshot) => {
        if (!snapshot.empty) {
          let recommends = [];
          let newDisney = [];
          let originals = [];
          let trending = [];
    
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            console.log('Fetched movie data:', data); // Log the data from Firestore
    
            // Check if each field is correct
            if (!data.type) {
              console.error('Movie has no type:', doc.id);
              return; // Skip if no type
            }
    
            switch (data.type) {
              case 'recommend':
                recommends.push({ id: doc.id, ...data });
                break;
              case 'new':
                newDisney.push({ id: doc.id, ...data });
                break;
              case 'original':
                originals.push({ id: doc.id, ...data });
                break;
              case 'trending':
                trending.push({ id: doc.id, ...data });
                break;
              default:
                console.error('Unknown type:', data.type);
                break;
            }
          });
    
          // Log the arrays before dispatching
          console.log('Recommends:', recommends);
          console.log('New Disney:', newDisney);
          console.log('Originals:', originals);
          console.log('Trending:', trending);
    
          dispatch(setMovies({ recommends, newDisney, originals, trending }));
        } else {
          console.warn('No movies data found in Firestore.');
        }
      });
    }, [username, dispatch]);
    
    

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends /> 
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100px - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5px + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
