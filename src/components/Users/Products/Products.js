import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products, pagination, pageHandleChange }) => {
  console.log(pagination);

  const pagePreChange = () => {
    pageHandleChange(pagination?.pre?.page);
  };

  const pageNextChange = () => {
    pageHandleChange(pagination?.next?.page);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
        {products?.map((product) => (
          <>
            {/* new */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
              <div className="relative bg-gray-50">
                {product?.qtyLeft <= 0 && (
                  <span className="absolute top-0 left-0 ml-6 mt-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">
                    Out of stock
                  </span>
                )}
                <Link
                  className="block"
                  to={{
                    pathname: `/products/${product?.id}`,
                    // state: {
                    //   product: product,
                    // },
                  }}
                >
                  <img
                    className="w-full h-64 object-cover"
                    src={product?.images[0]}
                    alt
                  />
                </Link>
                <div className="px-6 pb-6 mt-8">
                  <a className="block px-6 mb-2" href="#">
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      {product?.name}
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span>${product?.price}</span>
                      {/* <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $40.99
                      </span> */}
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="white" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </>
        ))}
        {products?.length % 2 !== 0 && <div></div>}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg  group-hover:opacity-75">
          {pagination?.pre ? (
            <button
              className="ml-auto mr-2 flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md"
              onClick={pagePreChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
            </button>
          ) : (
            <button
              style={{ cursor: "not-allowed" }}
              disabled
              className="ml-auto mr-2 flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg  group-hover:opacity-75">
          {pagination?.next ? (
            <button
              className="mr-auto ml-2 flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md"
              onClick={pageNextChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
            </button>
          ) : (
            <button
              style={{ cursor: "not-allowed" }}
              disabled
              className="mr-auto ml-2 flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
