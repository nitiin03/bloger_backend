import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "./categorySlice";

// const options = [
//   { value: "Chocklet", label: "Chocklete" },
//   { value: "Vanila", label: "CVanila" },
//   { value: "stroberry", label: "stroberryte" },
// ];
function CategoryDropDown(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  //Select categories
  const category = useSelector((state) => state?.category);
  const { categoryList, loading, appErr, serverErr } = category;
  const allCategory = categoryList?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });
  const handleChange = (value) => {
    props.onChange("category", value);
  };
  //handle blear
  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className="text-base text-gray-400">Loading...</h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id="category"
          options={allCategory}
          value={props?.value?.label}
        />
      )}
      {/* {Display error} */}
      {props?.error && (
        <div style={{ color: "red", marginTop: "0.5 rem" }}>{props?.error}</div>
      )}
    </div>
  );
}

export default CategoryDropDown;
