import FormikReactSelect from "../components/FormikReactSelect";
import { Form, Formik } from "formik";

export default function HomePage() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <Formik
        onSubmit={(values) => console.log(values)}
        initialValues={{
          favoriteFruits: ["chocolate"],
        }}
      >
        <Form>
          <FormikReactSelect
            name="favoriteFruits"
            isMulti={true}
            options={options}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}
