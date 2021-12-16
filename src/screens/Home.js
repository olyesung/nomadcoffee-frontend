import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../routes";

const FEED_QUERY = gql`
  query SeeCoffeeShops {
    seeCoffeeShops {
      id
      name
      caption
      user {
        username
        avatarURL
      }
      photos {
        id
        url
      }
      latitude
      longitude
    }
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const AddBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: -20px;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 280px);
  grid-template-rows: repeat(3, 250px);
  grid-gap: 30px;
`;

const PhotoFile = styled.img`
  width: 280px;
  height: 180px;
  margin-bottom: 10px;
`;
const SubImg = styled.div`
  width: 280px;
  height: 180px;
  background-color: grey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ShopName = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <>
      <AddBox>
        <Link to={routes.add}>
          <button>Add</button>
        </Link>
      </AddBox>
      <Container>
        <Grid>
          {data?.seeCoffeeShops?.map((shopInfo) => (
            <div key={shopInfo.id}>
              <Link to={`/shop/${shopInfo.id}`}>
                {shopInfo.photos.length > 0 ? (
                  shopInfo.photos.map((photo) => (
                    <PhotoFile key={photo.id} src={photo.url} />
                  ))
                ) : (
                  <SubImg>
                    <span>NO image</span>
                  </SubImg>
                )}
                <ShopName>{shopInfo.name}</ShopName>
              </Link>
            </div>
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default Home;
