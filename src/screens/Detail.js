import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { FatText } from "../components/shared";
import { useParams } from "react-router-dom";

const SEE_COFFEESHOP_QUERY = gql`
  query SeeCoffeeShop($coffeeShopId: Int!) {
    seeCoffeeShop(id: $coffeeShopId) {
      name
      latitude
      longitude
      caption
      isMine
      photos {
        url
        id
      }
      categories {
        name
      }
    }
  }
`;

const StoreName = styled(FatText)`
  font-size: 28px;
`;

const Img = styled.img`
  height: 200px;
  width: 100%;
  margin-bottom: 20px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: -20px;
  margin-bottom: 20px;
`;
function Detail() {
  const { id } = useParams();
  const coffeeShopId = parseInt(id);
  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: {
      coffeeShopId,
    },
  });

  const getButton = (seeCoffeeShop) => {
    const { isMine } = seeCoffeeShop;
    if (isMine) {
      return (
        <BtnBox>
          <button>Edit</button>
          <button>Delete</button>
        </BtnBox>
      );
    }
  };
  return (
    <div>
      <div> {data?.seeCoffeeShop ? getButton(data.seeCoffeeShop) : null}</div>
      <div>
        {data?.seeCoffeeShop?.photos.map((photo) => (
          <Img key={photo.id} src={photo.url} />
        ))}
      </div>
      <StoreName>{data?.seeCoffeeShop?.name}</StoreName>
    </div>
  );
}
export default Detail;
