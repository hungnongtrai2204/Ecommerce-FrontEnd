import { useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductAction,
  updateProductAction,
} from "../../../redux/slices/products/productsSlice";
import { fetchBrandsAction } from "../../../redux/slices/categories/brandsSlice";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";
import { fetchColorsAction } from "../../../redux/slices/categories/colorsSlice";

//animated components for react-select
const animatedComponents = makeAnimated();

export default function UpdateProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductAction(id));
    dispatch(fetchBrandsAction());
    dispatch(fetchCategoriesAction());
    dispatch(fetchColorsAction());
  }, [id, dispatch]);
  const {
    product: { product },
    error,
    loading,
    isUpdated,
  } = useSelector((state) => state?.products);

  //form data
  const [formData, setFormData] = useState({
    name: product?.name,
    size: product?.size,
    category: product?.category,
    brand: product?.brand,
    color: product?.color,
    canBeShipped: product?.canBeShipped,
    images: [],
    price: product?.price,
    totalQty: product?.totalQty,
    description: product?.description,
  });
  useEffect(() => {
    console.log(product);
    setFormData({
      name: product?.name,
      size: product?.sizes,
      category: product?.category,
      brand: product?.brand,
      color: product?.colors,
      canBeShipped: product?.canBeShipped,
      images: [],
      price: product?.price,
      totalQty: product?.totalQty,
      description: product?.description,
    });
  }, [product]);

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----fetch brands---
  const {
    brands: { brands },
  } = useSelector((state) => state?.brands);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [sizeOption, setSizeOption] = useState(product?.sizes);
  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };
  const [colorOption, setColorOption] = useState(product?.colors);
  const handleColorChangeOption = (colors) => {
    setColorOption(colors);
  };
  const sizeOptionsCoverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });
  const sizeOptionsCoverted1 = product?.sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  const { categories } = useSelector((state) => state?.categories?.categories);
  const {
    colors: { colors },
  } = useSelector((state) => state?.colors);

  const colorOptionsCoverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  const colorOptionsCoverted1 = product?.colors?.map((color) => {
    return {
      value: color,
      label: color,
    };
  });
  //---onSubmit---
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction({
        ...formData,
        colors: colorOption?.map((color) => color.label),
        sizes: sizeOption?.map((size) => size.label),
        id,
      })
    );
  };
  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {error && <ErrorMsg message={error?.message} />}
          {isUpdated && <SuccessMsg message="Product Updated Successfully" />}
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Update Product
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                <p className="font-medium text-indigo-600 hover:text-indigo-500">
                  Manage Products
                </p>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleOnSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <div className="mt-1">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* size option */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Size
                    </label>
                    {loading ? (
                      <LoadingComponent />
                    ) : (
                      <Select
                        defaultValue={sizeOptionsCoverted1}
                        components={animatedComponents}
                        isMulti
                        name="sizes"
                        options={sizeOptionsCoverted}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        isLoading={false}
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        onChange={(item) => handleSizeChange(item)}
                      />
                    )}
                  </div>
                  {/* Select category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Category
                    </label>
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleOnChange}
                      className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
                      defaultValue="Canada"
                    >
                      {/* <option>-- Select Category --</option>
                  <option value="Clothings">Clothings</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option> */}
                      <option>-- Select Category --</option>
                      {categories?.map((category) => (
                        <option key={category?._id} value={category?.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Select Brand */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Brand
                    </label>
                    <select
                      name="brand"
                      value={formData?.brand}
                      onChange={handleOnChange}
                      className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
                      defaultValue="Canada"
                    >
                      <option>-- Select Brand --</option>
                      {brands?.map((brand) => (
                        <option key={brand?._id} value={brand?.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Color
                    </label>
                    {loading ? (
                      <LoadingComponent />
                    ) : (
                      <Select
                        defaultValue={colorOptionsCoverted1}
                        components={animatedComponents}
                        isMulti
                        name="colors"
                        options={colorOptionsCoverted}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        isLoading={false}
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        onChange={(e) => handleColorChangeOption(e)}
                        value={product?.color}
                      />
                    )}
                  </div>

                  {/* upload images */}

                  {/* price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="mt-1">
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleOnChange}
                        type="number"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Ahipping price */}
                  {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Price
                </label>
                <div className="mt-1">
                  <input
                    name="shippingPrice"
                    value={product?.shippingPrice}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div> */}
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Quantity
                    </label>
                    <div className="mt-1">
                      <input
                        name="totalQty"
                        value={formData.totalQty}
                        onChange={handleOnChange}
                        type="number"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* description */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Add Product Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="description"
                        value={formData?.description}
                        onChange={handleOnChange}
                        className="block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div>
                    {loading ? (
                      <LoadingComponent />
                    ) : (
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Update Product
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
