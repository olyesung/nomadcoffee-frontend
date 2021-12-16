import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const Edit_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $category: String
  ) {
    editCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
    ) {
      ok
    }
  }
`;

function Edit() {
  const history = useHistory();
  const editCoffeeShopUpdate = (data) => {
    const {
      editCoffeeShop: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [editShopMutation, { loading }] = useMutation(Edit_SHOP_MUTATION, {
    update: editCoffeeShopUpdate,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    editShopMutation({
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
          <Button type="submit" value={loading ? "Loading..." : "Edit"} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default Edit;
