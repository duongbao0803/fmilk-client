import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addProduct,
  editProductInfo,
  getAllProduct,
  getDetailProduct,
  removeProduct,
} from "@/api/productApi";
import { notification } from "antd";
import { CustomError, ProductInfo } from "@/interfaces/interface";

const useProductService = (productName: string, origin: string) => {
  const queryClient = useQueryClient();

  const fetchProducts = async (
    page: number,
    productName: string,
    origin: string,
  ) => {
    try {
      const res = await getAllProduct(page, productName, origin);
      const totalProducts = res.data.totalProducts || 0;
      const products = res.data.products || [];
      return { totalProducts, products };
    } catch (err) {
      console.error("Error fetching products:", err);
      return { totalProducts: 0, products: [] };
    }
  };

  const getInfoProductDetail = async (productId: string) => {
    const res = await getDetailProduct(productId);
    return res.data.productInfo;
  };

  const deleteProduct = async (productId: string) => {
    await removeProduct(productId);
    return productId;
  };

  const addNewProduct = async (formValues: ProductInfo) => {
    await addProduct(formValues);
  };

  const updateProductInfo = async ({
    productId,
    productInfo,
  }: {
    productId: string;
    productInfo: ProductInfo;
  }) => {
    await editProductInfo(productId, productInfo);
  };

  const { data: productData, isLoading: isFetching } = useQuery(
    ["products", productName, origin],
    () => fetchProducts(1, productName, origin),
    {
      retry: 2,
      retryDelay: 5000,
    },
  );

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      notification.success({
        message: "Delete Successful",
        description: "Delete product successful",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Delete Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateProductInfoMutation = useMutation(updateProductInfo, {
    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Update infomation successful",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      console.error("Error update", err);
      notification.error({
        message: "Update Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewProductMutation = useMutation(addNewProduct, {
    onSuccess: () => {
      notification.success({
        message: "Add Successful",
        description: "Add product successful",
        duration: 2,
      });
      queryClient.invalidateQueries("products");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Add Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteProductItem = async (userId: string) => {
    await deleteProductMutation.mutateAsync(userId);
  };

  const updateProductItem = async (
    productId: string,
    productInfo: ProductInfo,
  ) => {
    await updateProductInfoMutation.mutateAsync({ productId, productInfo });
  };

  const addNewProductItem = async (formValues: ProductInfo) => {
    await addNewProductMutation.mutateAsync(formValues);
  };

  const totalCount = productData?.totalProducts;
  const products = productData?.products;

  return {
    products,
    fetchProducts: (page: number) => fetchProducts(page, productName, origin),
    isFetching,
    getInfoProductDetail,
    deleteProductItem,
    updateProductItem,
    addNewProductItem,
    totalCount,
  };
};

export default useProductService;
