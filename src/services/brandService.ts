import { useMutation, useQuery, useQueryClient } from "react-query";
import { notification } from "antd";
import { addBrand, editBrand, getAllBrand, removeBrand } from "@/api/brandApi";
import { CustomError } from "../interfaces/interface";

const useBrandService = () => {
  const queryClient = useQueryClient();

  const fetchBrands = async (page: number) => {
    const res = await getAllBrand(page);
    console.log("check res", res);
    const totalBrands = res.data.totalbrands || 0;
    const brands = res.data.brands;
    return { totalBrands, brands };
  };

  const deleteBrand = async (brandId: string) => {
    await removeBrand(brandId);
    return brandId;
  };

  const addNewBrand = async (brandName: string) => {
    await addBrand(brandName);
  };

  const updateBrandInfo = async ({
    brandId,
    brandName,
  }: {
    brandId: string;
    brandName: string;
  }) => {
    await editBrand(brandId, brandName);
  };

  const { data: brandData, isLoading: isFetching } = useQuery(
    "brands",
    () => fetchBrands(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const deleteBrandMutation = useMutation(deleteBrand, {
    onSuccess: () => {
      notification.success({
        message: "Delete Successful",
        description: "Delete brand successful",
        duration: 2,
      });
      queryClient.invalidateQueries("brands");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Delete Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const updateBrandInfoMutation = useMutation(updateBrandInfo, {
    onSuccess: () => {
      notification.success({
        message: "Update Successful",
        description: "Update brand successful",
        duration: 2,
      });
      queryClient.invalidateQueries("brands");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Update Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewBrandMutation = useMutation(addNewBrand, {
    onSuccess: () => {
      notification.success({
        message: "Add Successful",
        description: "Add brand successful",
        duration: 2,
      });
      queryClient.invalidateQueries("brands");
    },
    onError: (err: CustomError) => {
      console.error("Error add", err);
      notification.error({
        message: "Add Failed",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const deleteBrandItem = async (brandId: string) => {
    await deleteBrandMutation.mutateAsync(brandId);
  };

  const updateBrandItem = async (brandId: string, brandName: string) => {
    await updateBrandInfoMutation.mutateAsync({ brandId, brandName });
  };

  const addNewBrandItem = async (brandName: string) => {
    await addNewBrandMutation.mutateAsync(brandName);
  };

  const totalCount = brandData?.totalBrands;
  const brands = brandData?.brands;

  return {
    totalCount,
    brands,
    deleteBrandItem,
    addNewBrandItem,
    updateBrandItem,
    isFetching,
  };
};

export default useBrandService;
