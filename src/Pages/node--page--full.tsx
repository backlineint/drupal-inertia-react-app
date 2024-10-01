import { PropsFromContext } from "../types";

export default function Page({ props, slots }: PropsFromContext) {
  console.log("Page template", props, slots);
  // const { field_image, body, field_tags } = slots;

  return (
    <>
      <h4>(Loaded via inertia)</h4>
      {/* Iterate over slots object */}
      {Object.keys(slots).map((key) => (
        <div key={key}>{slots[key]}</div>
      ))}
      {/* Access slots directly */}
      {/* {field_image}
      {body}
      {field_tags} */}
    </>
  );
}
