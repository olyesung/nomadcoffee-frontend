import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $category: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
    ) {
      ok
    }
  }
`;

function AddShop() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createCoffeeShop({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Add shop" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("name", {
              required: "Name is required.",
            })}
            name="name"
            type="text"
            placeholder="name"
          />
          <Input
            {...register("latitude")}
            name="latitude"
            type="text"
            placeholder="latitude"
          />
          <Input
            {...register("longitude")}
            name="longitude"
            type="text"
            placeholder="longitude"
          />
          <Input
            {...register("category")}
            name="category"
            type="text"
            placeholder="caption"
          />
          <Button type="submit" value={loading ? "Loading..." : "Add"} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default AddShop;
